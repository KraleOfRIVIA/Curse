import { FC, useContext, useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { IReview } from "../models/IReview.ts";
import { Context } from "../Main.tsx";
import { useParams } from "react-router-dom";
import ReviewService from "../service/ReviewService.ts";
import Rating from "@mui/material/Rating";

const GamePage: FC = () => {
    const [review, setReview] = useState<IReview>({id: "", author: "", title_game: "", text_review: "", grade: 0 });
    const { store } = useContext(Context);
    const { title_game } = useParams<{ title_game: string }>();

    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview({ ...review, text_review: e.target.value });
    };

    const handleRatingChange = (_event: React.ChangeEvent<{}>, newValue: number | null) => {
        if (newValue !== null) {
            setReview({ ...review, grade: newValue });
        }
    };

    const handleCreateReview = () => {
        ReviewService.createReview(title_game, review.text_review, store.user.email, review.grade);
    };

    return (
        <Box>
            <Typography variant="h3">Create Review for "{title_game}"</Typography>
            <TextField
                multiline
                rows={4}
                variant="outlined"
                label="Your Review"
                value={review.text_review}
                onChange={handleReviewChange}
                fullWidth
                sx={{ marginBottom: '16px' }}
            />
            <Rating
                name="simple-controlled"
                value={review.grade}
                onChange={handleRatingChange}
                sx={{ marginBottom: '16px' }}
            />
            <Button onClick={handleCreateReview} variant="contained" color="primary">
                Publish Review
            </Button>
        </Box>
    );
}

export default GamePage;
