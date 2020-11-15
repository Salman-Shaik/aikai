import Tooltip from "@material-ui/core/Tooltip";
import Favorite from "@material-ui/icons/Favorite";
import React from "react";
import "../../../../css/NavigationMenu.css";
import { fetchUserFavorites } from "../../../../lib/networkCalls";
import { NavigationMenuItem } from "./NavigationMenuItem";
import { SearchBar } from "./SearchBar";
import { UserIcon } from "./UserIcon";

export const NavigationMenu = (props) => {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    setHomePageLoaded,
    setFavorites,
    updateLocation,
  } = props;

  const createNavigationMenuItem = (name, onclick) => (
    <NavigationMenuItem
      name={name}
      onclick={onclick}
      setHomePageLoaded={setHomePageLoaded}
    />
  );

  const onEditorsChoice = () => {
    setHomePageLoaded(false);
    updateLocation("/editors_choice");
  };

  const onFavorites = () => {
    if (!isUserLoggedIn) return updateLocation("/login");
    fetchUserFavorites().then((favorites) => {
      setFavorites(favorites);
      setHomePageLoaded(true);
      updateLocation("/favorites");
    });
  };

  const onNowPlaying = () => {
    updateLocation("/now_playing");
  };

  const onMovie = () => {
    updateLocation("/movies");
  };

  const onTv = () => {
    updateLocation("/tv_shows");
  };

  return (
    <section className="navigation_menu">
      {createNavigationMenuItem("Now Playing", onNowPlaying)}
      {createNavigationMenuItem("Movies", onMovie)}
      {createNavigationMenuItem("TV Shows", onTv)}
      {createNavigationMenuItem("Editor's Choice", onEditorsChoice)}
      <Tooltip title="Favorites">
        <Favorite className="favorites_icon" onClick={onFavorites} />
      </Tooltip>
      <SearchBar
        setHomePageLoaded={setHomePageLoaded}
        updateLocation={updateLocation}
      />
      <UserIcon
        isUserLoggedIn={isUserLoggedIn}
        setHomePageLoaded={setHomePageLoaded}
        setIsUserLoggedIn={setIsUserLoggedIn}
        updateLocation={updateLocation}
      />
    </section>
  );
};
