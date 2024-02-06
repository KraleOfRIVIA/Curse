import { AxiosResponse } from 'axios';
import $api from '../http';
import {IGame} from "../models/IGame.ts";

export default class GameService {
    static async getGameByTitle(title: string): Promise<AxiosResponse<IGame>> {
        return $api.get<IGame>('/games/' + title)
    }
    static async getGames(): Promise<AxiosResponse<IGame[]>> {
        return $api.get<IGame[]>('/games/')
    }
}