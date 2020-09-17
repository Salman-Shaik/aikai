import checkPasswordStrength from "check-password-strength";
import _ from "lodash";
import React, {useState} from "react";
import Switch from "react-switch";
import '../../../css/RegistrationPage.css';
import {registerUser} from "../../../lib/networkCalls";

export const RegistrationPage = ({setGotoRegisterPage, setGotoLoginPage}) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [explicitFlag, setExplicitFlag] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(true);
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
    const updateAge = ({target}) => {
        const value = +target.value;
        setDisabled(value < 18);
        setAge(value);
    }
    const onSwitch = () => setExplicitFlag(!explicitFlag)

    const onRegister = () => {
        if (_.isEmpty(username.trim()) || _.isEmpty(password.trim()) || _.isEqual(age, 0)) return setError(true);
        setError(false);
        registerUser(name, username, password, age, explicitFlag, setGotoRegisterPage, setGotoLoginPage);
    };

    return <section className="register_page">
        <h1 className="header">A.I.K.A.I</h1>
        <section className="user_details">
            <section className="personal_details">
                <input type="name" placeholder="Enter Full Name" className={`detail name ${error ? "error" : ""}`}
                       onChange={updateName}/>
                <input type="number" placeholder="Age" className={`detail age ${error ? "error" : ""}`}
                       onChange={updateAge}/>
            </section>
            <section className="explicit">
                <span className="explicit_label">Show Explicit Content</span>
                {console.log(disabled)}
                <Switch onChange={onSwitch} checked={explicitFlag} className={"explicit_switch"} disabled={disabled}
                        offHandleColor="#a9a9a9" onHandleColor="#ffefd5" offColor="#000000" onColor="#fb74a9"/>
            </section>
            <input type="text" placeholder="Enter Your Email" className={`detail email ${error ? "error" : ""}`}
                   onChange={updateUsername}/>
            <input type="password" placeholder="Enter Password" className={`detail password ${error ? "error" : ""}`}
                   onChange={updatePassword}/>
            <h5 className={`strength ${passwordStrength.toLowerCase()}`}><i>{`${passwordStrength} Password`}</i></h5>
        </section>
        <button type="button" className="reg_btn" onClick={onRegister}>Sign Up</button>
    </section>
}