import {FC, useContext, useEffect, useState} from 'react';
import GameCard from "./GameCard.tsx";
import {Box} from "@mui/material";
import {observer} from "mobx-react-lite";
import {IGame} from "../models/IGame.ts";
import UserService from "../service/UserService.ts";
import {Context} from "../Main.tsx";
const MyGamesPage:FC = () => {
    const [game, setGame] = useState<IGame[]>([])
    const {store} = useContext(Context)

    const handleRemoveGame = (title: string | undefined) => {
        setGame(game.filter((game) => game.title !== title)); // Update UI immediately
    };
    async function getMyGames() {
        try {
            const response = await UserService.GetGamesFromUser(store.user.email)
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
                    <GameCard image={game.image}
                              title={game.title}
                              genre={game.genre}
                              year={game.year}
                              add={false}
                              onRemoveGame={handleRemoveGame}/>
                </Box>
            )}
        </Box>
    );
};

export default observer(MyGamesPage);