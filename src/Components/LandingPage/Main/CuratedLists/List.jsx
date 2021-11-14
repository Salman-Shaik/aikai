import React, { useEffect, useState } from "react";
import "../../../../css/CuratedLists.css";
import { fetchCast, fetchImages } from "../../../../lib/showNetworkCalls";
import { imageUrlBuilder, onPosterError } from "../../../../lib/helper";
import _ from "lodash";

export const List = ({ title, description, items }) => {
  const firstFive = items.slice(0, 5);
  const [images, setImages] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(async () => {
    const idsAndType = firstFive.map(({ id, type }) => ({ id, type }));
    const posters = await Promise.all(
      idsAndType.map(async ({ id, type }) => await fetchImages(id, type))
    );
    const credits = await Promise.all(
      idsAndType.map(async ({ id, type }) => await fetchCast(id, type))
    );
    setImages(posters);
    setCast(_.uniq(credits));
  }, []);

  return (
    <section className={"curated_list"}>
      <section className={"background"}>
        {images.map((image) => {
          return (
            <img
              src={imageUrlBuilder(image)}
              className={"image"}
              alt={"Poster"}
              onError={onPosterError}
            />
          );
        })}
      </section>
      <section className={"foreground"}>
        <h2 className={"list_title"}>{title}</h2>
        <p className={"movies_list"}>
          Movies: {firstFive.map((m) => m.title).join(", ")}, etc.
        </p>
        <p className={"cast"}>Starring: {cast.join(", ")}, etc.</p>
        <p className={"description"}>{description}</p>
      </section>
    </section>
  );
};
