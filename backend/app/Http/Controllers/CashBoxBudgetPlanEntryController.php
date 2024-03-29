<?php

namespace App\Http\Controllers;

use App\Models\CashBox;
use App\Models\CashBoxBudgetPlanEntry;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Http\ResponseFactory;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CashBoxBudgetPlanEntryController extends Controller
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
     * Store a newly created resource in storage.
     *
     * @param  string  $cashBoxId
     * @param  string  $planId
     * @param  Request  $request
     * @return Response|ResponseFactory
     * @throws AuthorizationException
     * @throws ValidationException
     */
    public function store(string $cashBoxId, string $planId, Request $request)
    {
        $this->validateCashBoxBudgetPlanEntry($request);

        $plan = $this->getPlanThroughCashBox($cashBoxId, $planId);
        Gate::authorize('cashBoxBudgetPlanOpen', $plan);

        $entry = new CashBoxBudgetPlanEntry($request->all());
        $entry->budgetPlan()->associate($plan);
        $entry->user()->associate(auth()->user());

        if (!$entry->save()) {
            throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response('', Response::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  string  $cashBoxId
     * @param  string  $planId
     * @param  string  $id
     * @param  Request  $request
     * @return Response
     * @throws AuthorizationException
     * @throws ValidationException
     */
    public function update(string $cashBoxId, string $planId, string $id, Request $request)
    {
        $this->validateCashBoxBudgetPlanEntry($request);

        $plan = $this->getPlanThroughCashBox($cashBoxId, $planId);
        Gate::authorize('cashBoxBudgetPlanOpen', $plan);

        $entry = $this->findCashBoxBudgetPlanEntry($id);
        if (!$entry->update($request->all())) {
            throw new HttpException(ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response('', ResponseAlias::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $cashBoxId
     * @param  string  $planId
     * @param  string  $id
     * @return Response
     * @throws Exception
     */
    public function destroy(string $cashBoxId, string $planId, string $id)
    {
        $plan = $this->getPlanThroughCashBox($cashBoxId, $planId);
        Gate::authorize('cashBoxBudgetPlanOpen', $plan);

        $entry = $this->findCashBoxBudgetPlanEntry($id);
        if (!$entry->delete()) {
            throw new HttpException(ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response('', ResponseAlias::HTTP_NO_CONTENT);
    }

    /**
     * @param  Request  $request
     * @throws ValidationException
     */
    private function validateCashBoxBudgetPlanEntry(Request $request): void
    {
        $this->validate($request, [
            'value' => 'required|numeric',
            'description' => 'required|max:255',
            'date' => 'required|date',
        ]);
    }

    /**
     * @param  int  $id
     * @return CashBoxBudgetPlanEntry
     * @throws AuthorizationException
     */
    private function findCashBoxBudgetPlanEntry(int $id)
    {
        $entry = CashBoxBudgetPlanEntry::find($id);
        Gate::authorize('cashBoxBudgetPlanEntryOwner', $entry);
        return $entry;
    }

    /**
     * @param  string  $cashBoxId
     * @param  string  $cashBoxBudgetPlanId
     * @return mixed
     * @throws AuthorizationException
     */
    public function getPlanThroughCashBox(string $cashBoxId, string $cashBoxBudgetPlanId)
    {
        $cashBox = CashBox::findCashBox($cashBoxId);
        return $cashBox->budgetPlans()->where('id', '=', $cashBoxBudgetPlanId)->first();
    }
}
