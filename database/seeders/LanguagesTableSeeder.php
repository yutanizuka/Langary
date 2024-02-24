<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class LanguagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $exists = DB::table('languages')->exists();

        if(!$exists) {
            $languages = [
                ['language_name' => '英語 (English)'],
                ['language_name' => '中国語（簡体）(中文（简体）)'],
                ['language_name' => '中国語（繁体）(中文（繁體）)'],
                ['language_name' => 'スペイン語 (Español)'],
                ['language_name' => 'ヒンディー語 (हिन्दी)'],
                ['language_name' => 'アラビア語 (العربية)'],
                ['language_name' => 'ポルトガル語 (Português)'],
                ['language_name' => 'ベンガル語 (বাংলা)'],
                ['language_name' => 'ロシア語 (Русский)'],
                ['language_name' => '日本語 (日本語)'],
                ['language_name' => 'ドイツ語 (Deutsch)'],
                ['language_name' => '韓国語 (한국어)'],
                ['language_name' => 'フランス語 (Français)'],
                ['language_name' => 'トルコ語 (Türkçe)'],
                ['language_name' => 'イタリア語 (Italiano)'],
                ['language_name' => 'ペルシャ語 (فارسی)'],
                ['language_name' => 'ポーランド語 (Polski)'],
                ['language_name' => 'ウクライナ語 (Українська)'],
                ['language_name' => 'オランダ語 (Nederlands)'],
                ['language_name' => 'インドネシア語 (Bahasa Indonesia)'],
            ];
            DB::table('languages')->insert($languages);
        }
    }
}
