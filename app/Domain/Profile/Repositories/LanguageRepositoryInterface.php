<?php

namespace App\Domain\Profile\Repositories;


use Illuminate\Support\Collection;

interface LanguageRepositoryInterface
{
    public function getAllLanguages(): Collection;
}
