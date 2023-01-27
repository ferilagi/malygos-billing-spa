<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
    ];

    public function getRouteKeyName()
    {
    return 'invoice';
    }

    public function subscription()
    { return $this->belongsTo(Subscription::class, 'sub_id'); }

}
