import url from "./url";
import UseCaseResult from "./use_case_result";

export default class ReadScholarshipFieldsUseCase {
    async execute(): Promise<UseCaseResult> {
        try {
            const res = await fetch(`${url}/api/v1/scholarship/read/fields`, {
                method: "GET",
            })
            const data = await res.json()
            return new UseCaseResult(true, "입력값 불러오기에 성공했습니다.", data.data)
        } catch (error) {
            return new UseCaseResult(false, "입력값 불러오기에 실패했습니다.",error)
        }
    }
}