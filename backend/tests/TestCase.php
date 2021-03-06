<?php

use App\Models\CashBox;
use App\Models\User;
use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use DatabaseMigrations;

    protected $headers;

    /**
     * Creates the application.
     *
     * @return \Laravel\Lumen\Application
     */
    public function createApplication()
    {
        return require __DIR__.'/../bootstrap/app.php';
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
}
