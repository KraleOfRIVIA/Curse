import  { FC, useEffect, useState, useContext } from 'react';
import { Box, Button, Typography, Divider } from '@mui/material'; // Добавлен Divider
import { useNavigate, useParams } from 'react-router-dom';
import GameService from '../service/GameService.ts';
import ReviewService from '../service/ReviewService.ts';
import { IGame } from '../models/IGame.ts';
import { IReview } from '../models/IReview.ts';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Context } from '../Main.tsx';
import Rating from "@mui/material/Rating";

const GamePage: FC = () => {
    const [game, setGame] = useState<IGame>();
    const [reviews, setReviews] = useState<IReview[]>([]);
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const { title } = useParams<{ title: string }>();

    async function getGame(title: string | undefined) {
        try {
            const response = await GameService.getGameByTitle(title);
            setGame(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchReviews(title: string | undefined) {
        try {
            const response = await ReviewService.getReviewsForGame(title);
            setReviews(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getGame(title);
        fetchReviews(title);
    }, [title]);

    const handleDeleteReview = async (reviewId: string) => {
        try {
            await ReviewService.removeReview(reviewId);
            fetchReviews(title);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{  flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Box sx={{ margin: 'auto', maxWidth: '600px' }}>
                <img src={game?.image} alt={game?.title} />
                <Typography variant="h1">{game?.title}</Typography>
                <Typography>{game?.genre}</Typography>
                <Typography>{game?.year}</Typography>
                <Typography>{game?.description}</Typography>
            </Box>
            <Box>
                <Typography variant="h3">You want to write a review ?</Typography>
                <Button onClick={() => navigate(`/CreateReview/${title}`)}>
                    <RateReviewIcon />
                </Button>
            </Box>
            <Box>
                <Typography variant="h3">Reviews:</Typography>
                <Divider /> {/* Добавлена линия разделения */}
                {reviews.map((review, index) => (
                    <Box
                        key={review.id}
                        sx={{
                            marginLeft: '600px',
                            marginRight: '600px',
                            marginBottom: '20px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '8px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 'bold',
                                marginBottom: '8px',
                            }}
                        >
                            Author: {review.author}
                        </Typography>
                        <Rating
                            name="rating"
                            value={review.grade}
                            readOnly
                            precision={0.5}
                        />
                        <Typography variant="body2">
                            {review.text_review}
                        </Typography>
                        {index !== reviews.length - 1 && <Divider />} {/* Добавлен отступ между отзывами */}
                        {store.user.email === review.author && (
                            <Button variant="outlined" onClick={() => handleDeleteReview(review.author)}>Delete Review</Button>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default GamePage;
