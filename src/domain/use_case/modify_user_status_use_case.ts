import UseCaseResult from "./use_case_result";
import url from "./url";

export default class ModifyUserStatusUseCase {
    async execute(status: Status): Promise<UseCaseResult> {
        const updateStatus = status;
        const res = await fetch(`${url}/api/v1/user/modify`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                updateStatus
            })
        });
        const data = await res.json();
        const response = new UseCaseResult(data.success, data.message, data.data);
        return response;
    }
}