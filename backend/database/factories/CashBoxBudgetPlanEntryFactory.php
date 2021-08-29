<?php

namespace Database\Factories;

use App\Models\CashBoxBudgetPlanEntry;
use Illuminate\Database\Eloquent\Factories\Factory;

class CashBoxBudgetPlanEntryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CashBoxBudgetPlanEntry::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'value' => $this->faker->randomFloat(2, 1, 100),
            'description' => $this->faker->text(),
            'date' => $this->faker->dateTime()->setTime(0, 0),
        ];
    }
}
