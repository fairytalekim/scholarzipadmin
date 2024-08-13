import { db } from "@/service/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET(request: Request): Promise<Response> {
    try {
        const areas: any[] = []
        const colRef = collection(db, "area");
        const querySnapshot = await getDocs(colRef)
        querySnapshot.forEach(
            (doc) => {
                areas.push(
                    {
                        sub: doc.data().subAreas,
                        main: doc.id
                    }
                )
            }
        )

        return new Response(
            JSON.stringify({
                success: true,
                message: "Successfully fetched areas.",
                data: areas,
            }),
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to fetch areas.",
                data: (error as Error).message,
            }),
        );
    }
}
