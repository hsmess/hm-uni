<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    protected $fillable = ['name','address'];
    use HasFactory;


    //One Property has many rooms
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    //Transform the data into an appropriate format for display.
    public function formatForWeb()
    {
        return [
          'id' => $this->id,
          'name' => $this->name,
          'address' => $this->address,
          'no_rooms' => count($this->rooms)
        ];
    }

}
