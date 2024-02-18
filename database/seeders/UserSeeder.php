<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
        'name' => 'テストユーザー',
        'email' => 'test@example.com',
        'password' => Hash::make('password'), // パスワードはハッシュ化
        'profile_image' => '/storage/images/profile_noname.jpg',
        'native_language_id' => 1,
        'learning_language_id' => 2,
        'purpose' => '学習目的',
        'retire_flag' => false,
        'last_sign_in_at' => now(),
        ]);
    }
}
