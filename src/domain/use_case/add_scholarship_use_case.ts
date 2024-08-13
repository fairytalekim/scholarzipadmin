import ScholarshipModel, { Scholarship } from "../model/scholarship_model";
import { User } from "../model/user_model";
import url from "./url";
import UseCaseResult from "./use_case_result";

export default class AddScholarshipUseCase {
    async addScholarship(scholarshipData: Scholarship, users: User[]): Promise<UseCaseResult> {
        const now = new Date();
        scholarshipData.createdAt = now;

        const scholarship = new ScholarshipModel(
            scholarshipData
        ).toObject();

        const res = await fetch(`${url}/api/v1/scholarship/add`, {
            method: "POST",
            body: JSON.stringify({
                scholarship,
            }),
        });
        const response = await res.json();
        if (!response.success) return new UseCaseResult(false, "장학금 추가에 실패했습니다.", {});

        const kakaoResponseArr: { phoneNum: string, success: boolean }[] = []
        await Promise.all(users.map(async (user: User) => {
            const calText = scholarshipData.organization;
            let formattedStartDate: string;
            let formattedEndDate: string;

            if (scholarshipData.startsAt === '정보없음') {
                const now = new Date();
                formattedStartDate = now.toISOString().slice(0, 10).replace(/-/g, '');
            } else {
                const startDate = new Date(scholarshipData.startsAt);
                formattedStartDate = startDate.toISOString().slice(0, 10).replace(/-/g, '');
            }
            const endDate = new Date(scholarshipData.endsAt);
            endDate.setDate(endDate.getDate() + 1);
            formattedEndDate = endDate.toISOString().slice(0, 10).replace(/-/g, '');
            const calDate = `${formattedStartDate}/${formattedEndDate}`;
            const calendarScheme = `calendar/render?action=TEMPLATE&text=${scholarship.organization}&dates=${calDate}&details=${scholarship.details}`;
            console.log(calendarScheme);
            const kakaoRes = await fetch(`${url}/api/v1/kakao`, {
                method: "POST",
                body: JSON.stringify({
                    phoneNum: "01071228287",
                    templateID: "KA01TP240226012121195gmnkIfSsLyJ",
                    variables: {
                        "#{이름}": user.name,
                        "#{장학명}": scholarship.name,
                        "#{모집종료일}": scholarship.endsAt,
                        "#{지원내용}": scholarship.details,
                        "#{비고}": scholarship.extra,
                        "#{url}": scholarship.link,
                        "#{calendar}": calendarScheme,
                    },
                    pfId: "KA01PF2402260119250799DSMi9aGvcw"
                }),
            });
            const kakaoData = await kakaoRes.json();
            kakaoResponseArr.push({
                phoneNum: user.phoneNum,
                success: kakaoData.success
            });
        }))

        const failedUsers = kakaoResponseArr.filter(kakaoResponse => !kakaoResponse.success).map(kakaoResponse => kakaoResponse.phoneNum).join(", ")
        if (kakaoResponseArr.some(kakaoResponse => !kakaoResponse.success)) return new UseCaseResult(false, "장학금 추가에 성공했지만 알림톡 발송에 실패했습니다.", `실패한 유저: ${failedUsers}`);

        return new UseCaseResult(true, "장학금 추가 및 해당 유저에게 알림톡 발송에 성공했습니다.", {});
    }

    async getMatchedUsers(scholarship: Scholarship): Promise<UseCaseResult> {
        try {
            const res = await fetch(`${url}/api/v1/user/read/list`, {
                method: "GET",
            });
            const response = await res.json();
            if (!response.success) return new UseCaseResult(response.success, response.message, response.data);
            const users = response.data;

            const filter1 = users.filter((user: User) => {
                return (scholarship.type === "등록금" && !user.currentAllScholarship) ||
                    (scholarship.type === "중복 가능 생활비") ||
                    (scholarship.type === "중복 불가능 생활비" && !user.livingScholarship) ||
                    (scholarship.type === "이자지원" && !user.studentLoan);
            });

            const filter2 = filter1.filter((user: User) => {
                return (scholarship.semester[0] === "제한없음") ||
                    (scholarship.semester.includes(String(user.semester)));
            });

            const filter3 = filter2.filter((user: User) => {
                return (scholarship.school === "제한없음") ||
                    (scholarship.school.includes(user.school))
            });

            const filter4 = filter3.filter((user: User) => {
                return (scholarship.division[0] === "제한없음") ||
                    (scholarship.division.includes(user.division))
            });

            const filter5 = filter4.filter((user: User) => {
                const schoolGPAnum = Number(user.schoolGPA);
                const scholarshipTotal45num = Number(scholarship.total45);
                const scholarshipLast45num = Number(scholarship.last45);
                const scholarshipTotal43num = Number(scholarship.total43);
                const scholarshipLast43num = Number(scholarship.last43);

                return (schoolGPAnum === 4.5
                    ? (scholarshipTotal45num <= user.totalGPA) && (scholarshipLast45num <= user.lastGPA)
                    : (scholarshipTotal43num <= user.totalGPA) && (scholarshipLast43num <= user.lastGPA)
                );
            });

            const filter6 = filter5.filter((user: User) => {
                return scholarship.incomeBracket >= user.incomeBracket
            });

            const filter7 = filter6.filter((user: User) => {
                return (scholarship.additions[0] === "제한없음") ||
                    user.additions.some(addition => scholarship.additions.includes(addition)) ||
                    user.additions === scholarship.additions;
            });

            const filter8 = filter7.filter((user: User) => {
                return (scholarship.religion === "제한없음") ||
                    (scholarship.religion === user.religion);
            });

            const filter9 = filter8.filter((user: User) => {
                return (scholarship.career[0] === "제한없음") ||
                    (user.career.includes(scholarship.career) ||
                        scholarship.career === user.career);
            });

            const filter10 = filter9.filter((user: User) => {
                return (scholarship.sex === "제한없음") ||
                    (scholarship.sex === user.sex);
            });

            const filter11 = filter10.filter((user: User) => {
                return (scholarship.regionMain === "제한없음") ||
                    (scholarship.regionMain === user.myRegionMain && scholarship.regionSub === user.myRegionSub) ||
                    (scholarship.regionMain === user.myRegionMain && scholarship.regionSub === "제한없음") ||
                    (scholarship.regionMain === user.parentRegionMain && scholarship.regionSub === user.parentRegionSub) ||
                    (scholarship.regionMain === user.parentRegionMain && scholarship.regionSub === "제한없음")
            });

            const filter12 = filter11.filter((user: User) => {
                return (scholarship.major === "제한없음") ||
                    (scholarship.major.includes(user.major) ||
                        scholarship.major === user.major)
            })


            return new UseCaseResult(true, "유저 필터에 성공했습니다.", filter12 as User[]);
        } catch (error) {
            return new UseCaseResult(false, "유저 필터에 실패했습니다.", error as Error);
        }
    }
}