<?php

namespace App\Providers;

use App\Models\CashBox;
use App\Models\CashBoxBudgetPlan;
use App\Models\CashBoxBudgetPlanEntry;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        Gate::define('cashBoxMember', function ($user, $cashBox) {
            /* @var $cashBox CashBox */
            return $cashBox->users->contains('id', $user->id);
        });

        Gate::define('cashBoxBudgetPlanEntryOwner', function ($user, $entry) {
            /* @var $entry CashBoxBudgetPlanEntry */
            return $entry->user->id === $user->id;
        });

        Gate::define('cashBoxBudgetPlanOpen', function ($user, CashBoxBudgetPlan $budgetPlan) {
            return $budgetPlan->closed == 0 ? Response::allow()
                : Response::deny('Entries on closed budget plans cannot be modified.');
        });
    }
}
