import { db } from "@/service/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export async function GET(request: Request): Promise<Response> {
    try {
        const {
            logID
        } = await request.json() as {
            logID: string
        }

        const logColRef = collection(db, "kakaoLog")
        const logDocRef = doc(logColRef, logID)

        await updateDoc(logDocRef, {
            sent: true
        })

        return new Response(
            JSON.stringify({
                success: true,
                message: "발송 대기 상태를 발송 완료 상태로 변경하는데 성공했습니다.",
                data: {}
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "발송 대기 상태를 발송 완료 상태로 변경하는데 실패했습니다.",
                data: String(error)
            }),
            { status: 500 }
        );
    }
}