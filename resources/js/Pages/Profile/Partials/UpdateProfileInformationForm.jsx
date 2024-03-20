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
            learning_language_id: user.learning_language_id || "0", // 初期値として設定
            native_language_id: user.native_language_id || "0", // 初期値として設定
        });

    // コンポーネント内部
    const [languages, setLanguages] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(
        user.profile_photo_url || "storage/images/icons/icon1.png"
    );
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

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

    const handleLanguageChange = (e) => {
        const { name, value } = e.target;
        setData((data) => ({ ...data, [name]: value }));
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), data); // 更新されたdataを使用して送信
    };
    // console.log(user);
    console.log(data);
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
                        name="learning_language_id"
                        id="learning_language"
                        value={data.learning_language_id} // useFormのdataを使用
                        onChange={handleLanguageChange}
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
                        name="native_language_id"
                        id="native_language"
                        value={data.native_language_id}
                        onChange={handleLanguageChange}
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
