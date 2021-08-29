<?php

use App\Models\CashBox;
use App\Models\CashBoxBudgetPlan;
use App\Models\User;
use Laravel\Lumen\Application;
use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use DatabaseMigrations;

    protected array $headers;
    protected \Faker\Generator $faker;

    /**
     * Creates the application.
     *
     * @return Application
     */
    public function createApplication(): Application
    {
        return require __DIR__.'/../bootstrap/app.php';
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->faker = Faker\Factory::create();
    }


    protected function createUser(): User
    {
        return User::factory()->create([
            'password' => app('hash')->make('12345678', ['rounds' => 12])
        ]);
    }

    /**
     * @param  User  $user
     */
    protected function authenticate(User $user): void
    {
        $token = Auth::attempt(['email' => $user->email, 'password' => '12345678']);
        $this->headers = ['Authorization' => "Bearer {$token}"];
    }

    /**
     * @param  User  $user
     * @return CashBox
     */
    protected function createCashBox(User $user): CashBox
    {
        /** @var $cashBox CashBox */
        $cashBox = CashBox::factory()->create();
        $cashBox->users()->attach($user);
        return $cashBox;
    }

    protected function createBudgetPlan(CashBox $cashBox, array $additionalAttributes = []): CashBoxBudgetPlan
    {
        return CashBoxBudgetPlan::factory()->create(
            array_merge(
                ['cash_box_id' => $cashBox->id],
                $additionalAttributes));
    }
}
