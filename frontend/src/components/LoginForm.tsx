// @ts-ignore
import React, {FC, useContext, useState} from 'react';
import {Context} from "../main.tsx";
import {observer} from "mobx-react-lite";

const LoginForm:FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)
    return (
        <div>
            <input
                onChange={event => setEmail(event.target.value)}
                value={email}
                type="email"
                placeholder="Email"
            />
            <input
                onChange={event => setPassword(event.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>Registration</button>
        </div>
    );
};

export default observer(LoginForm);