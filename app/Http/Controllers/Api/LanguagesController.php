<?php

namespace App\Http\Controllers\Api;

use App\Domain\Profile\Repositories\LanguageRepositoryInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class LanguagesController extends Controller
{
    protected $languageRepository;

    public function __construct(LanguageRepositoryInterface $languageRepository)
    {
        $this->languageRepository = $languageRepository;
    }

    public function index(): \Illuminate\Http\JsonResponse
    {
        $languages = $this->languageRepository->getAllLanguages();
        return response()->json($languages);
    }
}
