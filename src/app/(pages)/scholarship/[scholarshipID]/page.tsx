"use client"

import Container from "@/lib/components/container";
import { User } from "@/domain/model/user_model";
import { useEffect, useState } from "react";
import Loading from "@/lib/components/loading";
import { useParams } from "next/navigation";
import formatDate from "@/utils/format_date";
import ReadScholarshipDataUseCase from "@/domain/use_case/read_scholarship_data_use_case";
import { Scholarship } from "@/domain/model/scholarship_model";
import Button from "@/lib/components/button";

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
    const [scholarshipData, setScholarshipData] = useState<Scholarship>({} as Scholarship)
    const [loading, setLoading] = useState<boolean>(true)

    const scholarshipID = params.scholarshipID as string
    const readUserData = async () => {
        setLoading(true)
        const read_scholarship_data_use_case = new ReadScholarshipDataUseCase()
        const response = await read_scholarship_data_use_case.readUsingID(scholarshipID)
        if (!response.success) {
            alert(response.message)
            setLoading(false)
            return
        }
        setScholarshipData(response.data)
        setLoading(false)
    }

    useEffect(() => {
        readUserData()
    }, [])

    const openURL = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <Container sideBarDefault="scholarship">
            <div className="flex flex-col gap-12">
                <div className="text-l-t-emph text-gray-800">{scholarshipData.name}</div>
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-5">
                        <div className="text-brand-600 text-st-emph border-b pb-3 border-gray-200">날짜 정보</div>
                        <div className="grid grid-cols-3 gap-y-5">
                            <TitleContents title="입력 날짜" contents={formatDate(scholarshipData.createdAt)} />
                            <TitleContents title="신청 시작 날짜" contents={formatDate(scholarshipData.startsAt)} />
                            <TitleContents title="신청 종료 날짜" contents={formatDate(scholarshipData.endsAt)} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="text-brand-600 text-st-emph border-b pb-3 border-gray-200">성적 기준</div>
                        <div className="grid grid-cols-3 gap-y-5">
                            <TitleContents title="마지막 학점(4.3 기준)" contents={scholarshipData.last43} />
                            <TitleContents title="총 학점(4.3 기준)" contents={scholarshipData.total43} />
                            <TitleContents title="마지막 학점(4.5 기준)" contents={scholarshipData.last45} />
                            <TitleContents title="총 학점(4.5 기준)" contents={scholarshipData.total45} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="text-brand-600 text-st-emph border-b pb-3 border-gray-200">학생 관련 기준</div>
                        <div className="grid grid-cols-3 gap-y-5">
                            <TitleContents title="성별" contents={scholarshipData.sex} />
                            <TitleContents title="소득 분위" contents={scholarshipData.incomeBracket} />
                            <TitleContents title="종교" contents={scholarshipData.religion} />
                            <TitleContents title="모집 인원" contents={scholarshipData.totalNum} />
                            <TitleContents title="학기" contents={scholarshipData.semester} />
                            <TitleContents title="계열" contents={scholarshipData.division} />
                            <TitleContents title="학과" contents={scholarshipData.major} />
                        </div>
                    </div>
                </div>
                <Button.Main text="장학금 공고 바로가기" onClick={() => openURL(scholarshipData.link)} />
            </div>
            {loading && <Loading />}
        </Container>
    );
}