import Tooltip from "@material-ui/core/Tooltip";
import { CheckCircle } from "@material-ui/icons";
import React from "react";
import "../../../../css/MiniShow.css";
import {
  createCookie,
  imageUrlBuilder,
  onPosterError,
} from "../../../../lib/helper";
import { markWatched } from "../../../../lib/networkCalls";
import { FavoriteComponent } from "./Actions/FavoriteComponent";
import { WatchListComponent } from "./Actions/WatchListComponent";

export const MiniShow = ({
  posterPath,
  title,
  id,
  setHomePageLoaded,
  favFlag,
  watchListFlag,
  updateLocation,
  isUserLoggedIn,
  currentShowType,
}) => {
  const onClick = () => {
    createCookie("showId", id);
    !!currentShowType && createCookie("showType", currentShowType);
    updateLocation("/");
    setHomePageLoaded(false);
  };

  const onWatched = () => markWatched(id, updateLocation);

  return (
    <section
      className="mini_show"
      data-testid={"mini_show"}
      onClick={!!favFlag || !!watchListFlag ? () => {} : onClick}
    >
      <section className="mini_show_details" onClick={onClick}>
        <img
          className="mini_poster"
          data-testid="mini_poster"
          src={imageUrlBuilder(posterPath)}
          alt={title}
          title={title}
          onError={onPosterError}
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
        {!!watchListFlag && (
          <WatchListComponent
            id={id}
            title={title}
            posterPath={posterPath}
            updateLocation={updateLocation}
            isUserLoggedIn={isUserLoggedIn}
            initialValue={true}
          />
        )}
        {!!watchListFlag && (
          <Tooltip title="Watched?">
            <CheckCircle className="watched_icon" onClick={onWatched} />
          </Tooltip>
        )}
      </section>
    </section>
  );
};
