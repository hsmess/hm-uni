<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

abstract class ApiController extends Controller
{
    protected function respondWithJson($success = true,$errors = null, $message = 'The request was a success.',$data = null,$code = 200):JsonResponse
    {
        if($success === true)
        {
            return \Response::json($data, $code);
        }
        return \Response::json([
            'errors' => $errors,
            'message' => $message,
            'data' => $data
        ], $code);
    }

}
