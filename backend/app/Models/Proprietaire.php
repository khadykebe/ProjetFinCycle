<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Proprietaire extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'prenom',
        'telephone',
        'adresse',
    ];

    public function logement(){
        
        return $this->belongsTo(Proprietaire::class);
    }
}
