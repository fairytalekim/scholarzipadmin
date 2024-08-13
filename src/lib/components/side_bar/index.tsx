import CheckUserAuthUseCase from "@/domain/use_case/check_user_auth_use_case";
import LogOutUseCase from "@/domain/use_case/log_out_use_case";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SideBarButton({
    text,
    selected = false,
    onClick
}: {
    text: string,
    selected?: boolean,
    onClick?: () => void
}) {
    return (
        <button
            className={`
                flex items-center justify-between w-full p-4 rounded-xl
                hover:bg-brand-50 hover:text-brand-700 transition-colors duration
                text-b-sb
                ${selected ? "bg-brand-50 text-brand-700" : "text-gray-500"}
            `}
            onClick={onClick}
        >
            {text}
            {
                selected && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19.018 5.9967C18.762 5.9967 18.495 6.08071 18.3 6.2727L9.59301 14.8667C9.33601 15.1197 9.07802 15.0727 8.87602 14.7747L5.88001 10.3547C5.57401 9.9037 4.93401 9.7777 4.47501 10.0787C4.01701 10.3797 3.88901 11.0087 4.19501 11.4597L7.19001 15.8797C8.09201 17.2087 9.84901 17.3777 10.998 16.2477L19.736 7.68469C20.125 7.30069 20.125 6.6567 19.736 6.2727C19.541 6.08071 19.273 5.9967 19.018 5.9967Z" fill="#ff6600" />
                </svg>
            }
        </button>
    )
}

function LogOutButton({
    onClick
}: {
    onClick: () => void
}) {
    return (
        <button
            className={`
                flex items-center justify-between w-fit p-4 rounded-xl
                hover:bg-gray-300 text-gray-800 bg-gray-200
                transition-colors duration
                text-b-sb
            `}
            onClick={onClick}
        >
            로그아웃
        </button>
    )
}

export type MenuList = "scholarship" | "scholarship/add" | "user" | "scholarship/pending";

export default function SideBar({
    defaultSelected = "user"
}: {
    defaultSelected?: MenuList
}) {
    const [permission, setPermission] = useState(false);
    const router = useRouter();
    const routeTo = (to: MenuList) => {
        router.push(`/${to}`);
    }
    const logOut = async () => {
        const log_out_use_case = new LogOutUseCase();
        const response = await log_out_use_case.execute();
        if (response.success) router.push("/");
    }

    const initAuth = async () => {
        const check_auth_use_case = new CheckUserAuthUseCase();
        const response = await check_auth_use_case.execute();
        if (!response.success) router.push("/");
        if (response.data === "yTqzpTAul8evjcn8wsdelNz8pjg1") setPermission(false);
        else setPermission(true);
    }

    useEffect(() => {
        initAuth();
    }, [])

    return (
        <aside className="p-8 border-r border-gray-200 flex flex-col gap-12 h-screen box-border"
            style={{ minWidth: 320 }}>
            <Image
                src="https://firebasestorage.googleapis.com/v0/b/scholar-zip.appspot.com/o/logo.webp?alt=media&token=98cd7a8a-956c-442d-98b8-0fb2d2ea1f51"
                alt="logo"
                width={320}
                height={100}
                className="pr-20"
                priority={false}
            />
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-7">
                    {
                        permission && <div className="flex flex-col gap-1">
                            <div className="px-4 text-brand-400 text-st-emph">유저</div>
                            <SideBarButton
                                text="유저 목록 보기"
                                selected={defaultSelected === "user"}
                                onClick={() => routeTo("user")}
                            />
                        </div>
                    }
                    <div className="flex flex-col gap-1">
                        <div className="px-4 text-brand-400 text-st-emph">장학금</div>
                        <SideBarButton
                            text="장학금 목록 보기"
                            selected={defaultSelected === "scholarship"}
                            onClick={() => routeTo("scholarship")}
                        />
                        <SideBarButton
                            text="장학금 추가하기"
                            selected={defaultSelected === "scholarship/add"}
                            onClick={() => routeTo("scholarship/add")}
                        />
                        <SideBarButton
                            text="장학금 발송 대기 목록"
                            selected={defaultSelected === "scholarship/pending"}
                            onClick={() => routeTo("scholarship/pending")}
                        />
                    </div>
                </div>
                <LogOutButton
                    onClick={logOut}
                />
            </div>
        </aside>
    )
}