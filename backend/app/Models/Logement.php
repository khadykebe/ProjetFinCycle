<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logement extends Model
{
    use HasFactory;

    protected $fillable = [
        'prix',
        'description',
        'nbrOccupant',
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
