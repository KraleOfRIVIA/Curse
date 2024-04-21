import { FC, useEffect, useState } from 'react';
import GameCard from "../components/GameCard.tsx";
import { Grid } from "@mui/material"; // Импорт Grid из Material-UI
import { observer } from "mobx-react-lite";
import { IGame } from "../models/IGame.ts";
import GameService from "../service/GameService.ts";

const GetGames: FC = () => {
    const [game, setGame] = useState<IGame[]>([]);

    const handleRemoveGame = (title: string | undefined) => {
        setGame(game.filter((game) => game.title !== title));
    };

    async function getGames() {
        try {
            const response = await GameService.getGames();
            setGame(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getGames();
        console.log("useEffect");
    }, []);

    return (
        <Grid container spacing={2} justifyContent="center">
            {game?.map(game =>
                <Grid key={game.title} item xs={12} sm={6} md={4} lg={3}>
                    <GameCard image={game.image} title={game.title} genre={game.genre} year={game.year} add={true} onRemoveGame={handleRemoveGame} />
                </Grid>
            )}
        </Grid>
    );
};

export default observer(GetGames);
