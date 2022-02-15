<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Logement;
use App\Models\Rendervou;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{

    public function addClient(Request $request){
        $this->validate($request,[
            'nom'=>'required',
            'prenom'=>'required',
            'telephone'=>'required',
            'adresse'=>'required',
            'roles'=>'required',
            'email'=>'required|email',
            'password'=>'required|min:6'
        ]);

        $data = new Client();
        $data->nom = $request->nom;
        $data->prenom = $request->prenom;
        $data->telephone = $request->telephone;
        $data->adresse = $request->adresse;
        $data->email = $request->email;
        $data->roles = $request->roles;
        $data->password = bcrypt($request->password);
        $data ->assignRole('client');
        $token = $data->createToken('user Password Grand Client')->accessToken;
        $data->save();

        return response()->json([
            'token'=>$token,
           'data' => $data
        ]);
    }


    public function recherche(Request $request){

        $this->validate($request,[
            'lieu' =>'required',
            'categorie' =>'required'
        ]);

        if($request->categorie == 'maison'){
            $data = DB::table('maisons')
                ->join('categories','maisons.categories_id','=','categories.id')
                ->where('lieuLogement',$request->lieu)->get();
            return response()->json(['data' =>$data],200);
        }

        $data1 = DB::table('logements')
            ->join('categories','logements.categories_id','=','categories.id')
            ->where('lieuLogement',$request->lieu)->get();
            return response()->json(['data' =>$data1],200);
    }




    public function listeRV(){
        // affiche la liste de tous les rendervous
        $data = Rendervou::all();
        return response()->json([
            'data' =>$data
        ]);
    }

    public function prendreRV($id){

        // supprime le rendervous choisi avec boite de dialogue pour confirmer
        // si oui on supprime si non on annul
        $data = Rendervou::find($id);
        $data->delete();
        return response()->json(null);

    }

    public function reservation(Request $request){

    }
}
