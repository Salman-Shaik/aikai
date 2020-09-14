import _ from "lodash";
import React, {useState} from "react";
import '../../../css/LoginPage.css';
import {login} from "../../../lib/networkCalls";

export const LoginPage = ({setIsUserLoggedIn, setGotoRegisterPage, setGotoLoginPage}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    const onUserNameChange = ({target}) => {
        setError(false);
        setUsername(target.value);
    };

    const onPasswordChange = ({target}) => {
        setError(false);
        setPassword(target.value);
    };

    const onLogin = () => {
        if (_.isEmpty(username.trim()) || _.isEmpty(password.trim())) return setError(true);
        setError(false);
        login(username, password, setIsUserLoggedIn, setIsLoginError, setIsLoginSuccess,setGotoLoginPage);
    };

    const gotoRegister = () => {
        setGotoLoginPage(false);
        return setGotoRegisterPage(true);
    };

    return <section className="login">
        <section className="login_form" onSubmit={onLogin}>
            <h1 className="header">A.I.K.A.I</h1>
            <h4 className={` login_message ${isLoginError ? "login_error" : (isLoginSuccess ? "login_success" : "")}`}>
                {isLoginError ? "Invalid Credentials!" : (isLoginSuccess ? "Login Success." : "")}
            </h4>
            <section className="credentials">
                <input type="text" placeholder="Enter Username" className={`credential ${error ? "error" : ""}`}
                       onChange={onUserNameChange}/>
                <input type="password" placeholder="Enter Password" className={`credential ${error ? "error" : ""}`}
                       onChange={onPasswordChange}/>
            </section>
            <button type="button" className="login_button" onClick={onLogin}>Login</button>
            <span className="create_account" onClick={gotoRegister}><b>New User? Create Account</b></span>
        </section>
    </section>
}