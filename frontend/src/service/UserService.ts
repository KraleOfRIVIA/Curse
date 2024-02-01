import { AxiosResponse } from 'axios';
import $api from '../http';
import {IUser} from "../models/IUser.ts";

export default class UserService {

    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}