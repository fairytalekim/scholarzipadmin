"use client"

import { User } from "@/domain/model/user_model"
import AddScholarshipUseCase from "@/domain/use_case/add_scholarship_use_case"
import Block from "@/lib/components/block"
import Button from "@/lib/components/button"
import Container from "@/lib/components/container"
import Loading from "@/lib/components/loading"
import Modal from "@/lib/components/modal"
import { useEffect, useState } from "react"

export default function Page() {
    const add_scholarship = new AddScholarshipUseCase()


    const [loading, setLoading] = useState<boolean>(false)
    const [pendingList, setPendingList] = useState<any[]>([{}])
    const [scholarship, setScholarship] = useState<any>({})
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const scholarshipWaitlistJSON = localStorage.getItem("scholarshipWaitlist")
        if (!scholarshipWaitlistJSON) return
        const scholarshipWaitlist = JSON.parse(scholarshipWaitlistJSON)
        const scholarship = scholarshipWaitlist.scholarship
        const users = scholarshipWaitlist.users

        setScholarship(scholarship)
        setPendingList(users)
    }, [])

    const sendKakao = async () => {
        setLoading(true)
        const response = await add_scholarship.addScholarship(scholarship, pendingList)
        if (!response.success) {
            alert(response.message)
            setLoading(false)
            return
        }
        alert(response.message)
        localStorage.removeItem("scholarshipWaitlist")
        setPendingList([])
        setModal(false)
        setLoading(false)
    }

    return (
        <Container sideBarDefault="user">
            <div className="flex flex-col gap-12">
                <div className="flex justify-between items-center">
                    <div className="text-l-t-emph text-gray-800">장학금 카카오톡 발송 대기 목록</div>
                    <Button.Main text="카카오톡 발송" onClick={() => setModal(true)} />
                </div>
                <div className="relative w-full h-full">
                    <div className="overflow-scroll flex flex-col gap-3 absoulte w-full h-full">
                        {pendingList.map((user: User, index: number) => (
                            <Block.MatchingBlock key={index} scholarship={scholarship} matchedData={user} onSend={sendKakao} />
                        ))}
                    </div>
                </div>
            </div>
            {loading && <Loading />}
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                title="정말 카카오톡을 발송하시겠습니까?"
            >
                <div className="flex gap-3">
                    <Button.Main text="발송하기" onClick={sendKakao} />
                    <Button.SubFit text="취소하기" onClick={() => setModal(false)} />
                </div>
            </Modal>
        </Container>
    )
}