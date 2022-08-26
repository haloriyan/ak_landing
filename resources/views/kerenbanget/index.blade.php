<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $site->site_title }}</title>
    <link rel="stylesheet" href="{{ asset('css/base/column.css') }}">
    <link rel="stylesheet" href="{{ asset('css/base/color.css') }}">
    <link rel="stylesheet" href="{{ asset('css/base/font.css') }}">
    <link rel="stylesheet" href="{{ asset('css/base/button.css') }}">
    <link rel="stylesheet" href="{{ asset('css/templates/' . $site->template . '.css') }}">
</head>
<body>

<header class="flex row wrap item-center">
    <div class="w-25 flex justify-end">
        <h1 class="m-0 text white">{{ $site->site_title }}</h1>
    </div>
    <nav class="w-50 text-center flex item-center justify-center">
        <a href="#">
            <li>About</li>
        </a>
        <a href="#">
            <li>Speaker</li>
        </a>
        <a href="#">
            <li>Rundown</li>
        </a>
    </nav>
    <button class="primary rounded-none">
        Book
    </button>
</header>

<div class="background" bg-image="{{ env('AK_DOMAIN') }}/storage/event_assets/{{ $event->slug }}/event_logo/thumbnail/{{ $event->logo }}"></div>
<div class="container p-5 flex item-center">
    <div class="w-40">
        <h2 class="tagline">{{ $site->tagline }}</h2>
        <button class="rounded-none primary big">Book Tickets</button>
    </div>
    <div class="w-20"></div>
    <div class="w-40 flex row wrap">
        <div class="infographic bg-blue mr-2">
            <div class="count">12</div>
            <div class="text">Speakers</div>
        </div>
        <div class="infographic bg-green mr-2">
            <div class="count">3</div>
            <div class="text">Days</div>
        </div>
        <div class="infographic bg-primary">
            <div class="count">5</div>
            <div class="text">Class</div>
        </div>
    </div>
</div>

<div class="bottom">
    <section class="text-center p-5 flex row wrap justify-center" id="info">
        <div class="text small primary w-100">Join Us</div>
        <h2 class="m-0 mt-1 w-100 weight-800">{{ $event->name }}</h2>
        <div class="h-80"></div>

        <p class="w-80">{{ $site->meta_description }}</p>
    </section>

    <section class="p-4 bg-primary dark" id="speaker">
        <h2>Our Speakers</h2>
    </section>

    <section class="p-5 flex row wrap justify-center" id="sponsor">
        <h2 class="w-100 text-center m-0">Thanks to Our Sponsors</h2>
        @foreach ($event->sponsors as $sponsor)
            @php
                $website = substr($sponsor->website, 0, 4) == "http" ? $sponsor->website : "https://".$sponsor->website;
            @endphp
            <div class="w-20 squarize rectangle text-center">
                <a href="{{ $website }}" class="text normal" target="_blank">
                    <img 
                        src="{{ env('AK_DOMAIN') }}/storage/event_assets/{{ $event->slug }}/sponsor_logo/{{ $sponsor->logo }}" 
                        alt="{{ $sponsor->name }}"
                    >
                    <b>{{ $sponsor->name }}</b>
                </a>
            </div>
        @endforeach
    </section>
</div>

<script src="{{ asset('js/base.js') }}"></script>

</body>
</html>