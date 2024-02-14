import {FC, useContext} from 'react';
import {Button, Container, Typography} from "@mui/material";
import {Context} from "../Main.tsx";
import {observer} from "mobx-react-lite";
import LoginForm from "./LoginForm.tsx";



const SettingsPage: FC = () => {
    const {store} = useContext(Context)

    if(!store.isAuth) {
        return <LoginForm />
    }
    return (
        <Container>
            <Typography variant="h1" sx={{my:4,textAlign: "center", color :'primary.main'}}>{store.isAuth ? `User: ${store.user.email}` : 'Not authorized'}</Typography>
            <Button onClick={() => store.logout()}>Logout</Button>
        </Container>
    )
}

export default observer(SettingsPage);