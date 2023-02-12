<?php

namespace App\Http\Middleware;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [

          'logo' => function () use ($request) {
                $logo = Company::first()->value('logo');
                    if (!$logo) {
                        return "/assets/images/logo.svg";
                    } else {
                        return $logo;
                    }
                },

            'auth' => fn () => $request->user()
            ? $request->user()->only('name', 'avatar')
            : null,

            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },

            'toast' => function () use ($request) {
                return Session::get('message');
            },
        ]);
    }
}
