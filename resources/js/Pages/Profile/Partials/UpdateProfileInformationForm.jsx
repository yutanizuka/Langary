import React, { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const [learningLanguageId, setLearningLanguageId] = useState(
        user.learning_language_id || "0"
    );
    const [nativeLanguageId, setNativeLanguageId] = useState(
        user.native_language_id || "0"
    );

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    // コンポーネント内部
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        // APIから言語リストを取得する仮の関数
        const fetchLanguages = async () => {
            try {
                const response = await fetch("/api/languages"); // APIのURLは適宜変更してください
                const data = await response.json();
                setLanguages(data); // 取得した言語リストで状態を更新
            } catch (error) {
                console.error("言語リストの取得に失敗しました", error);
            }
        };

        fetchLanguages();
    }, []); // 空の依存配列を渡して、コンポーネントのマウント時にのみ実行されるようにする

    // 言語設定の変更をハンドルする関数
    const handleLearningLanguageChange = (e) => {
        setLearningLanguageId(e.target.value);
    };

    const handleNativeLanguageChange = (e) => {
        setNativeLanguageId(e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };
    console.log(user);
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {/* Profile Information */}
                    ユーザー情報
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    {/* Update your account's profile information and email address. */}
                    アカウントとメールアドレスの更新
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <img
                        src={
                            user.profile_photo_url ||
                            "storage/images/icons/icon1.png"
                        }
                        width="100px"
                        alt="プロフィール画像"
                    />
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <p>学びたい言語</p>
                    <select
                        name="ser.learning_language_id"
                        id="learning_language"
                        value={learningLanguageId} // value属性を設定
                        onChange={handleLearningLanguageChange} // onChangeイベントハンドラーを設定
                    >
                        <option value="0">未設定</option>
                        {languages.map((language) => (
                            <option key={language.id} value={language.id}>
                                {language.language_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <p>あなたの母国語</p>
                    <select
                        name="user.native_language_id"
                        id="native_language"
                        value={nativeLanguageId}
                        onChange={handleNativeLanguageChange}
                    >
                        <option value="0">未設定</option>
                        {languages.map((language) => (
                            <option key={language.id} value={language.id}>
                                {language.language_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>保存</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">保存しました</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
