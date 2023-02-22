<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Subscription;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subscription::factory()
        ->count(Customer::count())
        // ->hasPosts(1)
        ->create();
    }
}
