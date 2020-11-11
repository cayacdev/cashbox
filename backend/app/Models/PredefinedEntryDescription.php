<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PredefinedEntryDescription extends Model
{
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
    public function cashBox()
    {
        return $this->belongsTo('App\Models\CashBox');
    }
}
