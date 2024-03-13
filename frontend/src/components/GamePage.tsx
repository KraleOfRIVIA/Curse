import {FC, useEffect, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import GameService from "../service/GameService.ts";
import {IGame} from "../models/IGame.ts";
import RateReviewIcon from '@mui/icons-material/RateReview';


const GamePage: FC = () => {
    const [game, setGame] = useState<IGame>()
    const navigate = useNavigate();
    const {title} = useParams<{title: string}>()
    async function getGame(title: string | undefined) {
        try {
            const response = await GameService.getGameByTitle(title);
            setGame(response.data);
        } catch (e) {
            // @ts-ignore
            console.log(e)
        }

    }
    useEffect(() => {
        getGame(title);
    }, []);
    return (
        <Box>
            <Box>
                <img src={game?.image}/>
                <Typography variant="h1">{game?.title}</Typography>
                <Typography >{game?.genre}</Typography>
                <Typography>{game?.year}</Typography>
                <Typography>{game?.description}</Typography>
            </Box>
            <Box>
                <Typography variant="h3">You want to write a review ?</Typography>
                <Button onClick={ () => navigate(`/CreateReview/${title}`)}><RateReviewIcon/></Button>

            </Box>
        </Box>
    )
}

export default GamePage;