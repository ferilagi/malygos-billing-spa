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

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
              $query->where('invoice', 'like', '%'.$search.'%')
                  ->orWhere('status', 'like', '%'.$search.'%')
                  ->orWhereHas('subscription.customer', function ($query) use ($search) {
                    $query->where('name', 'like', '%'.$search.'%');
                    })
                  ->orWhereHas('subscription.customer.user', function ($query) use ($search) {
                      $query->where('name', 'like', '%'.$search.'%');
                  });
            });
        })->when($filters['rangePeriod'] ?? null, function ($query, $rangePeriod) {
            $query->where(function ($query) use ($rangePeriod) {
              $query->where('date', 'like', '%'.$rangePeriod.'%');
            });
        });
    }

}
