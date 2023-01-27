<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mikrotik extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'ip_addr',
        'user',
        'pass',
        'port',
        'description',
        'is_active',
    ];

}
