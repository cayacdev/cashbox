<?php


namespace App\Models;


use Barryvdh\LaravelIdeHelper\Eloquent;
use Database\Factories\PredefinedEntryDescriptionFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * App\Models\PredefinedEntryDescription
 *
 * @property int $id
 * @property int $cash_box_id
 * @property string $value
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read CashBox $cashBox
 * @method static Builder|PredefinedEntryDescription newModelQuery()
 * @method static Builder|PredefinedEntryDescription newQuery()
 * @method static Builder|PredefinedEntryDescription query()
 * @method static Builder|PredefinedEntryDescription whereCashBoxId($value)
 * @method static Builder|PredefinedEntryDescription whereCreatedAt($value)
 * @method static Builder|PredefinedEntryDescription whereId($value)
 * @method static Builder|PredefinedEntryDescription whereUpdatedAt($value)
 * @method static Builder|PredefinedEntryDescription whereValue($value)
 * @method static PredefinedEntryDescriptionFactory factory(...$parameters)
 * @mixin Eloquent
 */
class PredefinedEntryDescription extends Model
{

    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = ['id', 'cash_box_id', 'value'];

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
}
