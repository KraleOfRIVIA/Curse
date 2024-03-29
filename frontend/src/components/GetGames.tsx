import {FC, useEffect, useState} from 'react';
import GameCard from "./GameCard.tsx";
import {Box} from "@mui/material";
import {observer} from "mobx-react-lite";
import {IGame} from "../models/IGame.ts";
import GameService from "../service/GameService.ts";
const GetGames:FC = () => {
    const [game, setGame] = useState<IGame[]>([])
    const handleRemoveGame = (title: string | undefined) => {
        setGame(game.filter((game) => game.title !== title));
    };
    async function getGames() {
        try {
            const response = await GameService.getGames();
            setGame(response.data);
        } catch (e) {
            // @ts-ignore
            console.log(e)
        }
    }
    useEffect(() => {
        getGames();
    }, []);
    return (
            <Box sx={{
                my: 2,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
            }}>
                {game?.map(game =>
                    <Box key={game.title} sx={{ width: '20%' }}>
                        <GameCard image={game.image} title={game.title} genre={game.genre} year={game.year} add={true} onRemoveGame={ handleRemoveGame}/>
                    </Box>
                )}
            </Box>
        );
};

export default observer(GetGames);