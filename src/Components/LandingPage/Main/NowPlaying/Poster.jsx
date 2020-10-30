import React from "react";
import "../../../../css/Poster.css";
import { imageUrlBuilder } from "../../../../lib/helper";

export const Poster = ({
  data,
  key,
  setCurrentShowId,
  setCurrentShowType,
  setHomePageLoaded,
  setCurrentMenuItem,
}) => {
  let title = data.name || data.title;

  const onClick = () => {
    setCurrentMenuItem("");
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
