<?php

class CloseBudgetPlanIntegrationTest extends TestCase
{

    protected function setUp(): void
    {
        parent::setUp();

        $user = $this->createUser();
        $this->authenticate($user);
        $cashBox = $this->createCashBox($user);
        $this->createBudgetPlan($cashBox);
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

}
