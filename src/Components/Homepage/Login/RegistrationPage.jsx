import checkPasswordStrength from "check-password-strength";
import _ from "lodash";
import React, {useState} from "react";
import '../../../css/RegistrationPage.css';
import {registerUser} from "../../../lib/networkCalls";

export const RegistrationPage = ({setGotoRegisterPage, setGotoLoginPage}) => {
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    const updateName = ({target}) => setName(target.value);
    const updateUsername = ({target}) => setUsername(target.value);
    const updatePassword = ({target}) => {
        const password = target.value;
        setPassword(password);
        if (_.isEmpty(password.trim())) return setPasswordStrength("");
        const strength = checkPasswordStrength(password).value;
        setPasswordStrength(strength);
    };

    const onRegister = () => {
        if (_.isEmpty(username.trim()) || _.isEmpty(password.trim())) return setError(true);
        setError(false);
        registerUser(name, username, password, setGotoRegisterPage, setGotoLoginPage);
    };

    return <section className="register_page">
        <h1 className="header">A.I.K.A.I</h1>
        <section className="user_details">
            <input type="name" placeholder="Enter Full Name" className={`detail ${error ? "error" : ""}`}
                   onChange={updateName}/>
            <input type="text" placeholder="Enter Your Email" className={`detail ${error ? "error" : ""}`}
                   onChange={updateUsername}/>
            <input type="password" placeholder="Enter Password" className={`detail ${error ? "error" : ""}`}
                   onChange={updatePassword}/>
            <h5 className={`strength ${passwordStrength.toLowerCase()}`}><i>{`${passwordStrength} Password`}</i></h5>
        </section>
        <button type="button" className="reg_btn" onClick={onRegister}>Sign Up</button>
    </section>
}