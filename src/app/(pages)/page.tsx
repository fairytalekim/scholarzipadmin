"use client"

import CheckUserAuthUseCase from "@/domain/use_case/check_user_auth_use_case";
import LogInUseCase from "@/domain/use_case/log_in_use_case";
import url from "@/domain/use_case/url";
import Button from "@/lib/components/button";
import Input from "@/lib/components/input";
import Loading from "@/lib/components/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [logInData, setLogInData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: string | number, type: "email" | "password") => {
        setLogInData({
            ...logInData,
            [type]: e
        })
    }

    const checkAuth = async () => {
        setLoading(true)
        const check_user_auth_use_case = new CheckUserAuthUseCase()
        const response = await check_user_auth_use_case.execute()
        if (response.success) router.push("/user")
        setLoading(false)
    }

    useEffect(() => {
        checkAuth()
    }, [])

    const logIn = async (email: string, password: string) => {
        setLoading(true)
        const log_in_use_case = new LogInUseCase()
        const response = await log_in_use_case.execute(email, password)
        console.log(url)
        if (!response.success) {
            alert("로그인에 실패했습니다.")
            setLoading(false)
            return
        }
        setLoading(false)
        router.push("/user")
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="flex flex-col gap-12 px-8 py-12 border border-gray-200 box-content rounded-2xl" style={{ minWidth: 280 }}>
                <div className="text-t-2-emph text-gray-800 text-center">관리자 페이지 로그인</div>
                <div className="flex flex-col gap-4 items-center">
                    <Input.InputField
                        title="이메일"
                        type="text"
                        onChange={(e: string) => handleChange(e, "email")}
                        value={logInData.email}
                    />
                    <Input.InputField
                        title="비밀번호"
                        type="password"
                        onChange={(e: string) => handleChange(e, "password")}
                        value={logInData.password}
                        clickEnter={() => logIn(logInData.email, logInData.password)}
                    />
                </div>
                <Button.Fill text="로그인하기" onClick={() => logIn(logInData.email, logInData.password)} />
            </div>
            {loading && <Loading />}
        </div>
    );
}