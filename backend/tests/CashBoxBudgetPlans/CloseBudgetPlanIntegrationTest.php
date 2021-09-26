<?php

use App\Http\Controllers\CashBoxBudgetPlanController;
use App\Models\CashBoxBudgetPlan;

class CloseBudgetPlanIntegrationTest extends TestCase
{
    private CashBoxBudgetPlan $budgetPlan;

    protected function setUp(): void
    {
        parent::setUp();

        $user = $this->createUser();
        $this->authenticate($user);
        $cashBox = $this->createCashBox($user);
        $this->budgetPlan = $this->createBudgetPlan($cashBox);
    }

    public function test_expect_defaultBudgetPlanIsOpen()
    {
        $this->seeInDatabase('cash_box_budget_plans', ['closed' => 0]);
    }

    public function test_closeBudgetPlanViaPutRequest_expect_budgetPlanIsClosed()
    {
        $this->put('/v1/cash-boxes/1/plans/1/closed', ['closed' => 1], $this->headers)->assertResponseOk();

        $this->seeInDatabase('cash_box_budget_plans', ['closed' => 1]);
    }

    public function test_reopenBudgetPlanViaPutRequest_expect_budgetPlanIsOpen()
    {
        $this->put('/v1/cash-boxes/1/plans/1/closed', ['closed' => 1], $this->headers)->assertResponseOk();
        $this->put('/v1/cash-boxes/1/plans/1/closed', ['closed' => 0], $this->headers)->assertResponseOk();

        $this->seeInDatabase('cash_box_budget_plans', ['closed' => 0]);
    }

    public function test_closedParameterIsNoBoolean_expect_badRequest()
    {
        $this->put('/v1/cash-boxes/1/plans/1/closed', ['closed' => 2], $this->headers)->assertResponseStatus(422);
        $this->put('/v1/cash-boxes/1/plans/1/closed', ['closed' => "test"], $this->headers)->assertResponseStatus(422);
    }

    public function test_putWithoutParameters_expect_badRequest()
    {
        $this->put('/v1/cash-boxes/1/plans/1/closed', [], $this->headers)->assertResponseStatus(422);
    }

    public function test_closeBudgetPlanFailed_expect_internalServerError()
    {
        $planMock = $this->createMock(CashBoxBudgetPlan::class);
        $planMock->expects($this->once())->method('update')->willReturn(false);

        $mock = $this->createPartialMock(CashBoxBudgetPlanController::class, ['getPlanThroughCashBox']);
        $mock->expects($this->once())->method('getPlanThroughCashBox')->willReturn($planMock);
        $this->app->instance(CashBoxBudgetPlanController::class, $mock);

        $this->put('/v1/cash-boxes/1/plans/1/closed', ['closed' => 1], $this->headers)->assertResponseStatus(500);
    }

    public function test_updateClosedBudgetPlan_expect_forbidden()
    {
        $this->budgetPlan->closed = 1;
        $this->budgetPlan->save();

        $response = $this->put('/v1/cash-boxes/1/plans/1', ['budget' => 100], $this->headers);

        $response->assertResponseStatus(403);

        $this->notSeeInDatabase('cash_box_budget_plans', ['budget' => 100]);
        $this->seeInDatabase('cash_box_budget_plans', ['budget' => $this->budgetPlan->budget]);
    }

    public function test_deleteClosedBudgetPlan_expect_forbidden()
    {
        $this->budgetPlan->closed = 1;
        $this->budgetPlan->save();

        $response = $this->delete('/v1/cash-boxes/1/plans/1', [], $this->headers);

        $response->assertResponseStatus(403);
        $this->seeInDatabase('cash_box_budget_plans', ['budget' => $this->budgetPlan->budget]);
    }
}
