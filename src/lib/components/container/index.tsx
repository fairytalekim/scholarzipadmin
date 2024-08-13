import { ReactNode, useEffect } from "react";
import SideBar, { MenuList } from "../side_bar";
import CheckUserAuthUseCase from "@/domain/use_case/check_user_auth_use_case";
import { useRouter } from "next/navigation";

export default function Container({
    children,
    sideBarDefault = "user"
}: {
    children: ReactNode,
    sideBarDefault?: MenuList
}) {
    const router = useRouter();
    const initAuth = async () => {
        const check_auth_use_case = new CheckUserAuthUseCase();
        const response = await check_auth_use_case.execute();
        if (!response.success) router.push("/");
    }
    useEffect(() => {
        initAuth();
    }, [])

    return (
        <div
            className="w-full h-screen box-border overflow-hidden grid "
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 4fr",
            }}
        >
            <SideBar defaultSelected={sideBarDefault} />
            <div className="p-12 h-screen box-border relative" style={{ maxWidth: 960 }}>
                {children}
            </div>
            <div />
        </div>
    )
}