import { AxiosResponse } from 'axios';
import $api from '../http';
import {IUser} from "../models/IUser.ts";
import {IGame} from "../models/IGame.ts";

export default class UserService {

    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }

    static async GetGamesFromUser(): Promise<AxiosResponse<IGame[]>> {
        return $api.get<IGame[]>('/getUserGames')
    }
    static async AddGameToUser(game: string | undefined): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('/addGameToUser', {game})
    }
}