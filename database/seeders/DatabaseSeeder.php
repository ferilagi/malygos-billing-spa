<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        \App\Models\Company::create([
            'name' => 'PT Mencari Kayu',
            'email' => 'admin@admin.com',
            'phone' =>'08182838485',
            'slogan' => 'Kalau Mereka Bisa, Kenapa Harus Saya!!!',
            'address' => 'Kelurahan Jawa',
            'state' => 'Jakarta',
            'zipcode' => '67100',
        ]);

        $this->call([
            UserSeeder::class,
            // LandingSeeder::class,
            // CustomerSeeder::class,
            SettingSeeder::class,
        ]);


    }
}
