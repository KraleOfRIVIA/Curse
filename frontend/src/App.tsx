import './App.css';
import LoginForm from "./components/LoginForm.tsx";
import MainPage from "./components/MainPage.tsx";
import {useContext, useEffect, useState} from "react";
import {Context} from "./main.tsx";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser.ts";
import UserService from "./service/UserService.ts";


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
        <div>
            <h1>{store.isAuth ? `User: ${store.user.email}` : 'Not authorized'}</h1>
            <button onClick={() => store.logout()}>Logout</button>
        </div>
        <div>
            <button onClick={getUsers}>Get users</button>
        </div>
        {users.map(user =>
            <div key={user.email}>{user.email}</div>
        )}

        <div>
            <MainPage />
        </div>
    </>
  )
}
export default observer(App);
