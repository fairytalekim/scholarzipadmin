import { db } from "@/service/firebase"
import { collection, getDocs } from "firebase/firestore"

export async function GET(): Promise<Response> {
    try {
        const pendingList: any[] = []
        const colRef = collection(db, "kakaoLog")
        const querySnapshot = await getDocs(colRef)
        querySnapshot.forEach((doc) => {
            const data = {
                ...doc.data(),
                id: doc.id
            }
            pendingList.push(data)
        })

        return new Response(
            JSON.stringify({
                success: true,
                message: "발송 대기 목록을 불러오는데 성공했습니다.",
                data: pendingList
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "발송 대기 목록을 불러오는데 실패했습니다.",
                data: (error as Error).message
            }),
            { status: 500 }
        );
    }
}