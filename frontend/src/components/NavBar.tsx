import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Link, useNavigate} from 'react-router-dom';
import {Box, FormControl, Input, InputLabel, SvgIcon, Toolbar, Typography} from "@mui/material";
import {useContext} from "react";
import {Context} from "../Main.tsx";
import SearchIcon from '@mui/icons-material/Search';
import {observer} from "mobx-react-lite";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function CenteredTabs() {
    const {store} = useContext(Context)
    const [value, setValue] = React.useState<number>(0);
    const [search, setSearch] = React.useState<string>('');
    const navigate = useNavigate();
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
             navigate(`/games/${search}`)
        }
    };
    return (
        <Toolbar sx={{ width: '100%',backgroundColor: "secondary.main"}}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Games"  to="/Games" component={Link} />
                <Tab label="My games" to="/MyGames" component={Link}/>
            </Tabs>
            <FormControl sx={{width: '80%'}}>
                <InputLabel htmlFor="component-search"><SvgIcon fontVariant = "small" component={SearchIcon} /></InputLabel>
                <Input id="component-search" onChange={event => setSearch(event.target.value)} value={search} onKeyDown={handleKeyDown}/>
            </FormControl>
            <Box onClick={() => navigate("/settings")}  sx={{alignItems: "flex-end", float: "left"}}>
                <Typography variant="h3" sx={{textAlign: "left", color :'primary.main'}}><SvgIcon  fontVariant = "small" component={AccountCircleIcon}/>{store.user.email}</Typography>
            </Box>
        </Toolbar>
    );
}
export default observer(CenteredTabs);