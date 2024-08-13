import { Scholarship } from "@/domain/model/scholarship_model";
import { db } from "@/service/firebase";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

export async function GET(request: Request): Promise<Response> {
    try {
        const fields: any[] = []
        const colRef = collection(db, "scholarshipFields");
        const queryResult = query(colRef, orderBy("required", "desc"))
        const querySnapshot = await getDocs(queryResult)
        querySnapshot.forEach(
            (doc) => {
                fields.push(
                    {
                        ...doc.data(),
                        name: doc.id
                    }
                )
            }
        )

        return new Response(
            JSON.stringify({
                success: true,
                message: "Successfully fetched scholarshipFields.",
                data: fields,
            }),
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to fetch scholarshipFields.",
                data: (error as Error).message,
            }),
        );
    }
}
