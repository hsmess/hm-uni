<?php
namespace App\Services;


use App\Http\Requests\RoomRequest;
use App\Http\Requests\RoomUpdateRequest;
use App\Models\Room;

class RoomService
{
    protected $room;
    public function __construct(Room $room)
    {
        $this->room = $room;
    }
    public function setRoom(Room $room)
    {
        $this->room = $room;
    }

    //Create the model
    public function create(RoomRequest $request):Room
    {
        $this->room = $this->room->create($request->validated());
        return $this->room;
    }

    //Update the given details
    public function update(RoomUpdateRequest $request): void
    {
        $this->room->update($request->validated());
    }

    //Delete the resource from the database, doing any cleanup first
    public function delete(): void
    {
        //handle any cleanup required
        $this->room->delete();
    }

}
