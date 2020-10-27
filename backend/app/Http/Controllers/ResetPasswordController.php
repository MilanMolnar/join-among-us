<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\Response;

class ResetPasswordController extends Controller
{
   public function sendEmail(Request $request) {
        if(!$this->validateEmail($request->email)) {
            return $this->failedResponse();
        }

        $this->send($request->email);
        return $this->successResponse();
   }

   public function send($email){
       $token = $this->createToken($email);
       Mail::to($email)->send(new ResetPasswordMail);
   }


   public function createToken($email){
       $token = Str::random(60);
       $this->saveToken($token,$email);
   }

   public function saveToken($token,$email){
       DB::table('password_resets')->insert([
           'email' => $email,
           'token' => $token,
           'created_at' => Carbon::now()
       ]);
   }

   public function validateEmail($email){
       return User::where('email',$email)->first();
   }

   public function failedResponse(){
       return response()->json([
           'error' => 'Email does not found'
       ], Response::HTTP_NOT_FOUND);
   }


    public function successResponse(){
        return response()->json([
            'success' => 'Reset email successfully sent'
        ], Response::HTTP_OK);
    }
}
