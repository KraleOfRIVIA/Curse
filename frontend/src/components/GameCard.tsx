import React, {useContext, useState} from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import UserService from "../service/UserService.ts";
import {Context} from "../Main.tsx";
import {observer} from "mobx-react-lite";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
interface GameCardProps {
    image: string | undefined;
    title: string | undefined;
    genre: string | undefined;
    year: string | undefined;
    add: boolean;
    onRemoveGame: (title: string | undefined) => void; // Callback function for handling game removal
}

const GameCard: React.FC<GameCardProps> = ({ image, title, genre, year, add, onRemoveGame }) => {
    const [isRemoving, setIsRemoving] = useState(false); // Track removal state
    const {store} = useContext(Context)
    const navigate = useNavigate();

    const handleAddGame = async () => {
        try {
            await UserService.AddGameToUser(store.user.email,title);
            // Success handling (if needed, e.g., update UI to reflect addition)
        } catch (error) {
            console.error("Error adding game:", error);
            // Error handling (e.g., display an error message to the user)

        }
    };

    const handleRemoveGame = async () => {
        setIsRemoving(true); // Set loading state to indicate in-progress removal
        try {
            await UserService.RemoveGameFromUser(store.user.email,title);
            onRemoveGame(title); // Trigger parent component to remove the card
        } catch (error) {
            console.error("Error removing game:", error);
            // Error handling (e.g., display an error message to the user)
        } finally {
            setIsRemoving(false); // Reset loading state after removal attempt
        }
    };

    return (
        <Card sx={{ height:300 , width: 300, boxShadow: (theme) => `${theme.palette.primary.main} 5px 0px 15px 0px` }}>
            <CardMedia
                component="img"
                alt={title}

                image={image}
                title={title}
                onClick={ () => navigate(`/games/${title}`)}
            />
            <CardContent>
                <Typography variant="h3">
                    {title}
                </Typography>
                <Typography>
                    Genre: {genre}
                </Typography>
                <Typography>
                    Year: {year}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    color= { add ? "secondary": "primary"}
                    size="small"
                    onClick={add ? handleAddGame : handleRemoveGame}
                    disabled={isRemoving} // Disable button during removal
                >
                    {isRemoving ? 'Removing...' : (add ? <AddIcon/> : <DeleteIcon />)}
                </Button>
            </CardActions>
        </Card>
    );
};

export default observer(GameCard);
