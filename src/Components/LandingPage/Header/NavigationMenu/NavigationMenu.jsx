import Tooltip from "@material-ui/core/Tooltip";
import Favorite from "@material-ui/icons/Favorite";
import PlayArrow from "@material-ui/icons/PlayArrow";
import React from "react";
import "../../../../css/NavigationMenu.css";
import {list} from "../../../../data/editorsChoice.json";
import {getRandomItem} from "../../../../lib/helper";
import {fetchUserFavorites} from "../../../../lib/networkCalls";
import {NavigationMenuItem} from "./NavigationMenuItem";
import {SearchBar} from "./SearchBar";
import {UserIcon} from "./UserIcon";

export const NavigationMenu = (props) => {
  const {
    currentMenuItem,
    isUserLoggedIn,
    setCurrentMenuItem,
    setCurrentShow,
    setCurrentShowId,
    setIsUserLoggedIn,
    setCurrentShowType,
    setHomePageLoaded,
    setGotoLoginPage,
    setFavorites,
    setGotoRegisterPage,
  } = props;

  const createNavigationMenuItem = (name, onclick) => (
    <NavigationMenuItem
      name={name}
      currentMenuItem={currentMenuItem}
      setCurrentMenuItem={setCurrentMenuItem}
      setHomePageLoaded={setHomePageLoaded}
      onclick={onclick}
    />
  );

  const setUserPagesOff = () => {
    setGotoLoginPage(false);
    setGotoRegisterPage(false);
  };

  const onEditorsChoice = () => {
    setUserPagesOff();
    const randomShow = getRandomItem(list);
    setCurrentShowType("");
    setCurrentShowId(0);
    setCurrentShow(randomShow);
    setHomePageLoaded(true);
  };

  const onFavorites = () => {
    setGotoRegisterPage(false);
    if (!isUserLoggedIn) return setGotoLoginPage(true);
    fetchUserFavorites().then((favorites) => {
      setCurrentMenuItem("Favorites");
      setFavorites(favorites);
      setHomePageLoaded(true);
    });
  };

  const onNowPlaying = () => {
    setCurrentMenuItem("Now Playing");
    setUserPagesOff();
  };

  const onMovie = () => {
    setUserPagesOff();
    setCurrentMenuItem("movie");
  };

  const onTv = () => {
    setUserPagesOff();
    setCurrentMenuItem("tv");
  };

  return (
    <section className="navigation_menu">
      <Tooltip title="Now Playing">
        <PlayArrow className="play_icon" onClick={onNowPlaying}/>
      </Tooltip>
      {createNavigationMenuItem("Movies", onMovie)}
      {createNavigationMenuItem("TV Shows", onTv)}
      {createNavigationMenuItem("Editor's Choice", onEditorsChoice)}
      <Tooltip title="Favorites">
        <Favorite className="favorites_icon" onClick={onFavorites}/>
      </Tooltip>
      <SearchBar
        setCurrentShow={setCurrentShow}
        setCurrentShowId={setCurrentShowId}
        setHomePageLoaded={setHomePageLoaded}
        setCurrentMenuItem={setCurrentMenuItem}
        clear={() => {
          setGotoRegisterPage(false);
          setGotoLoginPage(false);
        }}
      />
      <UserIcon
        isUserLoggedIn={isUserLoggedIn}
        setGotoLoginPage={setGotoLoginPage}
        setHomePageLoaded={setHomePageLoaded}
        setIsUserLoggedIn={setIsUserLoggedIn}
        setCurrentMenuItem={setCurrentMenuItem}
      />
    </section>
  );
};
