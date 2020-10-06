import React from "react";
import "../../../../css/Poster.css";
import { imageUrlBuilder } from "../../../../lib/helper";

export const Poster = ({
  data,
  key,
  setCurrentShowId,
  setCurrentShowType,
  setHomePageLoaded,
}) => {
  let title = data.name || data.title;

  const onClick = () => {
    setCurrentShowId(data.id);
    setCurrentShowType();
    setHomePageLoaded(false);
  };

  return (
    <section onClick={onClick}>
      <img
        src={imageUrlBuilder(data["poster_path"])}
        alt={title}
        className="poster"
        key={key}
        onClick={onClick}
      />
    </section>
  );
};
