import {FC} from 'react';
import {Box, Typography} from "@mui/material";



interface IGamePageProps {
    image: string | undefined;
    title: string | undefined;
    description: string | undefined;
    genre: string | undefined;
    year: string | undefined;
}
const GamePage: FC<IGamePageProps> = ({ image, title, description, genre, year }) => {
    return (
        <Box>
            <img src={image} alt={title} />
            <Typography variant="h1">{title}</Typography>
            <Typography variant="h3">{description}</Typography>
            <Typography variant="h3">{genre}</Typography>
            <Typography variant="h3">{year}</Typography>
        </Box>
    )
}

export default GamePage;