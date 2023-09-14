<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\RoomRequest;
use App\Http\Requests\RoomUpdateRequest;
use App\Models\Room;
use App\Services\RoomService;
use Illuminate\Http\JsonResponse;

class RoomController extends ApiController
{
    protected RoomService $roomService;
    public function __construct(RoomService $roomService)
    {
        $this->roomService = $roomService;
    }

    //Create a new Room at a property
    public function store(RoomRequest $request):JsonResponse
    {
        $r = $this->roomService->create($request);
        return $this->respondWithJson(message:'Room ' . $r->name . ' created on property ' . $r->property->name);
    }

    public function update(Room $room, RoomUpdateRequest $request):JsonResponse
    {
        $this->roomService->setRoom($room);
        $this->roomService->update($request);
        return $this->respondWithJson();
    }

    public function destroy(Room $room):JsonResponse
    {
        $rn = $room->name;
        $this->roomService->setRoom($room);
        $this->roomService->delete();
        return $this->respondWithJson(message:'Room ' . $rn . ' deleted');
    }
}
