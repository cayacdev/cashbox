<?php

namespace Database\Seeders;

use App\Models\CashBox;
use App\Models\CashBoxBudgetPlan;
use App\Models\CashBoxBudgetPlanEntry;
use App\Models\PredefinedEntryDescription;
use App\Models\User;
use DateTime;
use Exception;
use Faker\Factory;
use Faker\Generator;
use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    /**
     * The current Faker instance.
     *
     * @var Generator
     */
    protected Generator $faker;

    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $this->faker = Factory::create();
        /** @var CashBox $cashBox */
        $cashBox = CashBox::factory()->create();
        for ($i = 1; $i < 5; $i++) {
            $user = User::factory()->create([
                "email" => "test$i@test.com",
                "password" => app('hash')->make('12345678', ['rounds' => 12])
            ]);
            CashBox::factory()->create()->users()->attach($user);
            $cashBox->users()->attach($user);
        }

        PredefinedEntryDescription::factory()->count(10)->create([
            "cash_box_id" => $cashBox->id
        ]);

        $this->createBudgetPlan($cashBox, 1000, "0");
        $this->createBudgetPlan($cashBox, 1000, "-1");
        $this->createBudgetPlan($cashBox, 1000, "-2", true);
    }

    /**
     * @throws Exception
     */
    function createBudgetPlan(CashBox $cashBox, $budget, $month, $closed = false)
    {
        $budgetPlan = CashBoxBudgetPlan::factory()->create([
            "budget" => $budget,
            "cash_box_id" => $cashBox->id,
            "start_date" => new DateTime("first day of $month month"),
            "end_date" => new DateTime("last day of $month month"),
            "closed" => $closed
        ]);

        $open_budget = $budget;

        $descriptions = $this->faker->words(10);
        while ($open_budget > ($budget * 0.05)) {
            $user = $cashBox->users->random(1)[0];

            $value = $this->faker->randomFloat(2, 0.01, $budget * 0.05);

            $first = new DateTime("first day of $month month");
            $last = new DateTime("last day of $month month");
            if ($month === "0") {
                $last = new DateTime("now");
            }

            CashBoxBudgetPlanEntry::factory()->create(
                [
                    "value" => $value,
                    "user_id" => $user->id,
                    'cash_box_budget_plan_id' => $budgetPlan->id,
                    "date" => $this->faker->dateTimeBetween($first, $last),
                    "description" => $descriptions[array_rand($descriptions)]
                ]
            );
            $open_budget -= $value;
        }
    }
}
