<?php
namespace CashBoxesBudgetPlanEntries;

use App\Models\CashBoxBudgetPlan;
use TestCase;

class CreateBudgetPlanEntryIntegrationTest extends TestCase
{
    var CashBoxBudgetPlan $budgetPlan, $closedBudgetPlan;

    protected function setUp(): void
    {
        parent::setUp();

        $user = $this->createUser();
        $this->authenticate($user);

        $cashBox = $this->createCashBox($user);
        $this->budgetPlan = $this->createBudgetPlan($cashBox);
        $this->closedBudgetPlan = $this->createBudgetPlan($cashBox, ['closed' => 1]);
    }

    public function test_expect_entryCreated()
    {
        $dateTime = $this->faker->dateTime();
        $response = $this->post('/v1/cash-boxes/1/plans/'.$this->budgetPlan->id.'/entries',
            [
                'value' => 10,
                'description' => 'test description',
                'date' => $dateTime
            ],
            $this->headers);

        $response->assertResponseStatus(201);
        $this->seeInDatabase('cash_box_budget_plan_entries', [
            'value' => 10,
            'description' => 'test description',
            'date' => $dateTime->setTime(0, 0)
        ]);
    }

    public function test_closedBudgetPlan_expect_forbidden()
    {
        $response = $this->post('/v1/cash-boxes/1/plans/'.$this->closedBudgetPlan->id.'/entries',
            [
                'value' => 10,
                'description' => 'test description',
                'date' => $this->faker->dateTime()
            ],
            $this->headers);

        $response->assertResponseStatus(403);
        $this->notSeeInDatabase('cash_box_budget_plan_entries', ['value' => 10,]);
    }
}
