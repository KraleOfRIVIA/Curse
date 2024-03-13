import LoginForm from "./components/LoginForm.tsx";
import {useContext, useEffect} from "react";
import {Context} from "./Main.tsx";
import {observer} from "mobx-react-lite";

import NavBar from "./components/NavBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Box, SvgIcon} from "@mui/material";
import GetGames from "./components/GetGames.tsx";
import SettingsPage from "./components/SettingsPage.tsx";
import GamePage from "./components/GamePage.tsx";
import MyGamesPage from "./components/MyGamesPage.tsx";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {MainPage} from "./components/MainPage.tsx";
import {CreateGamePage} from "./components/CreateGamePage.tsx";
import ReviewPage from "./components/ReviewPage.tsx";


function App() {
    const {store} = useContext(Context)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <SvgIcon sx={{ width: 100, height: 100, mx: 'auto',my: '300px', display: 'flex', justifyContent: 'center' }} component={HourglassBottomIcon} />
    }
    if(!store.isAuth) {
        return <LoginForm />
    }
  return (
        <BrowserRouter>
                <NavBar />
                    <Box>
                        <Routes>
                            <Route path="/games" element={<GetGames/>} />
                            <Route path="/Settings" element={<SettingsPage/>} />
                            <Route path="/games/:title" element={<GamePage/>}/>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/MyGames" element={<MyGamesPage/>}/>
                            <Route path="/create" element={<CreateGamePage/>}/>
                            <Route path="/createReview/:title_game" element={<ReviewPage/>}/>
                        </Routes>
                    </Box>
        </BrowserRouter>
  )
}
export default observer(App);
