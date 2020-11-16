import React, { useState } from "react";
import "../css/Landingpage.css";
import { getCookieValue } from "../lib/helper";
import { Header } from "./LandingPage/Header/Header";
import { Main } from "./LandingPage/Main/Main";

export const LandingPage = () => {
  const userCookie = getCookieValue("user");
  const showIdCookie = getCookieValue("showId");
  const showTypeCookie = getCookieValue("showType");
  const showCookie = getCookieValue("show");

  const currentShow = showCookie || "";
  const currentShowId = showIdCookie || 0;
  const currentShowType = showTypeCookie || "";
  const [homepageLoaded, setHomePageLoaded] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!userCookie || false);

  const updateLocation = (path) => (window.location.href = path);

  return (
    <div className="landingpage">
      <Header
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        setHomePageLoaded={setHomePageLoaded}
        updateLocation={updateLocation}
      />
      <Main
        currentShow={currentShow}
        currentShowId={currentShowId}
        currentShowType={currentShowType}
        homepageLoaded={homepageLoaded}
        setHomePageLoaded={setHomePageLoaded}
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        updateLocation={updateLocation}
      />
    </div>
  );
};
