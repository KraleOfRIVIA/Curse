import {AxiosResponse} from "axios";
import $api from "../http";
import {IReview} from "../models/IReview.ts";

export default class ReviewService {

    //будущее дописать
    // static async getReviewsForGame(title_game: string): Promise<AxiosResponse<IReview[]>> {
    //
    // }
    static async createReview(title_game: string | undefined, text_review: string, author: string, grade: number | null): Promise<AxiosResponse<IReview>> {
        return $api.post<IReview>('/createReview', {title_game, text_review, author, grade})
    }
}