<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Domain\Profile\Repositories\LanguageRepositoryInterface;
use App\Infrastructure\Repositories\LanguageRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
    $this->app->bind(LanguageRepositoryInterface::class, LanguageRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
