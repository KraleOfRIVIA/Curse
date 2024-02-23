import {FC, useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import {IGame} from "../models/IGame.ts";
import GameService from "../service/GameService.ts";

export const CreateGamePage:FC = () => {
    const [game, setGame] = useState<IGame>({} as IGame);
    return (
        <Box>
            <Typography variant="h3">Create Game Page</Typography>
            <TextField label="Image" value={game.image} onChange={(e) => setGame({...game, image: e.target.value})}/>
            <TextField label="Title" value={game.title} onChange={(e) => setGame({...game, title: e.target.value})} />
            <TextField label="Description" value={game.description} onChange={(e) => setGame({...game, description: e.target.value})}/>
            <TextField label="Genre" value={game.genre} onChange={(e) => setGame({...game, genre: e.target.value})}/>
            <TextField label="Year" value={game.year} onChange={(e) => setGame({...game, year: e.target.value})}/>
            <Button onClick={() => GameService.createGame(game)}>Create Game</Button>
        </Box>
    );
};
