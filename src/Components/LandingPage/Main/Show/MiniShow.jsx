import React from "react";
import "../../../../css/MiniShow.css";
import { createCookie, imageUrlBuilder } from "../../../../lib/helper";
import { FavoriteComponent } from "./Actions/FavoriteComponent";

export const MiniShow = ({
  posterPath,
  title,
  id,
  setHomePageLoaded,
  favFlag,
  updateLocation,
  isUserLoggedIn,
}) => {
  const onClick = () => {
    createCookie("showId", id);
    updateLocation("/");
    setHomePageLoaded(false);
  };

  return (
    <section
      className="mini_show"
      data-testid={"mini_show"}
      onClick={!!favFlag ? () => {} : onClick}
    >
      <section className="mini_show_details" onClick={onClick}>
        <img
          className="mini_poster"
          data-testid="mini_poster"
          src={imageUrlBuilder(posterPath)}
          alt={title}
          onClick={onClick}
        />
        <h4 className="title" onClick={onClick} data-testid="title">
          {title}
        </h4>
      </section>
      <section className="mini_show_actions">
        {!!favFlag && (
          <FavoriteComponent
            id={id}
            title={title}
            posterPath={posterPath}
            initialValue={true}
            updateLocation={updateLocation}
            isUserLoggedIn={isUserLoggedIn}
          />
        )}
      </section>
    </section>
  );
};
