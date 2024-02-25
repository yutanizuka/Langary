<?php

namespace App\Infrastructure\Repositories;

use App\Domain\Profile\Repositories\LanguageRepositoryInterface;
use App\Models\Language;
use Illuminate\Support\Collection;

class LanguageRepository implements LanguageRepositoryInterface
{
    public function getAllLanguages(): Collection
    {
        return Language::all();
    }
}
