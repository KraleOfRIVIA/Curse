import {IUser} from "../models/IUser.ts";
import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService.ts";
import axios from "axios";
import {API_URL} from "../http";
import {AuthResponse} from "../models/response/AuthResponse.ts";


export default class store {
    user= {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }
    setUser(user: IUser) {
        this.user = user
    }


    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }
    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }
    async logout() {
        try {
            const response = await AuthService.logout()
            console.log(response)
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }
    setIsLoading(bool: boolean) {
        this.isLoading = bool
    }
    async checkAuth() {
        this.setIsLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        }
        catch (e) {
            // @ts-ignore
            // console.log(e.response?.data?.message)
        } finally {
            this.setIsLoading(false)
        }
    }
}