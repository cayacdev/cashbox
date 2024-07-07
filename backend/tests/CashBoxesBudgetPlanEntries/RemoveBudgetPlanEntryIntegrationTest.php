<?php

namespace CashBoxesBudgetPlanEntries;

use App\Models\CashBoxBudgetPlan;
use App\Models\CashBoxBudgetPlanEntry;
use TestCase;

class RemoveBudgetPlanEntryIntegrationTest extends TestCase
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

    protected function tearDown(): void
    {
        // Reset error and exception handlers to PHP's default
        restore_error_handler();
        restore_exception_handler();

        parent::tearDown();
    }

    public function test_expect_entryRemoved()
    {
        $response = $this->delete(
            '/v1/cash-boxes/1/plans/' . $this->budgetPlan->id . '/entries/' . $this->entry->id,
            [], $this->headers);

        $response->assertResponseStatus(204);
        $this->notSeeInDatabase('cash_box_budget_plan_entries', ['value' => $this->entry->value]);
    }

    public function test_closedBudgetPlan_expect_forbidden()
    {
        $response = $this->delete(
            '/v1/cash-boxes/1/plans/' . $this->closedBudgetPlan->id . '/entries/' . $this->entryOnClosedBudgetPlan->id,
            [], $this->headers);

        $response->assertResponseStatus(403);
        $this->seeInDatabase('cash_box_budget_plan_entries', [
            'value' => $this->entryOnClosedBudgetPlan->value,
            'description' => $this->entryOnClosedBudgetPlan->description,
            'date' => $this->entryOnClosedBudgetPlan->date
        ]);
    }
}
