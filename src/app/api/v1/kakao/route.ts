import solapi from "@/service/solapi";

export async function POST(request: Request): Promise<Response> {
    try {
        const {
            phoneNum,
            templateID,
            variables,
            pfId
        } = await request.json() as {
            phoneNum: string;
            templateID: string;
            variables: any;
            pfId: string;
        }

        const response = await solapi.send({
            "to": phoneNum,
            "from": process.env.NEXT_PUBLIC_SENDER_NUMBER,
            "kakaoOptions": {
                "pfId": pfId,
                "templateId": templateID,
                "variables": variables,
            },
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "알림톡을 발송하는데 성공했습니다.",
                data: response
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "알림톡을 발송하는데 실패했습니다.",
                data: (error as Error).message
            }),
            { status: 500 }
        );
    }
}