import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import UserService from "../service/UserService.ts";

interface GameCardProps {
    image: string | undefined;
    title: string | undefined;
    genre: string | undefined;
    year: string | undefined;
}

const GameCard: React.FC<GameCardProps> = ({ image, title, genre, year }) => {
    const handleAddGame = () => {
        UserService.AddGameToUser(title)
    };

    return (
        <Card sx={{ maxWidth: 250, boxShadow: (theme) => `${theme.palette.primary.main} 5px 0px 15px 0px` }}>
            <CardMedia
                component="img"
                alt={title}
                height="140"
                image={image}
                title={title}
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
                <Button color="secondary" variant="contained" size="small" onClick={handleAddGame}>
                    Add
                </Button>
                <Button component={Link} to={`/games/${title}`} color="secondary" variant="contained" size="small">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default GameCard;