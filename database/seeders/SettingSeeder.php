<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings = [
            [
            'setting' => 'sys_lang',
            'value' => 'id_ID',
            ],
            [
            'setting' => 'sys_curr',
            'value' => 'IDR',
            ],
            [
            'setting' => 'sys_tz',
            'value' => 'Asia/Jakarta',
            ],
            [
            'setting' => 'sys_theme',
            'value' => 'light-theme',
            ],
            [
            'setting' => 'inv_prefix',
            'value' => 'INV-',
            ],
            [
            'setting' => 'inv_dueDate',
            'value' => '10',
            ],
            [
            'setting' => 'inv_tax',
            'value' => '11',
            ],
            [
            'setting' => 'pppList_active',
            'value' => 'list-normal',
            ],
            [
            'setting' => 'pppList_isolated',
            'value' => 'list-isolir',
            ],
            [
            'setting' => 'staticList_active',
            'value' => 'list-normal',
            ],
            [
            'setting' => 'staticList_isolated',
            'value' => 'list-isolir',
            ],
            [
            'setting' => 'gw_whatsapp',
            'value' => 'http://127.0.0.1:49160',
            ],
            [
            'setting' => 'unknown_2',
            'value' => 'unknown_2',
            ],
            [
            'setting' => 'unknown_3',
            'value' => 'unknown_3',
            ],
        ];

        foreach ($settings as $setting) {
            \App\Models\Setting::create($setting);
        }
    }
}
