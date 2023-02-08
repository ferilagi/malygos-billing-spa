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

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('queuename', 'like', '%'.$search.'%')
                    ->orWhere('username', 'like', '%'.$search.'%')
                    ->orWhere('status', 'like', '%'.$search.'%')
                    ->orWhereHas('customer', function ($query) use ($search) {
                      $query->where('name', 'like', '%'.$search.'%');
                      })
                    ->orWhereHas('customer.user', function ($query) use ($search) {
                        $query->where('name', 'like', '%'.$search.'%');
                    })
                    ->orWhereHas('area', function ($query) use ($search) {
                      $query->where('name', 'like', '%'.$search.'%');
                  });
            });
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }
}
