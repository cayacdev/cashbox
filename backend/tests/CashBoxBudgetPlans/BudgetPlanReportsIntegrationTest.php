<?php

namespace CashBoxBudgetPlans;

use App\Models\CashBoxBudgetPlan;
use App\Models\User;
use TestCase;

class BudgetPlanReportsIntegrationTest extends TestCase
{
    var CashBoxBudgetPlan $budgetPlan;
    var User $user1, $user2;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user1 = $this->createUser();
        $this->user2 = $this->createUser();
        $this->authenticate($this->user1);
        $cashBox = $this->createCashBox($this->user1);
        $cashBox->users()->attach($this->user2);
        $this->budgetPlan = $this->createBudgetPlan($cashBox, ['budget' => 300]);
        $this->createBudgetPlanEntry($this->budgetPlan, $this->user1, ['value' => 10.99]);
        $this->createBudgetPlanEntry($this->budgetPlan, $this->user1, ['value' => 15.95]);
        $this->createBudgetPlanEntry($this->budgetPlan, $this->user2, ['value' => 20.99]);
    }

    protected function tearDown(): void
    {
        // Reset error and exception handlers to PHP's default
        restore_error_handler();
        restore_exception_handler();

        parent::tearDown();
    }

    public function test_expect_remainingBudget()
    {
        $response = $this->get('/v1/cash-boxes/1/plans/1/reports', $this->headers);

        $response->assertResponseOk();
        $response->seeJsonEquals([
            'remainingBudget' => 252.07,
            'paidOverall' => 47.93,
            'paidByUser' => [
                [
                    'name' => $this->user1->name,
                    'value' => 26.94
                ], [
                    'name' => $this->user2->name,
                    'value' => 20.99
                ]
            ],
            'debtsByUser' => [
                [
                    'creditor' => $this->user1->name,
                    'debtor' => $this->user2->name,
                    'value' => 2.98
                ]
            ]
        ]);
    }
}
