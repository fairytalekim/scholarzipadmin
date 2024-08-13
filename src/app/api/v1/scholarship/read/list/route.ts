import { Scholarship } from "@/domain/model/scholarship_model"
import { db } from "@/service/firebase"
import { collection, getDocs } from "firebase/firestore"

export async function GET(request: Request): Promise<Response> {
    try {
        const scholarshipList: Scholarship[] = []
        const colSnap = collection(db, 'scholarship')
        const querySnapshot = await getDocs(colSnap)
        querySnapshot.forEach((doc) => {
            const scholarshipData = {
                ...doc.data(),
                id: doc.id
            } as Scholarship
            scholarshipList.push(scholarshipData)
        })

        return new Response(
            JSON.stringify({
                success: true,
                message: "장학금 목록을 불러오는데 성공했습니다.",
                data: scholarshipList
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "장학금 목록을 불러오는데 실패했습니다.",
                data: (error as Error).message
            }),
            { status: 500 }
        );
    }
}