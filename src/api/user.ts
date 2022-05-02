import { iUser } from "../model/user";
import apiBase from "./base";

export interface UserApi {
  getUserData: (
    page: number,
    size: number,
    key: string,
    gender: string,
    sortby?: string,
    sortOrder?: string
  ) => Promise<iUser>;
}

const userApi: UserApi = {
  getUserData: (
    page: number,
    size: number,
    key: string,
    gender: string,
    sortby?: string,
    sortOrder?: string
  ) =>
    apiBase.get(
      `/?page=${page}&pageSize=${size}&results=5&sortBy=${sortby}&sortOrder=${sortOrder}&keyword=${key}&gender=${gender}`
    ),
};

export default userApi;
