import React, {useState} from "react";
import '../css/Homepage.css'
import {getCookieValue} from "../lib/helper";
import {Header} from "./Homepage/Header";
import {LoginPage} from "./Homepage/Login/LoginPage";
import {RegistrationPage} from "./Homepage/Login/RegistrationPage";
import {Main} from "./Homepage/Main";

export const Homepage = () => {
    const userCookie = getCookieValue('user');
    const [currentMenuItem, setCurrentMenuItem] = useState("");
    const [currentShow, setCurrentShow] = useState("");
    const [currentShowId, setCurrentShowId] = useState(0);
    const [currentShowType, setCurrentShowType] = useState("");
    const [homepageLoaded, setHomePageLoaded] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!userCookie || false);
    const [gotoLoginPage, setGotoLoginPage] = useState(false);
    const [gotoRegisterPage, setGotoRegisterPage] = useState(false);

    return <div className="homepage">
        <Header currentMenuItem={currentMenuItem}
                isUserLoggedIn={isUserLoggedIn}
                setGotoLoginPage={setGotoLoginPage}
                setCurrentShow={setCurrentShow}
                setCurrentShowId={setCurrentShowId}
                setCurrentShowType={setCurrentShowType}
                setHomePageLoaded={setHomePageLoaded}
                setCurrentMenuItem={setCurrentMenuItem}
        />
        {gotoLoginPage
            ? <LoginPage setIsUserLoggedIn={setIsUserLoggedIn} setGotoRegisterPage={setGotoRegisterPage} setGotoLoginPage={setGotoLoginPage}/>
            : (gotoRegisterPage
                ? <RegistrationPage setGotoRegisterPage={setGotoRegisterPage} setGotoLoginPage={setGotoLoginPage}/>
                : <Main currentMenuItem={currentMenuItem}
                        currentShow={currentShow}
                        currentShowId={currentShowId}
                        currentShowType={currentShowType}
                        homepageLoaded={homepageLoaded}
                        setCurrentShow={setCurrentShow}
                        setCurrentShowId={setCurrentShowId}
                        setCurrentShowType={setCurrentShowType}
                        setHomePageLoaded={setHomePageLoaded}/>)}
    </div>
}