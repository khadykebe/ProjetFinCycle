<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserAdmin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = \App\Models\User::factory()->create([

            'nom'=>"kebe",
            'prenom'=>"khady",
            'adresse'=>"rufisque",
            'telephone'=>"78 471 42 87",
            'email'=>"khady.kebe@gamail.com",
            'password'=>Hash::make('alliak58')
        ]);
        $user->assignRole('Admin');
    }
}
