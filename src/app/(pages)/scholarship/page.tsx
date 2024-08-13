"use client"

import Container from "@/lib/components/container";
import { useEffect, useState } from "react";
import { Scholarship } from "@/domain/model/scholarship_model";
import Block from "@/lib/components/block";
import ReadScholarshipDataUseCase from "@/domain/use_case/read_scholarship_data_use_case";
import Loading from "@/lib/components/loading";
import { useRouter } from "next/navigation";
import Input from "@/lib/components/input";
import Button from "@/lib/components/button";
import datesToSec from "@/utils/dates_to_sec";

export default function Page() {
    const [scholarshipList, setScholarshipList] = useState<Scholarship[]>([])
    const [exposedList, setExposedList] = useState<Scholarship[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [filter, setFilter] = useState({} as any)
    const router = useRouter()
    const readScholarshipData = async () => {
        setLoading(true)
        const read_scholarship_data_use_case = new ReadScholarshipDataUseCase()
        const response = await read_scholarship_data_use_case.readAll()
        if (!response.success) {
            alert(response.message)
            setLoading(false)
            return
        }
        setScholarshipList(response.data as Scholarship[])
        setExposedList(response.data as Scholarship[])
        setLoading(false)
    }

    const updateScholarshipData = async () => {
        setLoading(true)
        const read_scholarship_data_use_case = new ReadScholarshipDataUseCase()
        const response = await read_scholarship_data_use_case.updateScholarshipList()
        if (!response.success) {
            alert(response.message)
            setLoading(false)
            return
        }
        setScholarshipList(response.data as Scholarship[])
        setExposedList(response.data as Scholarship[])
        setLoading(false)
    }

    useEffect(() => {
        readScholarshipData()
    }, [])

    const clickScholarship = (scholarshipID: string) => {
        router.push(`/scholarship/${scholarshipID}`)
    }

    const sortConditions = ["생성 내림차순", "마감 내림차순"];
    const sortBy = (e: (typeof sortConditions)[number]) => {
        const type = e === "마감 내림차순" ? "endsAt" : "createdAt";
        const sortedList = [...scholarshipList].sort((a, b) => {
            const aDate = datesToSec(a[type] as any);
            const bDate = datesToSec(b[type] as any);
            return bDate - aDate;
        });
        setExposedList(sortedList);
    };

    const filterBy = () => {
        const filteredList = scholarshipList.filter((scholarship) => {
            return (
                (!scholarship.type || scholarship.type.includes(filter.type)) &&
                (!scholarship.totalNum || scholarship.totalNum >= filter.totalNum) &&
                (!scholarship.endsAt || scholarship.endsAt <= filter.endsAt)
            )
        })
        setScholarshipList(filteredList)
    }

    const searchBy = (e: string) => {
        const filteredList = scholarshipList.filter((scholarship) => {
            return scholarship.name.includes(e) || scholarship.organization.includes(e)
        })
        setExposedList(filteredList)
    }


    return (
        <Container sideBarDefault="scholarship">
            <div className="flex flex-col gap-12">
                <div className="flex justify-between items-center">
                    <div className="flex flex-row gap-5">
                        <div className="text-l-t-emph text-gray-800">장학금 목록</div>
                        <Button.SubFit onClick={updateScholarshipData} text="새로고침" />
                    </div>
                    <div className="flex gap-3 items-end">
                        <Input.SingleSelect options={sortConditions} title="정렬" onChange={(e: string) => sortBy(e)} />
                        <Input.SimplifiedInput title="장학금 검색" onChange={searchBy} />
                    </div>
                </div>
                <div className="overflow-scroll flex flex-col gap-3" style={{ height: "80vh" }}>
                    {exposedList.map((scholarship: Scholarship, index: number) => {
                        return <Block.ScholarshipBlock key={index} scholarshipData={scholarship} onClick={() => clickScholarship(scholarship.id || "")} />
                    })}
                </div>
            </div>
            {loading && <Loading />}
        </Container>
    );
}