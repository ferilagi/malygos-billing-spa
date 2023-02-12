<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => function () {
                $user = User::inRandomOrder()->first();
                return $user->id;
            },
            'name' => fake()->name(),
            'phone' => fake()->e164PhoneNumber(),
            'email' => fake()->safeEmail(),
            'address' => fake()->address(),
            'joined_at' => now(),
            'lat' => '-7.250445',
            'lon' => '112.768845',
        ];
    }
}
