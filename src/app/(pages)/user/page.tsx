"use client"

import ReadUserDataUseCase from "@/domain/use_case/read_user_data_use_case";
import Container from "@/lib/components/container";
import { User } from "@/domain/model/user_model";
import { useEffect, useState } from "react";
import Block from "@/lib/components/block";
import Loading from "@/lib/components/loading";
import { useRouter } from "next/navigation";
import Button from "@/lib/components/button";

export default function Page() {
    const [userList, setUserList] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    const readUserData = async () => {
        setLoading(true)
        const read_user_data_use_case = new ReadUserDataUseCase()
        const response = await read_user_data_use_case.readAll()
        if (!response.success) {
            alert(response.message)
            setLoading(false)
            return
        }
        setUserList(response.data as User[])
        setLoading(false)
    }

    const updateData = async () => {
        setLoading(true)
        const read_user_data_use_case = new ReadUserDataUseCase()
        const response = await read_user_data_use_case.updateUserList()
        if (!response.success) {
            alert(response.message)
            setLoading(false)
            return
        }
        setUserList(response.data as User[])
        setLoading(false)
    }
    
    useEffect(() => {
        readUserData()
    }, [])

    const clickUser = (userID: string) => {
        router.push(`/user/${userID}`)
    }

    return (
        <Container sideBarDefault="user">
            <div className="flex flex-col gap-12">
                <div className="flex flex-row justify-between">
                    <div className="text-l-t-emph text-gray-800">유저 목록</div>
                    <Button.SubFit onClick={updateData} text="새로고침" />
                </div>
                <div className="overflow-scroll flex flex-col gap-3" style={{ height: "80vh" }}>
                    {userList.map((user: User, index: number) => {
                        return <Block.UserBlock key={index} userData={user} onClick={() => clickUser(user.id)} />
                    })}
                </div>
            </div>
            {loading && <Loading />}
        </Container>
    );
}