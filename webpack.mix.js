const mix = require("laravel-mix");

// コンパイルするCSSファイルを指定し、postCssとしてTailwind CSSを使用する
mix.postCss("resources/css/app.css", "public/css", [require("tailwindcss")]);
