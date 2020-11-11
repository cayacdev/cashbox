<?php


namespace App\Http\Controllers;


use App\Models\CashBox;
use App\Models\PredefinedEntryDescription;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Http\ResponseFactory;
use Symfony\Component\HttpKernel\Exception\HttpException;

class PredefinedEntryDescriptionController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', []);
    }

    /**
     * @param $cashBoxId
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function index($cashBoxId)
    {
        $cashBox = CashBox::findCashBox($cashBoxId);
        return response()->json($cashBox->predefinedEntryDescriptions()->get(['id', 'value']));
    }

    /**
     * @param string $cashBoxId
     * @param Request $request
     * @return Response|ResponseFactory
     * @throws AuthorizationException
     * @throws ValidationException
     */
    public function store(string $cashBoxId, Request $request)
    {
        $cashBox = CashBox::findCashBox($cashBoxId);

        $description = new PredefinedEntryDescription($this->valid($request)->all());
        $description->cashBox()->associate($cashBox);

        if (!$description->save()) {
            throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response('', Response::HTTP_CREATED);
    }

    /**
     * @param string $cashBoxId
     * @param string $id
     * @param Request $request
     * @return Response|ResponseFactory
     * @throws AuthorizationException
     * @throws ValidationException
     */
    public function update(string $cashBoxId, string $id, Request $request)
    {
        $cashBox = CashBox::findCashBox($cashBoxId);
        $description = $cashBox->predefinedEntryDescriptions()->where('id', '=', $id)->first();

        if (!$description->update($this->valid($request)->all())) {
            throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response('', Response::HTTP_CREATED);
    }

    /**
     * @param string $cashBoxId
     * @param string $id
     * @return Response|ResponseFactory
     * @throws AuthorizationException
     * @throws Exception
     */
    public function destroy(string $cashBoxId, string $id)
    {
        $cashBox = CashBox::findCashBox($cashBoxId);
        $plan = $cashBox->predefinedEntryDescriptions()->where('id', '=', $id)->first();

        if (!$plan->delete()) {
            throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response('', Response::HTTP_NO_CONTENT);
    }

    /**
     * @param Request $request
     * @return Request
     * @throws ValidationException
     */
    private function valid(Request $request): Request
    {
        $this->validate($request, [
            'value' => 'required|max:255',
        ]);
        return $request;
    }
}
