import {FC, useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import GameService from "../service/GameService.ts";
import {IGame} from "../models/IGame.ts";



const GamePage: FC = () => {
    const [game, setGame] = useState<IGame>()

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
            <img src={game?.image}/>
            <Typography variant="h1">{game?.title}</Typography>
            <Typography >{game?.genre}</Typography>
            <Typography>{game?.year}</Typography>
            <Typography>{game?.description}</Typography>
        </Box>
    )
}

export default GamePage;