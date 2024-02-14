import {FC, useEffect, useState} from 'react';
import GameCard from "./GameCard.tsx";
import {Box} from "@mui/material";
import {observer} from "mobx-react-lite";
import {IGame} from "../models/IGame.ts";
import UserService from "../service/UserService.ts";
const MyGamesPage:FC = () => {
    const [game, setGame] = useState<IGame[]>()


    async function getMyGames() {
        try {
            const response = await UserService.GetGamesFromUser()
            setGame(response.data)
        } catch (e) {
            // @ts-ignore
            console.log(e)
        }
    }

    useEffect(() => {
        getMyGames()
    }, [])
    return (
        <Box sx={{
            my: 2,
            display:'flex',
            flexDirection:{xs:'column',sm:'row'},
            justifyContent:'center',
            gap:2,
        }}>
            {game?.map(game =>
                <Box key={game.title}>
                    <GameCard image={game.image} title={game.title} genre={game.genre} year={game.year}/>
                </Box>
            )}
        </Box>
    );
};

export default observer(MyGamesPage);