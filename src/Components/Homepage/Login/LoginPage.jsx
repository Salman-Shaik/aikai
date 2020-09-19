import _ from "lodash";
import React, {useState} from "react";
import '../../../css/LoginPage.css';
import {login} from "../../../lib/networkCalls";

export const LoginPage = ({setIsUserLoggedIn, setGotoRegisterPage, setGotoLoginPage, setCurrentMenuItem}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    const onUserNameChange = ({target}) => {
        setUsernameError(false);
        setUsername(target.value);
    };

    const onPasswordChange = ({target}) => {
        setPasswordError(false);
        setPassword(target.value);
    };

    const isFormInValid = () => {
        let isInvalid = false;
        if (_.isEmpty(username.trim())) {
            isInvalid = true;
            setUsernameError(true);
        }
        if (_.isEmpty(password.trim())) {
            isInvalid = true;
            setPasswordError(true);
        }
        return isInvalid;
    };

    const onLogin = () => {
        if (isFormInValid()) return;
        setUsernameError(false);
        setPasswordError(false);
        login(username, password, setIsUserLoggedIn, setIsLoginError, setIsLoginSuccess, setGotoLoginPage);
    };

    const gotoRegister = () => {
        setCurrentMenuItem("");
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
                <input type="text" placeholder="Enter Username" className={`credential ${usernameError ? "error" : ""}`}
                       onChange={onUserNameChange} autoComplete="on"/>
                <input type="password" placeholder="Enter Password"
                       className={`credential ${passwordError ? "error" : ""}`}
                       onChange={onPasswordChange} autoComplete="on"/>
            </section>
            <button type="button" className="login_button" onClick={onLogin}>Login</button>
            <span className="create_account" onClick={gotoRegister}><b>New User? Create Account</b></span>
        </section>
    </section>
}