import React, {useState} from "react";
import {NotificationContainer} from "react-notifications";
import '../css/Landingpage.css'
import {getCookieValue} from "../lib/helper";
import {Header} from "./LandingPage/Header/Header";
import {LoginPage} from "./LandingPage/Main/Login/LoginPage";
import {RegistrationPage} from "./LandingPage/Main/Login/RegistrationPage";
import {Main} from "./LandingPage/Main/Main";

export const LandingPage = () => {
    const userCookie = getCookieValue('user');
    const showIdCookie = getCookieValue('showId');
    const showTypeCookie = getCookieValue('showType');

    const [currentMenuItem, setCurrentMenuItem] = useState("");
    const [currentShow, setCurrentShow] = useState("");
    const [currentShowId, setCurrentShowId] = useState(showIdCookie || 0);
    const [currentShowType, setCurrentShowType] = useState(showTypeCookie || "");
    const [homepageLoaded, setHomePageLoaded] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!userCookie || false);
    const [gotoLoginPage, setGotoLoginPage] = useState(false);
    const [gotoRegisterPage, setGotoRegisterPage] = useState(false);
    const [favorites, setFavorites] = useState([]);

    return <div className="landingpage">
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
        <NotificationContainer/>
    </div>
}