import {FC} from "react";
import {Box, Typography} from "@mui/material";

export const MainPage:FC = () => {
    return (
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <Typography variant="h1">Welcome to the Game library</Typography>

        </Box>
    );
};
