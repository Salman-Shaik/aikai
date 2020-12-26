import React from "react";
import "../../../../css/Poster.css";
import {
  createCookie,
  imageUrlBuilder,
  onPosterError,
} from "../../../../lib/helper";

export const Poster = ({
  data,
  key,
  setCurrentShowType,
  setHomePageLoaded,
  updateLocation,
}) => {
  let title = data.name || data.title;

  const onClick = () => {
    createCookie("showId", data.id);
    setCurrentShowType();
    setHomePageLoaded(false);
    updateLocation("/");
  };

  return (
    <section onClick={onClick}>
      <img
        src={imageUrlBuilder(data["poster_path"])}
        alt={title}
        title={title}
        onError={onPosterError}
        className="poster"
        key={key}
        onClick={onClick}
      />
    </section>
  );
};
