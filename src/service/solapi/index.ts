import { SolapiMessageService } from "solapi";

const solapi = new SolapiMessageService(
    process.env.NEXT_PUBLIC_SOLAPI_API_KEY || "",
    process.env.NEXT_PUBLIC_SOLAPI_SECRET_KEY || ""
);

export default solapi;