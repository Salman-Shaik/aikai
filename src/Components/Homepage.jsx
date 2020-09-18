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
    const [favorites, setFavorites] = useState([]);

    return <div className="homepage">
        <Header currentMenuItem={currentMenuItem}
                isUserLoggedIn={isUserLoggedIn}
                setIsUserLoggedIn={setIsUserLoggedIn}
                setGotoLoginPage={setGotoLoginPage}
                setCurrentShow={setCurrentShow}
                setCurrentShowId={setCurrentShowId}
                setCurrentShowType={setCurrentShowType}
                setHomePageLoaded={setHomePageLoaded}
                setCurrentMenuItem={setCurrentMenuItem}
                setGotoRegisterPage={setGotoRegisterPage}
                setFavorites={setFavorites}
        />
        {gotoLoginPage
            ? <LoginPage setIsUserLoggedIn={setIsUserLoggedIn}
                         setGotoRegisterPage={setGotoRegisterPage}
                         setGotoLoginPage={setGotoLoginPage}
                         setCurrentMenuItem={setCurrentMenuItem}/>
            : (gotoRegisterPage
                ? <RegistrationPage setGotoRegisterPage={setGotoRegisterPage} setGotoLoginPage={setGotoLoginPage}/>
                : <Main currentMenuItem={currentMenuItem}
                        currentShow={currentShow}
                        currentShowId={currentShowId}
                        currentShowType={currentShowType}
                        homepageLoaded={homepageLoaded}
                        favorites={favorites}
                        setCurrentShow={setCurrentShow}
                        setCurrentShowId={setCurrentShowId}
                        setCurrentShowType={setCurrentShowType}
                        setCurrentMenuItem={setCurrentMenuItem}
                        setHomePageLoaded={setHomePageLoaded}
                        isUserLoggedIn={isUserLoggedIn}
                        setGotoLoginPage={setGotoLoginPage}/>)}
    </div>
}