<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function allUser(){

        $data = User::where('role',"gerant")->get();
        return $data;

    }
}
