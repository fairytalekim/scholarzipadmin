import ScholarshipModel from "@/domain/model/scholarship_model";
import { db } from "@/service/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export async function POST(request: Request): Promise<Response> {
    try {
        const scholarship = await request.json() as any;
        const scholarshipRef = doc(collection(db, "scholarship"));        
        await setDoc(scholarshipRef, scholarship.scholarship);

        const scholarshipID = scholarshipRef.id;


        return new Response(
            JSON.stringify({
                success: true,
                message: "장학금을 DB에 저장하는데 성공했습니다",
                data: { scholarshipID }
            }),
            { status: 200}
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "장학금을 DB에 저장하는데 실패했습니다",
                data: (error as Error).message
            }),
            { status: 500 }
        );
    }
}