<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Database\Factories\CashBoxBudgetPlanEntryFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * App\CashBoxBudgetPlanEntry
 *
 * @property int $id
 * @property int $user_id
 * @property int $cash_box_budget_plan_id
 * @property string $date
 * @property float $value
 * @property string $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|CashBoxBudgetPlanEntry newModelQuery()
 * @method static Builder|CashBoxBudgetPlanEntry newQuery()
 * @method static Builder|CashBoxBudgetPlanEntry query()
 * @method static Builder|CashBoxBudgetPlanEntry whereCashBoxBudgetPlanId($value)
 * @method static Builder|CashBoxBudgetPlanEntry whereCreatedAt($value)
 * @method static Builder|CashBoxBudgetPlanEntry whereDate($value)
 * @method static Builder|CashBoxBudgetPlanEntry whereDescription($value)
 * @method static Builder|CashBoxBudgetPlanEntry whereId($value)
 * @method static Builder|CashBoxBudgetPlanEntry whereUpdatedAt($value)
 * @method static Builder|CashBoxBudgetPlanEntry whereUserId($value)
 * @method static Builder|CashBoxBudgetPlanEntry whereValue($value)
 * @property-read CashBoxBudgetPlan $budgetPlan
 * @property-read CashBox|null $cashBox
 * @property-read User $user
 * @mixin Eloquent
 * @method static CashBoxBudgetPlanEntryFactory factory(...$parameters)
 */
class CashBoxBudgetPlanEntry extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'id', 'date', 'value', 'description'
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
    public function user(): BelongsTo
    {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * @return BelongsTo
     */
    public function budgetPlan(): BelongsTo
    {
        return $this->belongsTo('App\Models\CashBoxBudgetPlan', 'cash_box_budget_plan_id');
    }
}
