<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;
    protected $fillable = ['property_id','name','size'];

    //One Room belongs to a single Property
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    //To be clear, I am aware that this transformer basically does nothing right now - sorry!
    //However it is left included as a representation of how I would write one normally
    //and how I would pass manipulated data to the React app. (for consistency)
    public function formatForWeb(){
        return [
            'id' => $this->id,
            'name' => $this->name,
            'size' => $this->size,
            'property_id' => $this->property_id
        ];
    }
}
