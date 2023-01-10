<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
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
        User::create([
            'name' => 'Kasir User',
            'email' => 'kasir@portal.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_CASIER
        ]);
        
        User::create([
            'name' => 'Team Operation',
            'email' => 'operation@portal.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_OPERATION
        ]);

        User::create([
            'name' => 'Manager',
            'email' => 'manager@portal.com',
            'password' => bcrypt('password'),
            'role' => User::ROLE_MANAJEMEN
        ]);
    }
}
