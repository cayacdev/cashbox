<?php

namespace App\Http\Controllers;

use App\Models\CashBox;
use App\Models\CashBoxBudgetPlan;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Http\ResponseFactory;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Class CashBoxBudgetPlanController
 */
class CashBoxBudgetPlanController extends Controller
{
    /**
     * Constructor
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth', []);
    }

    /**
     * Display a listing of the resource.
     *
     * @param  string  $cashBoxId
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function index(string $cashBoxId)
    {
        $cashBox = CashBox::findCashBox($cashBoxId);
        return response()->json($cashBox->budgetPlans()->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  string  $cashBoxId
     * @param  Request  $request
     * @return Response
     * @throws AuthorizationException
     * @throws ValidationException
     */
    public function store(string $cashBoxId, Request $request)
    {
        $cashBox = CashBox::findCashBox($cashBoxId);

        $this->validateCashBoxBudgetPlan($request);
        $plan = new CashBoxBudgetPlan($request->all());

        $plan->cashBox()->associate($cashBox);

        $conflictedPlans = $plan->getConflictedPlans();
        if ($conflictedPlans->count() > 0) {
            throw new HttpException(Response::HTTP_BAD_REQUEST, 'The plan overlaps with other plans');
        }

        if (!$plan->save()) {
            throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response('', Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $cashBoxId
     * @param  string  $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function show(string $cashBoxId, string $id)
    {
        $plan = $this->getPlanThroughCashBox($cashBoxId, $id);
        if (!$plan) {
            throw new HttpException(Response::HTTP_NOT_FOUND);
        }
        return response()->json($plan->load('entries.user'));
    }

    /**
     * Get the reports for a specific resource.
     *
     * @param  string  $cashBoxId
     * @param  string  $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function showReports(string $cashBoxId, string $id)
    {
        /* @var $plan CashBoxBudgetPlan */
        $plan = $this->getPlanThroughCashBox($cashBoxId, $id);
        if (!$plan) {
            throw new HttpException(Response::HTTP_NOT_FOUND);
        }
        return response()->json([
            'remainingBudget' => $plan->calculateRemainingBudget(),
            'paidOverall' => $plan->calculatePaidOverall(),
            'paidByUser' => $plan->calculatePaidByUser(),
            'debtsByUser' => $plan->calculateDebtsByUser()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string  $cashBoxId
     * @param  string  $id
     * @param  Request  $request
     * @return Response|ResponseFactory
     * @throws AuthorizationException
     * @throws ValidationException
     */
    public function update(string $cashBoxId, string $id, Request $request)
    {
        $plan = $this->getPlanThroughCashBox($cashBoxId, $id);
        $this->validateCashBoxBudgetPlan($request);

        $plan->fill($request->all());
        $conflictedPlans = $plan->getConflictedPlans($id);
        if ($conflictedPlans->count() > 0) {
            throw new HttpException(Response::HTTP_BAD_REQUEST, 'The plan overlaps with other plans');
        }

        if (!$plan->update($request->all())) {
            throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response('', Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $cashBoxId
     * @param  string  $id
     * @return Response|ResponseFactory
     * @throws AuthorizationException
     */
    public function destroy(string $cashBoxId, string $id)
    {
        $plan = $this->getPlanThroughCashBox($cashBoxId, $id);
        if (!$plan->delete()) {
            throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response('', Response::HTTP_NO_CONTENT);
    }

    /**
     * Get the active plan for the given cash box
     *
     * @param  string  $cashBoxId
     * @return JsonResponse|Response|ResponseFactory
     * @throws AuthorizationException
     */
    public function active(string $cashBoxId)
    {
        $cashBox = CashBox::findCashBox($cashBoxId);
        $activePlan = $cashBox->getActivePlan()->first();

        if ($activePlan) {
            return response()->json($activePlan->load('entries.user'));
        } else {
            return response('', Response::HTTP_NO_CONTENT);
        }
    }

    /**
     * Updates the CashBoxBudgetPlan's closed attribute
     *
     * @param  string  $cashBoxId
     * @param  string  $id
     * @param  Request  $request
     * @return Response|ResponseFactory
     * @throws AuthorizationException|ValidationException
     */
    public function closed(string $cashBoxId, string $id, Request $request)
    {
        $this->validate($request, [
            'closed' => 'required|boolean',
        ]);

        $plan = $this->getPlanThroughCashBox($cashBoxId, $id);

        if (!$request->has('closed')) {
            throw new HttpException(ResponseAlias::HTTP_BAD_REQUEST);
        }

        if (!$plan->update($request->all('closed'))) {
            throw new HttpException(ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response('');
    }

    /**
     * @param  Request  $request
     * @throws ValidationException
     */
    private function validateCashBoxBudgetPlan(Request $request): void
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'budget' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);
    }

    /**
     * @param  string  $cashBoxId
     * @param  string  $id
     * @return CashBoxBudgetPlan|Model|HasMany|object
     * @throws AuthorizationException
     */
    public function getPlanThroughCashBox(string $cashBoxId, string $id)
    {
        $cashBox = CashBox::findCashBox($cashBoxId);
        return $cashBox->budgetPlans()->where('id', '=', $id)->first();
    }

}
