<?php

namespace App\Domain\Profile\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Domain\Profile\Repositories\LanguageRepositoryInterface;

class ProfileInformationController extends Controller
{
    protected $languageRepository;
    public function __construct(LanguageRepositoryInterface $languageRepository)
    {
        $this->languageRepository = $languageRepository;
    }

    public function index()
    {
        $languages = $this->languageRepository->getAllLanguages();
        // ここで取得した言語データをビューに渡すか、JSONとして返すなどの処理を行います。
    }
}
