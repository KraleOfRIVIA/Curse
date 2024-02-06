// @ts-ignore
import React, {FC, useContext, useState} from 'react';
import {Context} from "../Main.tsx";
import {observer} from "mobx-react-lite";
import {Box, Button, FormControl, FormLabel, SvgIcon, TextField} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';

const LoginForm:FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)
    return (
        <Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
            <SvgIcon component={LoginIcon}/>
            </Box>
                <Box sx={{mx:'auto',display:'flex', justifyContent:'center',maxWidth: 250, borderRadius:"16px",}}>
                    <FormControl sx={{alignItems:'center'}}>

                        <FormLabel>Welcome</FormLabel>


                        <Box sx={{border: (theme) => `2px solid ${theme.palette.primary.main}`, borderRadius:"16px", padding: '10px'}}>

                            <TextField label = "email" sx={{padding: '10px'}} required onChange={event => setEmail(event.target.value)} value={email} type="email" />

                            <TextField label = "password" sx={{padding: '10px'}} required onChange={event => setPassword(event.target.value)} value={password} type="password"/>

                            <Button size='small' variant="contained" onClick={() => store.login(email, password)}>Login</Button>

                            <Button  size='small' variant="contained" onClick={() => store.registration(email, password)}>Registration</Button>
                        </Box>
                    </FormControl>
                </Box>
        </Box>
    );
};

export default observer(LoginForm);