import {AxiosResponse} from "axios";
import $api from "../http";
import {IReview} from "../models/IReview.ts";

export default class ReviewService {

    static async getReviewsForGame(title_game: string | undefined): Promise<AxiosResponse<IReview[]>> {
        return $api.get<IReview[]>('/getReviews/' + title_game)
    }
    static async createReview(title_game: string | undefined, text_review: string, author: string, grade: number | null): Promise<AxiosResponse<IReview>> {
        return $api.post<IReview>('/createReview', {title_game, text_review, author, grade})
    }
    static async removeReview(author: string): Promise<AxiosResponse<IReview>> {
        return $api.post<IReview>('/deleteReview', {author})
    }
}