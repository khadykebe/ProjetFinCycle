<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maison extends Model
{
    use HasFactory;

    protected $fillable = [
        'prix',
        'description',
        'nbrChambre',
        'image',
        'lieuLogement',
    ];

  

    public function logementUsers(){
        return $this->hasMany(User::class);
    } 

    public function logementCategorie(){
        return $this->hasMany(Categorie::class);
    }
}
