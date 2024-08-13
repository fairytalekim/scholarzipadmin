import ScholarshipModel, { Scholarship } from "../model/scholarship_model";
import url from "./url";
import UseCaseResult from "./use_case_result";

export default class ReadScholarshipDataUseCase {
    async readAll(): Promise<UseCaseResult> {
        try {
            const cachedData = sessionStorage.getItem('scholarshipListModel');
            if (cachedData) {
                const scholarshipListModel = JSON.parse(cachedData);
                return new UseCaseResult(true, "유저 데이터를 불러오는데 성공했습니다.", scholarshipListModel);
            }

            const res = await fetch(`${url}/api/v1/scholarship/read/list`, {
                method: "GET",
            })
            const data = await res.json()
            if (!data.success) return new UseCaseResult(false, "장학금 데이터를 불러오는데 실패했습니다.", data.data as Error)

            const scholarshipList = data.data
            const scholarshipListModel = await Promise.all(scholarshipList.map(async (scholarship: Scholarship) => {
                const newScholarship = new ScholarshipModel(scholarship).toObject();
                return newScholarship;
            }));
            sessionStorage.setItem('scholarshipListModel', JSON.stringify(scholarshipListModel));

            return new UseCaseResult(true, "장학금 데이터를 불러오는데 성공했습니다.", scholarshipListModel)
        } catch (error) {
            return new UseCaseResult(false, "장학금 데이터를 불러오는데 실패했습니다.", error as Error)
        }
    }

    async readUsingID(scholarshipID: string): Promise<UseCaseResult> {
        try {
            const res = await fetch(`${url}/api/v1/scholarship/read/${scholarshipID}`, {
                method: "GET",
            })
            const data = await res.json()
            if (!data.success) return new UseCaseResult(false, "장학금 데이터를 불러오는데 실패했습니다.", data.data as Error)

            const scholarship = data.data
            const scholarshipModel = new ScholarshipModel(scholarship).toObject();
            return new UseCaseResult(true, "장학금 데이터를 불러오는데 성공했습니다.", scholarshipModel)
        } catch (error) {
            return new UseCaseResult(false, "장학금 데이터를 불러오는데 실패했습니다.", error as Error)
        }
    }

    async updateScholarshipList(): Promise<UseCaseResult> {
        try {
            const res = await fetch(`${url}/api/v1/scholarship/read/list`, {
                method: "GET",
            });
            const data = await res.json();
            if (!data.success) return new UseCaseResult(false, "장학금 데이터를 불러오는데 실패했습니다.", data.data as Error);
    
            const scholarshipList = data.data;
            const Scholarships = await Promise.all(scholarshipList.map(async (scholarship: Scholarship) => {
                const newUser = new ScholarshipModel(scholarship).toObject();
                return newUser;
            }));
    
            sessionStorage.setItem('scholarshipListModel', JSON.stringify(Scholarships));
    
            return new UseCaseResult(true, "유저 데이터를 불러오는데 성공했습니다.", Scholarships);
        } catch (error) {
            return new UseCaseResult(false, "유저 데이터를 불러오는데 실패했습니다.", error as Error);
        }
    }
}