<?php

namespace App\Domain\Profile\Repositories;

interface UserRepositoryInterface

{
    public function findUserWithLanguages($userId);
}
