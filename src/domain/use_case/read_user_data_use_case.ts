import UserModel, { User } from "../model/user_model";
import url from "./url";
import UseCaseResult from "./use_case_result";

export default class ReadUserDataUseCase {
    async readAll(): Promise<UseCaseResult> {
        try {
            const cachedData = sessionStorage.getItem('userListModel');
            if (cachedData) {
                const userListModel = JSON.parse(cachedData);
                return new UseCaseResult(true, "유저 데이터를 불러오는데 성공했습니다.", userListModel);
            }
    
            const res = await fetch(`${url}/api/v1/user/read/list`, {
                method: "GET",
            });
            const data = await res.json();
            if (!data.success) return new UseCaseResult(false, "유저 데이터를 불러오는데 실패했습니다.", data.data as Error);
    
            const userList = data.data;
            const userListModel = await Promise.all(userList.map(async (user: User) => {
                const newUser = new UserModel(user).toObject();
                return newUser;
            }));
    
            sessionStorage.setItem('userListModel', JSON.stringify(userListModel));
    
            return new UseCaseResult(true, "유저 데이터를 불러오는데 성공했습니다.", userListModel);
        } catch (error) {
            return new UseCaseResult(false, "유저 데이터를 불러오는데 실패했습니다.", error as Error);
        }
    }

    async readUsingID(userID: string): Promise<UseCaseResult> {
        try {
            const res = await fetch(`${url}/api/v1/user/read/${userID}`, {
                method: "GET",
            })
            const data = await res.json()
            if (!data.success) return new UseCaseResult(false, "유저 데이터를 불러오는데 실패했습니다.", data.data as Error)

            const user = data.data
            const userModel = new UserModel(user).toObject();

            return new UseCaseResult(true, "유저 데이터를 불러오는데 성공했습니다.", userModel)
        } catch (error) {
            return new UseCaseResult(false, "유저 데이터를 불러오는데 실패했습니다.", error as Error)
        }
    }

    async updateUserList(): Promise<UseCaseResult> {
        try {
            const res = await fetch(`${url}/api/v1/user/read/list`, {
                method: "GET",
            });
            const data = await res.json();
            if (!data.success) return new UseCaseResult(false, "유저 데이터를 불러오는데 실패했습니다.", data.data as Error);
    
            const userList = data.data;
            const userListModel = await Promise.all(userList.map(async (user: User) => {
                const newUser = new UserModel(user).toObject();
                return newUser;
            }));
    
            sessionStorage.setItem('userListModel', JSON.stringify(userListModel));
    
            return new UseCaseResult(true, "유저 데이터를 불러오는데 성공했습니다.", userListModel);
        } catch (error) {
            return new UseCaseResult(false, "유저 데이터를 불러오는데 실패했습니다.", error as Error);
        }
    }
}