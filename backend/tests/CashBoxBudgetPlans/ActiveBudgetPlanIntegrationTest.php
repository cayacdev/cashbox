<?php

namespace CashBoxBudgetPlans;

use App\Models\CashBox;
use App\Models\CashBoxBudgetPlan;
use TestCase;

class ActiveBudgetPlanIntegrationTest extends TestCase
{
    var CashBoxBudgetPlan $activePlan, $inactivePlan;
    var CashBox $cashBoxWithActivePlan, $cashBoxWithInactivePlan, $cashBoxWithoutAnyPlan;

    protected function setUp(): void
    {
        parent::setUp();

        $user = $this->createUser();
        $this->authenticate($user);
        $this->cashBoxWithActivePlan = $this->createCashBox($user);
        $this->cashBoxWithInactivePlan = $this->createCashBox($user);
        $this->cashBoxWithoutAnyPlan = $this->createCashBox($user);

        $this->activePlan = CashBoxBudgetPlan::factory()->create([
            'cash_box_id' => $this->cashBoxWithActivePlan->id,
            'start_date' => $this->faker->dateTimeBetween('-2 weeks', '-1 weeks'),
            'end_date' => $this->faker->dateTimeBetween('+1 weeks', '+2 weeks')
        ]);

        $this->inactivePlan = CashBoxBudgetPlan::factory()->create([
            'cash_box_id' => $this->cashBoxWithInactivePlan->id,
            'start_date' => $this->faker->dateTimeBetween('-2 weeks', '-1 weeks'),
            'end_date' => $this->faker->dateTimeBetween('-1 weeks', '-1 days')
        ]);
    }

    protected function tearDown(): void
    {
        // Reset error and exception handlers to PHP's default
        restore_error_handler();
        restore_exception_handler();

        parent::tearDown();
    }

    public function test_budgetPlanHasActivePlan_expect_activePlan(): void
    {
        $response = $this->get('/v1/cash-boxes/' . $this->cashBoxWithActivePlan->id . '/plans/active', $this->headers);
        $response->assertResponseOk();

        $expectedPlan = array_merge(
            $this->activePlan
                ->all('id', 'budget', 'cash_box_id', 'closed', 'end_date', 'start_date', 'name')
                ->toArray()[0],
            ['entries' => []]);
        $response->seeJsonEquals($expectedPlan);
    }

    public function test_budgetPlanHasInactivePlan_expect_noContent(): void
    {
        $response = $this->get('/v1/cash-boxes/' . $this->cashBoxWithInactivePlan->id . '/plans/active', $this->headers);
        $response->assertResponseStatus(204);
    }

    public function test_budgetPlanHasNoPlan_expect_noContent(): void
    {
        $response = $this->get('/v1/cash-boxes/' . $this->cashBoxWithoutAnyPlan->id . '/plans/active', $this->headers);
        $response->assertResponseStatus(204);
    }
}
