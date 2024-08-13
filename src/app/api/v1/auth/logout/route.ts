import { auth } from "@/service/firebase";
import { signOut } from "firebase/auth";
import { cookies } from 'next/headers'


export async function POST(request: Request) {
    try {
        await signOut(auth);
        const cookieStore = cookies();
        cookieStore.delete('userID')
        const userID = cookieStore.get("userID")?.value;

        return new Response(
            JSON.stringify({
                success: true,
                message: "로그아웃에 성공했습니다",
                data: userID
            })
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "로그아웃에 실패했습니다",
                data: error
            })
        );
    }
}
