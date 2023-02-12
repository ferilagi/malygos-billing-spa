<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'Admin Mbois',
                'phone' =>'08383838383',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin'),
                'level' => 'admin',
                'is_active' =>1,
            ],
            [
                'name' => 'Owner Mbois',
                'phone' =>'08383838346',
                'email' => 'owner@owner.com',
                'password' => Hash::make('owner'),
                'level' => 'owner',
                'is_active' =>1,
            ],
            [
                'name' => 'Operator Mbois',
                'phone' =>'08383838384',
                'email' => 'operator@operator.com',
                'password' => Hash::make('operator'),
                'level' => 'operator',
                'is_active' =>1,
            ]
        ];

        foreach ($users as $user) {
            \App\Models\User::create($user);
        }
    }
}
