<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (($handle = fopen("C:/Users/val/Desktop/art_data/countries.csv", "r")) !== FALSE) {
            fgetcsv($handle); // skip first line with column names
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                DB::table('countries')->insert([
                    'name' => $data[0],
                    'code' => $data[2],
                ]);
            }
            fclose($handle);
        }
    }
}
