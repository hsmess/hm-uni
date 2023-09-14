<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Property;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PropertyController extends Controller
{
    /**
     * Display the property index
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Properties/Index');
    }

    /**
     * Create a property
     */
    public function create(): Response
    {
        return Inertia::render('Properties/Create');
    }

    /**
     * Edit a property
     */
    public function edit(Property $property): Response
    {
        return Inertia::render('Properties/Edit',['property' => $property->formatForWeb()]);
    }

}
