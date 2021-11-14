import Tooltip from "@material-ui/core/Tooltip";
import { Bookmark } from "@material-ui/icons";
import Favorite from "@material-ui/icons/Favorite";
import React from "react";
import "../../../../css/NavigationMenu.css";
import { NavigationMenuItem } from "./NavigationMenuItem";
import { SearchBar } from "./SearchBar";
import { UserIcon } from "./UserIcon";

export const NavigationMenu = (props) => {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    setHomePageLoaded,
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
    setHomePageLoaded(false);
    updateLocation("/favorite_shows");
  };

  const onWatchlist = () => {
    setHomePageLoaded(false);
    updateLocation("/watch_list");
  };

  const onNowPlaying = () => {
    updateLocation("/now_playing");
  };

  const onDownload = () => {
    updateLocation("/download_app");
  };

  const onMovie = () => {
    updateLocation("/movies");
  };

  const onTv = () => {
    updateLocation("/tv_shows");
  };

  const onCuratedLists = () => {
    updateLocation("/curated_lists");
  };

  return (
    <section className="navigation_menu">
      {createNavigationMenuItem("Download App", onDownload)}
      <p className="page_info">|</p>
      {createNavigationMenuItem("Now Playing", onNowPlaying)}
      {createNavigationMenuItem("Movie", onMovie)}
      {createNavigationMenuItem("TV", onTv)}
      {createNavigationMenuItem("Editor's Choice", onEditorsChoice)}
      {createNavigationMenuItem("Curated Lists", onCuratedLists)}
      <Tooltip title="Favorites">
        <Favorite className="favorites_icon" onClick={onFavorites} />
      </Tooltip>
      <Tooltip title="Watchlist">
        <Bookmark className="watchlist_icon" onClick={onWatchlist} />
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
