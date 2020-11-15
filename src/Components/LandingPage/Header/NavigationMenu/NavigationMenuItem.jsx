import React from "react";
import "../../../../css/NavigationMenuItem.css";
import { isCurrentItem } from "../../../../lib/helper";

export const NavigationMenuItem = ({ name, setHomePageLoaded, onclick }) => {
  let isItemSelected = isCurrentItem(name);
  const onClick = ({ target }) => {
    setHomePageLoaded(false);
    target.blur();
    onclick();
  };

  const isMovieOrTV =
    window.location.href === "/movies" || window.location.href === "/tv_shows";

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
