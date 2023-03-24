<?php

namespace Database\Factories;

use App\Models\Area;
use App\Models\Customer;
use App\Models\ServicePpp;
use Illuminate\Database\Eloquent\Factories\Factory;

use function GuzzleHttp\Promise\all;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $customer = Customer::all();
        if (count($customer->subscription)) {
            return 0;
        } else {
            return [
                'integration' => 0,
                'customer_id' => function () {
                    $customer = Customer::inRandomOrder()->first();
                    return $customer->id;
                },
                'type' => 'ppp',
                'ip_addr' => null,
                'queuename' => null,
                'username' => fake()->firstName() . '@' . fake()->domainName(),
                'password' => fake()->password(4, 6),
                'is_taxed' => 0,
                'status' => 'active',
                'auto_disable' => 0,
                'first_transaction' => 1,
                'custom_duedate' => 0,
                'area_id' => function () {
                    $area = Area::inRandomOrder()->first();
                    return $area->id;
                },
                'planable_id' => ServicePpp::first('id'),
                'planable_type' => 'App\Models\ServicePpp',
            ];
        };
    }
}
