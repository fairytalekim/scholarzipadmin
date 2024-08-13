import { Scholarship } from "@/domain/model/scholarship_model"
import { User } from "@/domain/model/user_model"
import formatDate from "@/utils/format_date"
import Modal from "../modal"
import { useState } from "react"
import Button from "../button"

const translateStatus = {
    "trial": "무료 체험 / trial",
    "active": "활성 / active",
    "expired": "만료 / expired",
    "archived": "보관 / archived"
}

function UserBlock({
    userData,
    onClick
}: {
    userData: User,
    onClick?: () => void
}) {
    return (
        <div className="flex justify-between p-4 box-border gap-1 rounded-2xl border border-gray-200" onClick={onClick}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                    <div className="text-gray-800 text-b-sb">{userData.name}</div>
                    <div className="text-gray-400 text-st-r">({translateStatus[userData.status]})</div>
                </div>
                <div className="text-gray-800 text-st-r">{formatDate(userData.createdAt)} ~ {formatDate(userData.serviceEndAt)}</div>
            </div>
            <div className="flex flex-col gap-1 items-end">
                <div className="text-gray-800 text-st-r">{userData.phoneNum}</div>
                <div className={`
                    text-gray-800 text-st-r px-2 py-1 rounded-lg
                    ${userData.sex === "남성" ? "bg-supplementary-blue-light text-supplementary-blue-deep" : "bg-supplementary-red-light text-supplementary-red-deep"}
                `}>{userData.sex || "신청 폼 미입력"}</div>
            </div>
        </div>
    )
}

function ScholarshipBlock({
    scholarshipData,
    onClick
}: {
    scholarshipData: Scholarship,
    onClick: () => void
}) {
    const [modal, setModal] = useState({
        onOff: false,
        data: []
    })
    const schoolData = (typeof scholarshipData.school === "string" && scholarshipData.school.includes(","))
        ? scholarshipData.school.split(", ")
        : scholarshipData.school

    const closeModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setModal({
            onOff: false,
            data: []
        })
    }

    const openModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setModal({
            onOff: true,
            data: schoolData as []
        });
    };

    return (
        <div
            className="flex justify-between p-4 box-border rounded-2xl border border-gray-200"
            onClick={onClick}
        >
            <div className="flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                    <div className="text-gray-800 text-b-sb">{scholarshipData.name}</div>
                    <div className="text-gray-400 text-st-r">{scholarshipData.organization}</div>
                </div>
                <div className="text-gray-400 text-st-r">{formatDate(scholarshipData.startsAt)} ~ {formatDate(scholarshipData.endsAt)}</div>
            </div>
            <div className="flex flex-col gap-1 items-end">
                <div className="text-gray-400 text-st-r">작성일: {formatDate(scholarshipData.createdAt)}</div>
                <div className="flex gap-3 items-center">
                    {
                        schoolData instanceof Array
                            ? <div className="text-gray-800 text-st-r px-2 py-1 rounded-lg w-fit bg-gray-100" onClick={openModal}>목록 보기</div>
                            : <div className="text-gray-800 text-st-r">{scholarshipData.school}</div>
                    }
                    <div className={`
                        text-st-r px-2 py-1 rounded-lg w-fit
                        ${scholarshipData.inSchoolSupport === "교내" ? "bg-brand-50 text-brand-600" : "bg-brand-600 text-brand-50"}
                    `}>{scholarshipData.inSchoolSupport} 지원</div>
                </div>
            </div>
            <Modal
                open={modal.onOff}
                onClose={closeModal}
                title="학교 목록"
            >
                <div className="grid grid-cols-3 gap-5">
                    {
                        modal.data.map((school, idx) => (
                            <div key={idx} className="text-gray-800 text-b-m">• {school}</div>
                        ))
                    }
                </div>
            </Modal>
        </div>
    )
}

function MatchingBlock(props: {
    matchedData: User,
    onSend: () => void,
    scholarship: Scholarship
}) {
    const gpaScaleTotal = props.matchedData.schoolGPA === "4.5" ? "total45" : "total43"
    const gpaScaleLast = props.matchedData.schoolGPA === "4.5" ? "last45" : "last43"

    return (
        <div className="p-4 box-border rounded-2xl border border-gray-200 h-full">
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tr className="text-st-emph bg-brand-50">
                    <td style={{ border: "1px solid black", padding: "8px" }}>이름</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>성별</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>학교</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>전체 평점</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>지난학기 평점</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>학생 지역</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>부모 지역</td>
                </tr>
                <tr className="text-st-r" >
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.matchedData.name}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.matchedData.sex}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.matchedData.school}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.matchedData.totalGPA}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.matchedData.lastGPA}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.matchedData.myRegionMain + " " + props.matchedData.myRegionSub}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.matchedData.parentRegionMain + " " + props.matchedData.parentRegionSub}</td>
                </tr>
                <tr className="text-st-r" >
                    <td style={{ border: "1px solid black", padding: "8px" }}>장학금 정보</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.scholarship.sex}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.scholarship.school}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.scholarship[gpaScaleTotal]}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.scholarship[gpaScaleLast]}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.scholarship.regionMain + " " + props.scholarship.regionSub}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{props.scholarship.regionMain + " " + props.scholarship.regionSub}</td>
                </tr>
            </table>
        </div>
    )
}

const Block = {
    UserBlock,
    ScholarshipBlock,
    MatchingBlock
}

export default Block