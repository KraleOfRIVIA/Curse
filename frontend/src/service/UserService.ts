import { AxiosResponse } from 'axios';
import $api from '../http';
import {IUser} from "../models/IUser.ts";
import {IGame} from "../models/IGame.ts";

export default class UserService {

    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }

    static async GetGamesFromUser(email: string): Promise<AxiosResponse<IGame[]>> {
        return $api.post<IGame[]>('/getUserGames', {email});
    }
    static async AddGameToUser(email: string | undefined,game: string | undefined): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('/addGameToUser', {email,game})
    }
    static async RemoveGameFromUser(email: string | undefined, game: string | undefined): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('/removeGameFromUser', {email,game})
    }
}