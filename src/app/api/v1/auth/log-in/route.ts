import { auth } from "@/service/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json() as {
            email: string,
            password: string,
        };
        const data = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const cookieStore = cookies();
        cookieStore.set('userID', data.user.uid)


        return new Response(
            JSON.stringify({
                success: true,
                message: "로그인에 성공했습니다",
                data: data
            }),
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "로그인에 실패했습니다",
                data: (error as Error)
            }),
        );
    }
}
