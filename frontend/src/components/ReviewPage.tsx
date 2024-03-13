import {FC, useContext, useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {IReview} from "../models/IReview.ts";
import {Context} from "../Main.tsx";
import {useParams} from "react-router-dom";
import ReviewService from "../service/ReviewService.tsx";
import Rating from "@mui/material/Rating";

const GamePage: FC = () => {
    const [review, setreview] = useState<IReview>({} as IReview);
    const {store} = useContext(Context);
    const {title_game} = useParams<{title_game: string}>()
    return (
        <Box>
            <Typography variant="h3">Create Review for {store.user.email}</Typography>
            <TextField label="Text" value={review.text_review} onChange={(e) => setreview({...review, text_review: e.target.value})}/>
            <Rating name="simple-controlled" value={review.grade} onChange={(_event, newValue) => {
                setreview({...review, grade: newValue})
            }}/>
            <Button onClick={() => ReviewService.createReview(title_game, review.text_review, store.user.email, review.grade)}>Create Review</Button>
        </Box>
    )
}

export default GamePage;