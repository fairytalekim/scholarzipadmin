import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieStore = cookies();
    const userID = cookieStore.get("userID")?.value;
    if (userID) return new Response(
        JSON.stringify({
            success: true,
            message: "유저 불러오기에 성공했습니다",
            data: userID
        }),
        { status: 200 }
    );
    else return new Response(
        JSON.stringify({
            success: false,
            message: "로그인이 필요합니다",
            data: {}
        }),
        { status: 200 }
    )
}