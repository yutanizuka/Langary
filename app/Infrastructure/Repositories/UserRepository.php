<?php

namespace Infrastructure\Repositories;

use App\Domain\Profile\Repositories\UserRepositoryInterface;
use App\Models\User; // Eloquentモデル

class UserRepository implements UserRepositoryInterface
{
    public function findUserWithLanguages($userId)
    {
        return User::with(['nativeLanguage', 'learningLanguage'])->find($userId);
    }
}
