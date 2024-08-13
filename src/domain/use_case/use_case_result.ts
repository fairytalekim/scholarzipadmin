export default class UseCaseResult {
    success: boolean;
    message: string;
    data: any;

    constructor(success: boolean, message: string, data: any) {
        if (success === undefined || !message) {
            const missingParameters = [];

            if (success === undefined) missingParameters.push("result");
            if (!message) missingParameters.push("message");

            const errorMessage = `The following parameter(s) are missing: ${missingParameters.join(
                ", "
            )}`;
            throw new Error(errorMessage);
        }

        this.success = success;
        this.message = message;
        this.data = data;
    }
}