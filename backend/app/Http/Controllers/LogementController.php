<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Logement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LogementController extends Controller
{
    public function AddChambre(Request $request){
        $this->validate($request,[
            'prix'=> 'required|string|max:255',
            'description'=> 'required',
            'nbrOccupant'=>'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
            'lieuLogement'=> 'required',
            'categories_id' => 'required',

        ]);

        $imageName = time().'.'.$request->image->extension();
        $request->file('image')->move(public_path('images'), $imageName);
        $logement = new Logement();
        $logement->prix = $request->prix;
        $logement->description = $request->description;
        $logement->nbrOccupant = $request->nbrOccupant;
        $logement->image = $imageName;
        $logement->lieuLogement = $request->lieuLogement;
        $logement->categories_id = $request->categories_id;
        $logement->users_id = auth()->user()->id;
        $logement->save();

        return response()->json([
            'logement' => $logement
        ],200);

    }

    public function allchambre(){
        $data = Logement::all();
        return  response()->json(['data' =>$data]);
    }

    public function getChambreById($id){
        $data = Logement::find($id);
        return response() ->json([$data]);
    }



    public function destroy(Logement $logement,$id){
        $logement = Logement::find($id);

        if(is_null($logement)){
            return response()->json(['message '=>'pas de logement']);
        }
        Storage::delete($logement->image);
        $logement->delete();
        return response()->json(null, 204);
    }


    public function addC(Request $request){
        $this->validate($request,[
            'nom'=>'required'
        ]);
        $cat = Categorie::create([
            'nom'=>$request->nom
        ]);
        return response()->json([
            'categorie' => $cat
        ]);
    }

}
