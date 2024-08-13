"use client"

import ReadUserDataUseCase from "@/domain/use_case/read_user_data_use_case";
import Container from "@/lib/components/container";
import { User } from "@/domain/model/user_model";
import { useEffect, useState } from "react";
import Loading from "@/lib/components/loading";
import { useParams } from "next/navigation";
import formatDate from "@/utils/format_date";
import SegmentedControl from "@/lib/components/segmented_control";

function TitleContents({ title, contents }: { title: string, contents: string | number | boolean | any[] }) {
    const formatContents = (contents: string | number | boolean | any[]) => {
        if (typeof contents === "string" && contents.includes("·")) {
            const contentArray = contents.split("·")
            return contentArray.join(", ")
        } else return contents
    }
    return (
        <div className="flex flex-col gap-1">
            <div className="text-st-emph text-gray-600">{title}</div>
            <div className="text-b-m text-gray-800">{formatContents(contents)}</div>
        </div>
    )
}

export default function Page() {
    const params = useParams()
    const [userData, setUserData] = useState<User>({} as User)
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedSegment, setSelectedSegment] = useState<"기본 정보" | "학업 정보" | "장학 정보">("기본 정보")

    const userID = params.userID as string
    const readUserData = async () => {
        setLoading(true)
        const read_user_data_use_case = new ReadUserDataUseCase()
        const response = await read_user_data_use_case.readUsingID(userID)
        if (!response.success) {
            alert(response.message)
            setLoading(false)
            return
        }
        setUserData(response.data)
        setLoading(false)
    }

    useEffect(() => {
        readUserData()
    }, [])


    return (
        <Container sideBarDefault="user">
            <div className="flex flex-col gap-12">
                <div className="flex gap-1 items-center">
                    <div className="text-l-t-emph text-gray-800">{userData.name} 회원</div>
                    <div className="text-t-3-r text-gray-600">({userData.id})</div>
                </div>
                <SegmentedControl
                    contents={["기본 정보", "학업 정보", "장학 정보"]}
                    onSelect={(content: string) => setSelectedSegment(content as "기본 정보" | "장학 정보")}
                />
                {selectedSegment === "기본 정보"
                    && <div className="grid grid-cols-3 gap-y-6">
                        <TitleContents title="이름" contents={userData.name} />
                        <TitleContents title="전화번호" contents={userData.phoneNum} />
                        <TitleContents title="성별" contents={userData.sex} />
                        <TitleContents title="가입일" contents={formatDate(userData.createdAt)} />
                        <TitleContents title="결제 여부" contents={userData.hasPaid} />
                        <TitleContents title="계정 상태" contents={userData.status} />
                        <TitleContents title="마지막 결제일" contents={formatDate(userData.lastPaymentDate)} />
                        <TitleContents title="소득 분위" contents={userData.incomeBracket} />
                        <TitleContents title="종교" contents={userData.religion} />
                    </div>}
                {selectedSegment === "학업 정보"
                    && <div className="grid grid-cols-3 gap-y-6">
                        <TitleContents title="학교" contents={userData.school} />
                        <TitleContents title="계열" contents={userData.division} />
                        <TitleContents title="학과" contents={userData.major} />
                        <TitleContents title="학기" contents={userData.semester} />
                        <TitleContents title="예정 진로" contents={userData.career} />
                        <TitleContents title="총 학점" contents={userData.totalGPA} />
                        <TitleContents title="최종 학점" contents={userData.lastGPA} />
                    </div>}
                {selectedSegment === "장학 정보"
                    && <div className="grid grid-cols-3 gap-y-6">
                        <TitleContents title="학자금 대출 여부" contents={userData.studentLoan} />
                        <TitleContents title="현재 장학금 수혜 여부" contents={userData.currentScholarship} />
                        <TitleContents title="현재 전액 장학금 수혜 여부" contents={userData.currentScholarship} />
                        <TitleContents title="생활비 장학금 정보" contents={userData.livingScholarship} />
                    </div>}
            </div>
            {loading && <Loading />}
        </Container>
    );
}