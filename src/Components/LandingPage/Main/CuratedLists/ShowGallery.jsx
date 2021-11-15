import React, { useEffect, useState } from "react";
import _ from "lodash";
import { fetchImages } from "../../../../lib/showNetworkCalls";
import {
  createCookie,
  getSectionedPosters,
  imageUrlBuilder,
  onPosterError,
} from "../../../../lib/helper";
import "../../../../css/SearchResults.css";
import { Spinner } from "../../../Spinner";

export const ShowGallery = ({
  setHomePageLoaded,
  updateLocation,
  list,
  editorsChoice,
  editorsChoiceFlag,
  cinematicUniverse,
}) => {
  const [showsInfo, setShowsInfo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(async () => {
    if (_.isEmpty(cinematicUniverse)) updateLocation("/curated_lists");
    let moviesAndShows = editorsChoice;

    if (!editorsChoiceFlag) {
      moviesAndShows = Object.values(list).find(
        (cu) => cu.title === cinematicUniverse
      ).moviesAndShows;
    }
    const info = await Promise.all(
      moviesAndShows.map(async ({ id, type, title }) => {
        const posterPath = await fetchImages(id, type);
        return { posterPath, title, id, type };
      })
    );
    setShowsInfo(info);
    setLoaded(true);
  }, []);

  const createSectionedPosters = (
    movieResults,
    updateLocation,
    setHomepageLoaded
  ) => {
    const postersMap = movieResults.map((info, idx) => {
      const id = info.id;
      const title = info.name || info.title;
      const imagePath = info.posterPath;
      const onClick = () => {
        createCookie("showType", info.type);
        createCookie("showId", id);
        setHomepageLoaded(false);
        updateLocation("/");
      };
      return (
        <img
          className="search_posters"
          onError={onPosterError}
          src={imageUrlBuilder(imagePath)}
          alt={title}
          title={title}
          onClick={onClick}
          key={idx}
        />
      );
    });
    return getSectionedPosters(postersMap);
  };

  return !loaded ? (
    <Spinner loaded={loaded} />
  ) : (
    <section>
      {_.isEmpty(showsInfo) ? (
        <h2 className="notice">Please Try Again Later.</h2>
      ) : (
        createSectionedPosters(showsInfo, updateLocation, setHomePageLoaded)
      )}
    </section>
  );
};
