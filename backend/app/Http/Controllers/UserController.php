<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Rendervou;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use SebastianBergmann\Type\ObjectType;

class UserController extends Controller
{
    public function addUser(Request $request)
    {

            $this->validate($request, [
                'nom' => 'required',
                'prenom' => 'required',
                'role' => 'required',
                'adresse' => 'required',
                'telephone' => 'required',
                'email' => 'required|email',
                'password' => 'required|min:6',

            ]);

            $user = User::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'adresse' => $request->adresse,
                'telephone' => $request->telephone,
                'role' => $request->role,
                'email' => $request->email,
                'password' => bcrypt($request->password),

            ]);
            $user -> assignRole('gerant');
            $token = $user->createToken('user Password Grand Client')->accessToken;
            return response()->json([
                'token' => $token,
                'user'=>$user
            ], 200);

        }

        public function login(Request $request)
        {
            $request->validate([
                'email'=>'required|string|email|max:255|exists:users|email',
                'password'=>'required|string|min:6'
            ]);
            $user=User::where('email',$request->email)->first();
            if(Hash::check($request->password,$user->password)){
                $token = $user->createToken('user Password Grand Client')->accessToken;
                // $data1 = ()array_merge($user);
                return response()->json(
                    [
                        'token' => $token,
                        'user' =>$user
                    ]
                );
            }
            else{
                return response()->json([
                    'message'=>'email  ou mot de passe incorrect',
                ],422);
            }

        }

//loginclient

        public function loginClient(Request $request)
        {
            $request->validate([
                'email'=>'required|string|email|max:255|exists:users|email',
                'password'=>'required|string|min:6'
            ]);
            $user=Client::where('email',$request->email)->first();
            if(Hash::check($request->password,$user->password)){
                $token = $user->createToken('user Password Grand Client')->accessToken;

                return response()->json([
                    'token'=> $token,
                    'user' => $user,
                    'roles' => collect($user->roles)->pluck('name')
                ],200);
            }
            else{
                return response()->json([
                    'message'=>'email  ou mot de passe incorrect',
                ],422);
            }

        }

        public function addRV(Request $request){
            $this->validate($request,[
                'date'=> 'required',
                'heure'=> 'required',
                'adresse'=> 'required'
            ]);

            $data = new Rendervou();
            $data->date = $request->date;
            $data->heure = $request->heure;
            $data->adresse = $request->adresse;
            $data->users_id = auth()->user()->id;
            $data->save();
            return response()->json([
                'RV' => $data
            ]);


        }

       




}
