import React from "react";
import "../../../css/Header.css";
import {NavigationMenu} from "./NavigationMenu/NavigationMenu";

export const Header = ({
                         currentMenuItem,
                         setCurrentMenuItem,
                         isUserLoggedIn,
                         setGotoLoginPage,
                         setFavorites,
                         setIsUserLoggedIn,
                         setCurrentShow,
                         setCurrentShowId,
                         setCurrentShowType,
                         setHomePageLoaded,
                         setGotoRegisterPage,
                       }) => {
  const onIconClick = () => {
    setCurrentMenuItem("");
    setCurrentShow("");
    setCurrentShowId(0);
    setGotoLoginPage(false);
    setGotoRegisterPage(false);
  };

  return (
    <header className="page_header">
      <h2 className="logo" onClick={onIconClick}>
        A.I.K.A.I
      </h2>
      <NavigationMenu
        currentMenuItem={currentMenuItem}
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        setGotoLoginPage={setGotoLoginPage}
        setGotoRegisterPage={setGotoRegisterPage}
        setCurrentMenuItem={setCurrentMenuItem}
        setCurrentShow={setCurrentShow}
        setCurrentShowId={setCurrentShowId}
        setCurrentShowType={setCurrentShowType}
        setHomePageLoaded={setHomePageLoaded}
        setFavorites={setFavorites}
      />
    </header>
  );
};
