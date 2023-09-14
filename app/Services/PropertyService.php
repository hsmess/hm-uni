<?php
namespace App\Services;



use App\Http\Requests\PropertyRequest;
use App\Models\Property;

class PropertyService
{
    protected $property;
    public function __construct(Property $property)
    {
        $this->property = $property;
    }
    public function setProperty(Property $property)
    {
        $this->property = $property;
    }

    //Create the model
    public function create(PropertyRequest $request):Property
    {
        $this->property = $this->property->create($request->validated());
        return $this->property;
    }

    //Update the given details
    public function update(PropertyRequest $request): void
    {
        $this->property->update($request->validated());
    }

    //gets the index query. This gives us a DRY place to load the relationships that are required
    public function getIndexQuery(){
        return Property::with(['rooms'])->select(['properties.*']);
    }

    //Delete the resource from the database, doing any cleanup first
    public function delete(): void
    {
        //Delete properties rooms first. Could use onDeleteCascade to do this at database layer
        //but I personally prefer to do it at application layer in case there's a case where
        //we would want to persist the rooms in the DB if the property is deleted?
        if($this->property->rooms->count() > 0)
        {
            $rs = app(RoomService::class); //inject the Room service once
            $this->property->rooms->each(function ($room) use ($rs){
                $rs->setRoom($room);
                $rs->delete();
            });
        }
        $this->property->delete();
    }

}
