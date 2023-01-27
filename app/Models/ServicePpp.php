<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServicePpp extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
    ];

    public function plans()
    { return $this->morphMany(Subscription::class, 'planable'); }
}
