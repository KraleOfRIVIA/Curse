import LoginForm from "./components/LoginForm.tsx";
import {useContext, useEffect} from "react";
import {Context} from "./Main.tsx";
import {observer} from "mobx-react-lite";

import NavBar from "./components/NavBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Box, FormControl, FormLabel, SvgIcon} from "@mui/material";
import GetGames from "./components/GetGames.tsx";
import SettingsPage from "./components/SettingsPage.tsx";
import GamePage from "./components/GamePage.tsx";
import LoginIcon from "@mui/icons-material/Login";
import MyGamesPage from "./components/MyGamesPage.tsx";



function App() {
    const {store} = useContext(Context)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <h1>Loading...</h1>
    }
    if(!store.isAuth) {
        return <LoginForm />
    }
  return (
    <>
        <Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
            <SvgIcon component={LoginIcon}/>
            </Box>
                <Box sx={{mx:'auto',display:'flex', justifyContent:'center',maxWidth: 250, borderRadius:"16px",}}>
                    <FormControl sx={{alignItems:'center'}}>

                        <FormLabel>Welcome</FormLabel>

                    </FormControl>
                </Box>
        </Box>
        <BrowserRouter>
            <NavBar />
            <Box sx={{ width: '100%' }}>
                <Routes>
                    <Route element={<GetGames/>} path="/games" />
                    <Route element={<SettingsPage/>} path="/Settings" />
                    <Route path="/games/:title" element={<GamePage/>}/>
                    <Route path="/" element={<Box sx={{display:'flex', justifyContent:'center'}}><SvgIcon component={LoginIcon}/></Box>}/>
                    <Route path="/MyGames" element={<MyGamesPage/>}/>
                </Routes>
            </Box>
        </BrowserRouter>
    </>
  )
}
export default observer(App);
