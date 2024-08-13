import UseCaseResult from "./use_case_result";
import kakaoTemplate from "./solapi_template";
import url from "./url";

export default class SendKakaoToMatchedUsersUseCase {
    async execute(matchedList: any[]): Promise<UseCaseResult> {
        try {
            for (const match of matchedList) {
                const res = await fetch(`${url}/api/v1/kakao`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        phoneNum: "",
                        templateID: kakaoTemplate.matchedScholarship,
                        variables: {
                            "#{이름}": "",
                            "#{장학명}": "",
                            "#{모집종료일}": "",
                            "#{지원내용}": "",
                            "#{비고}": "",
                            "#{url}": "",
                            "#{calendar}": ""
                        },
                        pfId: "KA01PF2402260119250799DSMi9aGvcw"
                    })
                });
                const data = await res.json();
                if (!data.success) return new UseCaseResult(false, data.message, {});
            }

            return new UseCaseResult(true, "매칭된 유저들에게 카카오톡을 발송하는데 성공했습니다.", {});
        } catch (error) {
            return new UseCaseResult(false, "매칭된 유저들에게 카카오톡을 발송하는데 실패했습니다.", String(error));
        }
    }
}