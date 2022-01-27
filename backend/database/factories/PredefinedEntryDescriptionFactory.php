<?php

namespace Database\Factories;

use App\Models\PredefinedEntryDescription;
use Illuminate\Database\Eloquent\Factories\Factory;

class PredefinedEntryDescriptionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PredefinedEntryDescription::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'value' => $this->faker->word,
        ];
    }
}
