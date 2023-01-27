<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $guarded = [
        'id',
    ];

    public function planable()
    { return $this->morphTo(); }

    public function customer()
    { return $this->belongsTo(Customer::class, 'customer_id'); }

    public function area()
    { return $this->belongsTo(Area::class, 'area_id'); }

    public function transaction()
    { return $this->hasMany(Transaction::class, 'sub_id'); }
}
