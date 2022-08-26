<?php

namespace App\Http\Controllers;

use App\Models\EventSite;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function page() {
        $domain = $_SERVER['SERVER_NAME'];
        $site = EventSite::where('domain', $domain)->with(['event.sponsors'])->first();
        $event = $site->event;

        return view($site->template.'.index', [
            'site' => $site,
            'event' => $event
        ]);
    }
}
