<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $images = glob(public_path('/storage/images/icons/*'));
        // ランダムに一つのイメージファイルを選択
        $randomImage = $images[array_rand($images)];

        // データベースに保存するための相対パスに変換
        $relativePath = str_replace(public_path(), '', $randomImage);

        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'native_language_id' => 1,
            'learning_language_id' => 2,
            'purpose' => '学習目的',
            'profile_image' => $relativePath,
            'retire_flag' => false,
            'last_sign_in_at' => now(),

        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
