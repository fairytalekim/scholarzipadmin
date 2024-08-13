import UseCaseResult from "./use_case_result";
import url from "./url";

export default class CheckUserAuthUseCase {
    async execute(): Promise<UseCaseResult> {
        try {
            const res = await fetch(`${url}/api/v1/auth/check`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            return new UseCaseResult(data.success, data.message, data.data)
        } catch (error) {
            return new UseCaseResult(false, "로그인 상태 확인에 실패했습니다.", error)
        }
    }
}