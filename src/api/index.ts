import userApi, { UserApi } from "./user";

interface IApi {
    userApi: UserApi
}

const api: IApi = {
    userApi,
}

export default api;