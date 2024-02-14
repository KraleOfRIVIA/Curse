import {IGame} from "./IGame.ts";

export interface IUser {
    id: string
    email: string
    games: IGame[]
    isAdmin: boolean
}