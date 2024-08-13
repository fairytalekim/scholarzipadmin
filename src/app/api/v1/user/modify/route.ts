import { db } from "@/service/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const updateStatus = await request.json() as Status

        const userRef = doc(collection(db, "user"));
        await updateDoc(userRef, {
            status: updateStatus
        });

        const userID = userRef.id;

        return new Response(
            JSON.stringify({
                success: false,
                message: "유저 상태를 수정하는데 성공했습니다.",
                data: { userID }
            }),
            { status: 200}
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "유저 상태를 수정하는데 실패했습니다.",
                data: (error as Error).message
            }),
            { status: 500 }
        );
    }
}