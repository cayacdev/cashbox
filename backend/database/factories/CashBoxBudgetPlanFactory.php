<?php

namespace Database\Factories;

use App\Models\CashBoxBudgetPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

class CashBoxBudgetPlanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CashBoxBudgetPlan::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'budget' => $this->faker->numberBetween(100, 500),
            'start_date' => $this->faker->dateTime(),
            'end_date' => $this->faker->dateTime(),
        ];
    }
}
