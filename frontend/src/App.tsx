import LoginForm from "./components/LoginForm.tsx";
import {useContext, useEffect, useState} from "react";
import {Context} from "./Main.tsx";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser.ts";
import UserService from "./service/UserService.ts";
import GetGames from "./components/GetGames.tsx";
import {Box, Button, Container, Typography} from "@mui/material";


function App() {
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.getUsers();
            setUsers(response.data);
        } catch (e) {
            // @ts-ignore
            console.log(e)
        }
    }


    if (store.isLoading) {
        return <h1>Loading...</h1>
    }
    if(!store.isAuth) {
        return <LoginForm />
    }
  return (
    <>
        <Container>
            <Typography variant="h1" sx={{my:4,textAlign: "center", color :'primary.main'}}>{store.isAuth ? `User: ${store.user.email}` : 'Not authorized'}</Typography>
            <Button onClick={() => store.logout()}>Logout</Button>
            <Box>
                <Button onClick={getUsers}>Get users</Button>
            </Box>
            {users.map(user =>
                <Box key={user.email}>{user.email}</Box>
            )}
        </Container>
        <Box>
            <GetGames />
        </Box>
    </>
  )
}
export default observer(App);
