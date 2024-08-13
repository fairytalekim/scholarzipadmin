import { User } from "@/domain/model/user_model"
import { db } from "@/service/firebase"
import { collection, getDocs } from "firebase/firestore"

export async function GET(request: Request): Promise<Response> {
    try {
        const userList: User[] = []
        const colRef = collection(db, "user")
        const querySnapshot = await getDocs(colRef)
        querySnapshot.forEach((doc) => {
            const userData = {
                ...doc.data(),
                id: doc.id
            } as User
            userList.push(userData)
        })

        return new Response(
            JSON.stringify({
                success: true,
                message: "유저 목록을 불러오는데 성공했습니다.",
                data: userList
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "유저 목록을 불러오는데 실패했습니다.",
                data: (error as Error).message
            }),
            { status: 500 }
        );
    }
}