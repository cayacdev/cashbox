<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Database\Factories\CashBoxBudgetPlanFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * Class CashBoxBudgetPlan
 *
 * @package App
 * @property int $id
 * @property int $cash_box_id
 * @property string $name
 * @property float $budget
 * @property string $start_date
 * @property string $end_date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read CashBox $cashBox
 * @property int $active
 * @property int $closed
 * @method static Builder|CashBoxBudgetPlan newModelQuery()
 * @method static Builder|CashBoxBudgetPlan newQuery()
 * @method static Builder|CashBoxBudgetPlan query()
 * @method static Builder|CashBoxBudgetPlan whereBudget($value)
 * @method static Builder|CashBoxBudgetPlan whereCashBoxId($value)
 * @method static Builder|CashBoxBudgetPlan whereCreatedAt($value)
 * @method static Builder|CashBoxBudgetPlan whereEndDate($value)
 * @method static Builder|CashBoxBudgetPlan whereId($value)
 * @method static Builder|CashBoxBudgetPlan whereName($value)
 * @method static Builder|CashBoxBudgetPlan whereStartDate($value)
 * @method static Builder|CashBoxBudgetPlan whereUpdatedAt($value)
 * @method static Builder|CashBoxBudgetPlan whereActive($value)
 * @method static Builder|CashBoxBudgetPlan whereClosed($value)
 * @property-read Collection|CashBoxBudgetPlanEntry[] $entries
 * @property-read int|null $entries_count
 * @mixin Eloquent
 * @method static CashBoxBudgetPlanFactory factory(...$parameters)
 */
class CashBoxBudgetPlan extends Model
{

    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'id', 'name', 'budget', 'start_date', 'end_date', 'closed'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * @return BelongsTo
     */
    public function cashBox(): BelongsTo
    {
        return $this->belongsTo('App\Models\CashBox');
    }

    /**
     * @return HasMany
     */
    public function entries(): HasMany
    {
        return $this->hasMany('App\Models\CashBoxBudgetPlanEntry');
    }

    /**
     * @param  null  $expectId
     * @return HasMany
     */
    public function getConflictedPlans($expectId = null): HasMany
    {
        /**
         * @var $plans HasMany
         */
        $plans = $this->cashBox()->first()->budgetPlans();

        $conflictedPlans = $plans->where(function ($query) {
            /**
             * @var $query Builder
             */
            $query
                ->whereBetween('start_date', [$this->start_date, $this->end_date])
                ->orWhereBetween('end_date', [$this->start_date, $this->end_date])
                ->orWhere(function ($query) {
                    /**
                     * @var $query Builder
                     */
                    $query
                        ->where('start_date', '<', $this->start_date)
                        ->where('end_date', '>', $this->end_date);
                });
        });

        if ($expectId) {
            $conflictedPlans->where('id', '<>', $expectId);
        }

        return $conflictedPlans;
    }

    public function calculateRemainingBudget(): float
    {
        $remainingBudget = $this->budget - $this->calculatePaidOverall();
        return round($remainingBudget, 2);
    }

    public function calculatePaidOverall(): float
    {
        $paidOverall = $this->entries()->sum('value');
        return round($paidOverall, 2);
    }

    public function calculatePaidByUser(): Collection
    {
        return $this->entries()->selectRaw('name, round(sum(value),2) as value')
            ->groupBy('user_id')
            ->leftJoin('users', 'users.id', '=', 'user_id')
            ->get();
    }

    public function calculateDebtsByUser(): array
    {
        $paidOverall = $this->calculatePaidOverall();
        $paidByUsers = $this->calculatePaidByUser();

        $userShouldPay = $paidOverall / count($paidByUsers);

        $overPaidUsers = [];
        $lessPaidUsers = [];
        foreach ($paidByUsers as $paidByUser) {
            if ($paidByUser->value > $userShouldPay) {
                $overPaidUsers[$paidByUser->name] = $paidByUser->value - $userShouldPay;
            } else {
                $lessPaidUsers[$paidByUser->name] = $userShouldPay - $paidByUser->value;
            }
        }

        $debtsByUsers = [];
        foreach ($lessPaidUsers as $lessPaidUser => $debts) {
            foreach ($overPaidUsers as $overPaidUser => $openDebts) {
                $value = $debts >= $openDebts ? $openDebts : $debts;
                $overPaidUsers[$overPaidUser] -= $value;
                array_push($debtsByUsers, [
                    'debtor' => $lessPaidUser,
                    'creditor' => $overPaidUser,
                    'value' => round($value, 2)
                ]);
            }
        }

        return $debtsByUsers;
    }
}
