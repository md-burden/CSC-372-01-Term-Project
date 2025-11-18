import { use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';

function LoginPage() {

    const nav = useNavigate();

    const login = () => nav('/home');

    return (
        <>
            <div id="login-page">
                <div id="banner">
                    <h1>FFXIV Mounts & Minions</h1>
                    <h2>Your personal collection journal for FFXIV's mounts and minions.</h2>
                </div>
                <div id="login-form">
                    <form id="form">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                        <br />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                        <br />
                        <button type="submit" onClick={login}>Login</button>
                    </form>
                </div>
                <hr />
                <div id="signup-prompt">
                    <p>Don't have an account? <a href="/signup">Sign up here</a></p>
                </div>
            </div>
        </>
    )
}

export default LoginPage;