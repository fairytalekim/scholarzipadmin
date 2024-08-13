import { Scholarship } from "@/domain/model/scholarship_model";
import { db } from "@/service/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request: Request,
    { params }: {
        params: {
            scholarshipID: string;
        };
    }): Promise<Response> {
    try {
        const { scholarshipID } = params;

        if (!scholarshipID) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "scholarshipID is required.",
                }),
                { status: 400 }
            );
        }

        const docRef = doc(db, "scholarship", scholarshipID);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Scholarship not found.",
                }),
                { status: 404 }
            );
        }

        const scholarship = {
            ...docSnap.data(),
            id: docSnap.id,
        } as Scholarship;

        return new Response(
            JSON.stringify({
                success: true,
                message: "Successfully fetched scholarship data.",
                data: scholarship,
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to fetch scholarship data.",
                data: (error as Error).message,
            }),
            { status: 500 }
        );
    }
}
