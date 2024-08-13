"use client"

import { User } from "@/domain/model/user_model";
import AddScholarshipUseCase from "@/domain/use_case/add_scholarship_use_case";
import ReadAreasUseCase from "@/domain/use_case/read_areas_use_case";
import ReadScholarshipFieldsUseCase from "@/domain/use_case/read_scholarship_fields_use_case";
import Block from "@/lib/components/block";
import Button from "@/lib/components/button";
import Container from "@/lib/components/container";
import Input from "@/lib/components/input";
import Loading from "@/lib/components/loading";
import Modal from "@/lib/components/modal";
import convertGPA from "@/utils/convert_gpa";
import { useEffect, useState } from "react";

export default function Page() {
    const add_scholarship = new AddScholarshipUseCase()

    const defaultScholarship = {
        "name": "",
        "type": "",
        "totalNum": 0,
        "regionMain": "제한없음",
        "regionSub": "",
        "school": "제한없음",
        "last45": 0,
        "last43": 0,
        "lastPercentile": 0,
        "total45": 0,
        "total43": 0,
        "totalPercentile": 0,
        "endsAt": "",
        "createdAt": "",
        "additions": ["제한없음"],
        "career": ["제한없음"],
        "details": "",
        "division": ["제한없음"],
        "extra": "",
        "incomeBracket": 10,
        "inSchoolSupport": "",
        "link": "",
        "major": "제한없음",
        "organization": "",
        "religion": "제한없음",
        "semester": ["제한없음"],
        "sex": "제한없음",
    }
    const [scholarship, setScholarship] = useState(defaultScholarship as any)
    const [modal, setModal] = useState(false)
    const [areas, setAreas] = useState([] as any[])
    const [fields, setFields] = useState({
        "성적": [],
        "장학": [],
        "학생": [],
        "날짜": [],
        "비고": []
    })
    const [loading, setLoading] = useState(false)
    const handleInput = (key: string, value: string | string[]) => {
        if (Array.isArray(value)) {
            setScholarship({
                ...scholarship,
                [key]: value
            })
        } else if (key === "last45") {
            if (value === "") {
                setScholarship({
                    ...scholarship,
                    last43: 0,
                    [key]: value,
                })
                return
            }
            const value4_3 = convertGPA(parseFloat(value), "gpa4_5", "gpa4_3").toString()
            setScholarship({
                ...scholarship,
                last43: value4_3,
                [key]: value,
            })
        } else if (key === "last43") {
            if (value === "") {
                setScholarship({
                    ...scholarship,
                    last45: 0,
                    [key]: value,
                })
                return
            }
            const value4_5 = convertGPA(parseFloat(value), "gpa4_3", "gpa4_5").toString()
            setScholarship({
                ...scholarship,
                last45: value4_5,
                [key]: value,
            })
        } else if (key === "total45") {
            if (value === "") {
                setScholarship({
                    ...scholarship,
                    total43: 0,
                    [key]: value,
                })
                return
            }
            const value4_3 = convertGPA(parseFloat(value), "gpa4_5", "gpa4_3").toString()
            setScholarship({
                ...scholarship,
                total43: value4_3,
                [key]: value,
            })
        } else if (key === "total43") {
            if (value === "") {
                setScholarship({
                    ...scholarship,
                    total45: 0,
                    [key]: value,
                })
                return
            }
            const value4_5 = convertGPA(parseFloat(value), "gpa4_3", "gpa4_5").toString()
            setScholarship({
                ...scholarship,
                total45: value4_5,
                [key]: value,
            })
        } else if (key === "totalPercentile") {
            if (value === "") {
                setScholarship({
                    ...scholarship,
                    total45: 0,
                    total43: 0,
                    [key]: value,
                })
                return
            } else if (value === "제한없음") {
                setScholarship({
                    ...scholarship,
                    total45: "제한없음",
                    total43: "제한없음",
                    [key]: value,
                })
                return
            }
            const value4_5 = convertGPA(parseFloat(value), "gpa100", "gpa4_5").toString()
            const value4_3 = convertGPA(parseFloat(value), "gpa100", "gpa4_3").toString()
            setScholarship({
                ...scholarship,
                total45: value4_5,
                total43: value4_3,
                [key]: value,
            })
        } else if (key === "lastPercentile") {
            if (value === "") {
                setScholarship({
                    ...scholarship,
                    total45: 0,
                    total43: 0,
                    [key]: value,
                })
                return
            } else if (value === "제한없음") {
                setScholarship({
                    ...scholarship,
                    last45: "제한없음",
                    last43: "제한없음",
                    [key]: value,
                })
                return
            }
            const value4_5 = convertGPA(parseFloat(value), "gpa100", "gpa4_5").toString()
            const value4_3 = convertGPA(parseFloat(value), "gpa100", "gpa4_3").toString()
            setScholarship({
                ...scholarship,
                last45: value4_5,
                last43: value4_3,
                [key]: value,
            })
        } else setScholarship({
            ...scholarship,
            [key]: value
        })
    }
    const [filteredUsers, setFilteredUsers] = useState([] as User[])

    const filterUsers = async () => {
        setLoading(true)

        const response = await add_scholarship.getMatchedUsers(scholarship)
        if (!response.success) {
            alert(response.message)
            setLoading(false)
            return
        }
        setFilteredUsers(response.data)
        setLoading(false)
    }

    const addScholarship = async (maintain?: boolean) => {
        setLoading(true)
        const scholarshipWaitlist = JSON.stringify({
            scholarship: scholarship,
            users: filteredUsers
        })
        localStorage.removeItem("scholarshipWaitlist")
        localStorage.setItem("scholarshipWaitlist", scholarshipWaitlist)
        alert("장학금 발송 대기 목록으로 이동했습니다.")
        if (!maintain) setScholarship(defaultScholarship)
        setModal(false)
        setLoading(false)
    }

    const transformItems = (items: any) => {
        const regionMap: any = {};

        items.forEach((item: any) => {
            const regionMain: any = item.region.main;
            if (!regionMap[regionMain]) {
                regionMap[regionMain] = [];
            }
            regionMap[regionMain].push(item.name);
        });

        const transformedItems = Object.keys(regionMap).map(region => ({
            region,
            items: regionMap[region]
        }));

        return transformedItems;
    }

    const readFields = async () => {
        setLoading(true)
        const read_areas = new ReadAreasUseCase()
        const response = await read_areas.execute()
        if (!response.success) {
            alert("지역 정보를 불러오는데 실패했습니다.")
            return
        }
        const areaData = response.data
        setAreas(areaData)

        const read_fields = new ReadScholarshipFieldsUseCase()
        const result = await read_fields.execute()
        if (!result.success) {
            alert("입력값을 불러오는데 실패했습니다.")
            setLoading(false)
            return
        }
        const mainAreas = areaData.map((area: any) => area.main)
        mainAreas.push("제한없음")
        const regionMain = {
            name: "regionMain",
            items: mainAreas,
            required: false,
            korean: "주소 조건(대분류)",
            default: "제한없음",
            class: "학생"
        }
        const regionSub = {
            name: "regionSub",
            items: [],
            required: false,
            korean: "주소 조건(소분류)",
            default: "",
            class: "학생"
        }
        const fieldData = result.data.filter((field: any) => field.name !== "id" && field.name !== "school" && field.name !== "region" && field.name !== "createdAt")
        const schoolField = result.data.find((field: any) => field.name === "school")
        const schoolList = transformItems(schoolField.items)
        schoolField.items = schoolList
        fieldData.push(schoolField, regionMain, regionSub)

        const finalFields = {} as any
        finalFields["성적"] = fieldData.filter((field: any) => field.class === "성적")
        finalFields["장학"] = fieldData.filter((field: any) => field.class === "장학")
        finalFields["학생"] = fieldData.filter((field: any) => field.class === "학생")
        finalFields["날짜"] = fieldData.filter((field: any) => field.class === "날짜")
        finalFields["비고"] = fieldData.filter((field: any) => field.class === "비고")

        setFields(finalFields)
        setLoading(false)
    }

    useEffect(() => {
        readFields()
    }, [])

    return (
        <Container sideBarDefault="scholarship/add">
            <div className="flex flex-col gap-12">
                <div className="text-l-t-emph text-gray-800">장학금 추가하기</div>
                <div className="flex flex-col gap-12 overflow-scroll" style={{ maxHeight: "70vh" }}>
                    <div className="flex flex-col gap-5">
                        <div className="text-brand-600 text-st-emph border-b pb-3 border-gray-200">장학금 관련 정보</div>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-6 items-start box-border" >
                            {
                                fields["장학"].map((field: any, index: number) => {
                                    if (field.items) return (
                                        <Input.SingleSelect
                                            key={index}
                                            title={field.korean}
                                            options={field.items}
                                            onChange={(input: string) => handleInput(field.name, input)}
                                            required={field.required}
                                            defaultValue={field.default}
                                        />
                                    )
                                    else return (
                                        <Input.InputField
                                            key={index}
                                            title={field.korean}
                                            type={field.type}
                                            onChange={(input: string) => handleInput(field.name, input)}
                                            required={field.required}
                                            defaultValue={field.default || ""}
                                            value={scholarship[field.name] || ""}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="text-brand-600 text-st-emph border-b pb-3 border-gray-200">학생 관련 정보</div>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-6 items-start" >
                            {
                                fields["학생"].map((field: any, index: number) => {
                                    if (field.name === "school") return (
                                        <Input.MultipleSelect
                                            key={index}
                                            title={field.korean}
                                            options={field.items}
                                            onChange={(input: string) => handleInput(field.name, input)}
                                            required={field.required}
                                            defaultValue={field.default}
                                        />
                                    )
                                    else if (field.name === "regionSub") {
                                        if (scholarship.regionMain === "제한없음") return <></>
                                        return (
                                            <Input.SingleSelect
                                                key={index}
                                                title={field.korean}
                                                options={["제한없음"].concat(areas.find((area: any) => area.main === scholarship.regionMain)?.sub) || []}
                                                onChange={(input: string) => handleInput(field.name, input)}
                                                required={field.required}
                                                defaultValue={field.default}
                                            />
                                        )
                                    }
                                    else if (field.items) {
                                        if (field.type === "multiple") return (
                                            <Input.AddToSelection
                                                key={index}
                                                title={field.korean}
                                                options={field.items}
                                                onChange={(input: string[]) => handleInput(field.name, input)}
                                                required={field.required}
                                                defaultValue={field.default}
                                            />
                                        )
                                        return (
                                            <Input.SingleSelect
                                                key={index}
                                                title={field.korean}
                                                options={field.items}
                                                onChange={(input: string) => handleInput(field.name, input)}
                                                required={field.required}
                                                defaultValue={field.default}
                                            />
                                        )
                                    }
                                    else return (
                                        <Input.InputField
                                            key={index}
                                            title={field.korean}
                                            type={field.type}
                                            onChange={(input: string) => handleInput(field.name, input)}
                                            required={field.required}
                                            defaultValue={field.default || ""}
                                            value={scholarship[field.name] || ""}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="text-brand-600 text-st-emph border-b pb-3 border-gray-200">날짜 관련 정보</div>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-6 items-start" >
                            {
                                fields["날짜"].map((field: any, index: number) => {
                                    return (
                                        <Input.InputField
                                            key={index}
                                            title={field.korean}
                                            type={field.type}
                                            onChange={(input: string) => handleInput(field.name, input)}
                                            required={field.required}
                                            defaultValue={field.default || ""}
                                            value={scholarship[field.name] || ""}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="text-brand-600 text-st-emph border-b pb-3 border-gray-200">성적 관련 정보</div>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-6 items-start" >
                            {
                                fields["성적"].map((field: any, index: number) => {
                                    return (
                                        <Input.InputField
                                            key={index}
                                            title={field.korean}
                                            type={field.type}
                                            onChange={(input: string) => handleInput(field.name, input)}
                                            required={field.required}
                                            defaultValue={field.default || ""}
                                            value={scholarship[field.name] || ""}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="text-brand-600 text-st-emph border-b pb-3 border-gray-200">비고</div>
                        {
                            fields["비고"].map((field: any, index: number) => {
                                return (
                                    <Input.TextArea
                                        key={index}
                                        title={field.korean}
                                        onChange={(input: string) => handleInput(field.name, input)}
                                        required={field.required}
                                        defaultValue={field.default || ""}
                                        value={scholarship[field.name] || ""}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <Button.Main text="장학금 추가하기" onClick={() => { filterUsers(); setModal(true) }} />
            </div>
            <Modal title="장학금에 해당하는 유저 목록" open={modal} onClose={() => setModal(false)}>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2 overflow-scroll" style={{ maxHeight: 560 }}>
                        {filteredUsers.length === 0
                            ? <div className="text-gray-400 text-st-r">해당하는 유저가 없습니다.</div>
                            : filteredUsers.map((user: User, index: number) => {
                                return (<Block.UserBlock key={index} userData={user} />)
                            })}
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <Button.SubGrow text="취소하기" onClick={() => setModal(false)} />
                            <Button.Grow text="장학금 추가하기" onClick={addScholarship} />
                        </div>
                        <Button.Fill text="계속해서 장학금 추가하기" onClick={() => addScholarship(true)} />
                    </div>
                </div>
            </Modal>
            {loading && <Loading />}
        </Container>
    );
}