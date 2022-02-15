<?php

namespace App\Http\Controllers;

use App\Models\Proprietaire;
use Illuminate\Http\Request;

class ProprietaireController extends Controller
{
    public function addProprietaire(Request $request)
    {

            $this->validate($request, [
                'nom' => 'required',
                'prenom' => 'required',
                'adresse' => 'required',
                'telephone' => 'required',
                
                
                
            ]);
     
            $user = Proprietaire::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'adresse' => $request->adresse,
                'telephone' => $request->telephone,
        
                 
            ]);
            $user -> assignRole("proprietaire");
            $token = $user->createToken('user Password Grand Client')->accessToken;
            return response()->json([
                'token' => $token,
                'user'=>$user
            ], 200);
           
           
        }
        
    
        public function getAllProprietaire() {
           
            $data = Proprietaire::all();
            if(is_null($data)){
                return response()->json(['message'=>'pas encore fait de depense']);
            }
            return response()->json($data, 200);
        } 
        public function getUserById($id) {
            $depense = Proprietaire::find($id);
            if(is_null($depense)) { 
                return response()->json(['message' => 'produit non trouvé'], 404);
            }
            return response()->json($depense, 200);
        }

        public function updateProprietaire(Request $request, $id) {

            $depense = Proprietaire::find($id);
            if(is_null($depense)) {
                return response()->json(['message' => 'proprietaire non trouver'], 404);
            }
            $depense->update($request->all());
            return response($depense, 200);
        }

    public function deleteProprietaire($id) {
        $depense = Proprietaire::find($id);
        if(is_null($depense)) {
            return response()->json(['message' => 'produit n\'existe pas'], 404);
        }
        $depense->delete();
        return response()->json(null, 204);
    }


}
