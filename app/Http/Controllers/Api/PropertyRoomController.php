<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PropertyRoomController extends ApiController
{
    public function index(Property $property):JsonResponse
    {
        $property->load('rooms');
        return $this->respondWithJson(data:$property->rooms->map(fn($r)=>$r->formatForWeb()));
    }
}
