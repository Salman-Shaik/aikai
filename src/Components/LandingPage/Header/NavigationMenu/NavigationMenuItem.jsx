import React from "react";
import "../../../../css/NavigationMenuItem.css";

export const NavigationMenuItem = ({
  name,
  currentMenuItem,
  setCurrentMenuItem,
  setHomePageLoaded,
  onclick,
}) => {
  let isItemSelected = name === currentMenuItem;
  const onClick = ({ target }) => {
    setHomePageLoaded(false);
    setCurrentMenuItem(name);
    target.blur();
    onclick();
  };
  const isMovieOrTV =
    (currentMenuItem === "movie" && name === "Movies") ||
    (currentMenuItem === "tv" && name === "TV Shows");
  return (
    <button
      type="button"
      title={name}
      onClick={onClick}
      className={`menu_item ${isItemSelected ? "underline" : ""} ${
        isMovieOrTV ? "underline" : ""
      }`}
    >
      {name}
    </button>
  );
};
