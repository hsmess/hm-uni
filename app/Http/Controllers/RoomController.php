<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Property;
use App\Models\Room;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    /**
     * Display the property index
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Rooms/Index');
    }

    /**
     * Create a property
     */
    public function create(): Response
    {
        return Inertia::render('Rooms/Create');
    }

    /**
     * Edit a property
     */
    public function edit(Room $room): Response
    {
        return Inertia::render('Rooms/Edit',['room' => $room->formatForWeb()]);
    }

}
