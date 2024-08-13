import UseCaseResult from "./use_case_result";
import url from "./url";

export default class LogInUseCase {
    async execute(
        email: string, password: string
    ): Promise<UseCaseResult> {
        try {
            const res = await fetch(`${url}/api/v1/auth/log-in`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            const data = await res.json();
            return new UseCaseResult(data.success, data.message, data.data);
        } catch (error) {
            return new UseCaseResult(false, "로그인에 실패했습니다.", error);
        }
    }
}