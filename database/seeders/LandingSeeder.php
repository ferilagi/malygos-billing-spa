<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LandingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('landings')->truncate();

        $landings = [
            [
            'name' => 'Unused Name',
            'content' => 'Unused Content',
            'extra' => 'Unused Extra',
                ],
            [
            'name' => 'Unused Name',
            'content' => 'Unused Content',
            'extra' => 'Unused Extra',
                ],
            [
            'name' => 'Invis Countdown time',
            'content' => 'Time left to Invis :',
            'extra' => '2025/12/31',
                ],
            [
            'name' => 'Features',
            'content' => 'Features of Products',
            'extra' => 'extra',
                ],
            [
            'name' => 'Fast',
            'content' => 'If several languages coalesce, the grammar of the resulting language is more',
            'extra' => 'extra',
                ],
            [
            'name' => 'Stable',
            'content' => 'It will be as simple as Occidental; in fact, it will be Occidental. To an English person',
            'extra' => 'extra',
                ],
            [
            'name' => 'January, 2022',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'February, 2022',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'March, 2022',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'April, 2022',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'May, 2022',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'June, 2022',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'July, 2022',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'August, 2022',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'Team',
            'content' => 'Meat Our Team',
            'extra' => 'extra',
                ],
            [
            'name' => 'FAQ1',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'FAQ2',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'FAQ3',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'FAQ4',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'FAQ5',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'FAQ6',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'FAQ7',
            'content' => 'content',
            'extra' => 'extra',
                ],
            [
            'name' => 'FAQ8',
            'content' => 'content',
            'extra' => 'extra',
                ],
        ];

        foreach ($landings as $landing) {
            \App\Models\Landing::create($landing);
        }
    }
}
