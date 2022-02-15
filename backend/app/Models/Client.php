<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Client extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable ,HasRoles;
    protected $fillable = [
            'nom',
            'prenom',
            'telephone',
            'adresse',
            'email',
            'password',
            'roles'
    ];

}
