<?php
namespace CashBoxesBudgetPlanEntries;

use App\Models\CashBoxBudgetPlan;
use App\Models\CashBoxBudgetPlanEntry;
use TestCase;

class UpdateBudgetPlanEntryIntegrationTest extends TestCase
{
    var CashBoxBudgetPlan $budgetPlan, $closedBudgetPlan;
    var CashBoxBudgetPlanEntry $entry, $entryOnClosedBudgetPlan;

    protected function setUp(): void
    {
        parent::setUp();

        $user = $this->createUser();
        $this->authenticate($user);

        $cashBox = $this->createCashBox($user);
        $this->budgetPlan = $this->createBudgetPlan($cashBox);
        $this->closedBudgetPlan = $this->createBudgetPlan($cashBox, ['closed' => 1]);

        $this->entry = $this->createBudgetPlanEntry($this->budgetPlan, $user);
        $this->entryOnClosedBudgetPlan = $this->createBudgetPlanEntry($this->closedBudgetPlan, $user);
    }

    public function test_expect_entryUpdated()
    {
        $updatedDateTime = $this->faker->dateTime();
        $response = $this->put('/v1/cash-boxes/1/plans/'.$this->budgetPlan->id.'/entries/'.$this->entry->id,
            [
                'value' => 99,
                'description' => 'updated description',
                'date' => $updatedDateTime
            ],
            $this->headers);

        $response->assertResponseStatus(201);
        $this->seeInDatabase('cash_box_budget_plan_entries', [
            'value' => 99,
            'description' => 'updated description',
            'date' => $updatedDateTime->setTime(0, 0)
        ]);
    }

    public function test_closedBudgetPlan_expect_forbidden()
    {
        $response = $this->put(
            '/v1/cash-boxes/1/plans/'.$this->closedBudgetPlan->id.'/entries/'.$this->entryOnClosedBudgetPlan->id,
            [
                'value' => 99,
                'description' => 'updated description',
                'date' => $this->faker->dateTime()
            ],
            $this->headers);

        $response->assertResponseStatus(403);
        $this->seeInDatabase('cash_box_budget_plan_entries', [
            'value' => $this->entryOnClosedBudgetPlan->value,
            'description' => $this->entryOnClosedBudgetPlan->description,
            'date' => $this->entryOnClosedBudgetPlan->date
        ]);
    }
}
