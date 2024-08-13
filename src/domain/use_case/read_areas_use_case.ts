import url from "./url";
import UseCaseResult from "./use_case_result";

export default class ReadAreasUseCase {
    async execute(): Promise<UseCaseResult> {
        const res = await fetch(`${url}/api/v1/scholarship/read/areas`, {
            method: "GET",
        });
        const response = await res.json();
        return new UseCaseResult(response.success, response.message, response.data);
    }
}