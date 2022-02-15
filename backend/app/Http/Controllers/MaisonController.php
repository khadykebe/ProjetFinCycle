<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Image;
use App\Models\Logement;
use App\Models\Maison;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class MaisonController extends Controller
{
    public function AddMaison(Request $request){
        $this->validate($request,[
            'prix'=> 'required|string|max:255',
            'description'=> 'required',
            'nbrChambre'=>'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
            'lieuLogement'=> 'required',
            'categories_id' => 'required',

        ]);

        $imageName = time().'.'.$request->file('image')->extension();
        $request->file('image')->move(public_path('images'), $imageName);
        $logement = new Maison();
        $logement->prix = $request->prix;
        $logement->description = $request->description;
        $logement->nbrChambre = $request->nbrChambre;
        $logement->image = $imageName;
        $logement->lieuLogement = $request->lieuLogement;
        $logement->categories_id = $request->categories_id;
        $logement->users_id = auth()->user()->id;
        $logement->save();

        return response()->json([
            'logement' => $logement
        ],200);

    }

    public function allMaison(){
        $data = Maison::all();
        return response()->json(['data' => $data],200);
    }

    public function getMaisonById($id){
        $data = Maison::find($id);
        return response() ->json([$data]);
    }

    public function destroy(Maison $logement,$id){
        $logement = Maison::find($id);

        if(is_null($logement)){
            return response()->json(['message '=>'pas de logement']);
        }
        Storage::delete($logement->image);
        $logement->delete();
        return response()->json(null, 204);
    }

    public function addImage(Request $request){
        $this->validate($request ,[
            'image' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
        ]);


        $id_maison = Maison::all()->last()->id;
        $imageName = time().'.'.$request->image->extension();
        $request->file('image')->move(public_path('images'), $imageName);
        $data = new Image();
        $data->image =$imageName ;
        $data->id_maison = $id_maison;
        $data->save();
        return response()->json(['data' => $data]);
    }

    public function getAllimageByIdMaison(){
        $data = DB::table('maisons')
        ->join('images','maisons.id','=','images.id_maison')
        ->select('images.image')
        ->where('id_maison' ,'=',1 )->get();
        // ->groupBy('id_maison')->get();
        return response()->json([
            'data' =>$data
        ]);
    }

}
