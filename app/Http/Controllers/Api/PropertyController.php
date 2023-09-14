<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\PropertyRequest;
use App\Models\Property;
use App\Services\PropertyService;
use Illuminate\Http\JsonResponse;

class PropertyController extends ApiController
{
    protected PropertyService $propertyService;
    public function __construct(PropertyService $propertyService)
    {
        $this->propertyService = $propertyService;
    }
    public function index():JsonResponse
    {
        return $this->respondWithJson(data:$this->propertyService->getIndexQuery()->get()->map(fn($r)=>$r->formatForWeb()));
    }

    public function store(PropertyRequest $request):JsonResponse
    {
        $p = $this->propertyService->create($request);
        return $this->respondWithJson(message:'Property ' . $p->name . ' created');
    }

    public function update(Property $property, PropertyRequest $request):JsonResponse
    {
        $this->propertyService->setProperty($property);
        $this->propertyService->update($request);
        return $this->respondWithJson(message: 'Successfully updated property');
    }

    public function destroy(Property $property):JsonResponse
    {
        $pn = $property->name;
        $this->propertyService->setProperty($property);
        $this->propertyService->delete();
        return $this->respondWithJson(message:'Property ' . $pn . ' deleted');
    }


}
