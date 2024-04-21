import LoginForm from "./components/LoginForm.tsx";
import {useContext, useEffect} from "react";
import {Context} from "./Main.tsx";
import {observer} from "mobx-react-lite";

import NavBar from "./components/NavBar.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Box, SvgIcon} from "@mui/material";
import GetGames from "./pages/GetGames.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import MyGamesPage from "./pages/MyGamesPage.tsx";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {MainPage} from "./pages/MainPage.tsx";
import ReviewPage from "./pages/ReviewPage.tsx";


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
                            <Route path="/createReview/:title_game" element={<ReviewPage/>}/>
                        </Routes>
                    </Box>
        </BrowserRouter>
  )
}
export default observer(App);
