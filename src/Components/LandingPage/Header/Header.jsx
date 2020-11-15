import React from "react";
import "../../../css/Header.css";
import { deleteCookie } from "../../../lib/helper";
import { NavigationMenu } from "./NavigationMenu/NavigationMenu";

export const Header = ({
  isUserLoggedIn,
  setFavorites,
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
      <h2 className="logo" onClick={onIconClick}>
        A.I.K.A.I
      </h2>
      <NavigationMenu
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        setHomePageLoaded={setHomePageLoaded}
        setFavorites={setFavorites}
        updateLocation={updateLocation}
      />
    </header>
  );
};
