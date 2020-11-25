import React from "react";
import "../../../css/Header.css";
import { deleteCookie } from "../../../lib/helper";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";

export const Header = ({
  isUserLoggedIn,
  setIsUserLoggedIn,
  setHomePageLoaded,
  updateLocation,
}) => {
  const onIconClick = () => {
    updateLocation("/");
    deleteCookie("show");
    deleteCookie("showId");
  };

  return (
    <header className="page_header">
      <section className="logo_sections" onClick={onIconClick}>
        <img
          src={`favicon.png`}
          alt="icon"
          className="logo-symbol"
          onClick={onIconClick}
        />
        <h2 className="logo" onClick={onIconClick}>
          A.I.K.A.I
        </h2>
      </section>
      <NavigationMenu
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        setHomePageLoaded={setHomePageLoaded}
        updateLocation={updateLocation}
      />
    </header>
  );
};
