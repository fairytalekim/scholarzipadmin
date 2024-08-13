import { User } from "@/domain/model/user_model";
import { db } from "@/service/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request: Request,
    { params }: {
        params: {
            userID: string;
        };
    }): Promise<Response> {
    try {
        const { userID } = params;

        if (!userID) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "User ID is required.",
                }),
                { status: 400 }
            );
        }

        const docRef = doc(db, "user", userID);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "User not found.",
                }),
                { status: 404 }
            );
        }

        const user = {
            ...docSnap.data(),
            id: docSnap.id,
        } as User;

        return new Response(
            JSON.stringify({
                success: true,
                message: "Successfully fetched user data.",
                data: user,
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to fetch user data.",
                data: (error as Error).message,
            }),
            { status: 500 }
        );
    }
}
