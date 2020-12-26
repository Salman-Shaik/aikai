import _ from "lodash";
import React, { useEffect, useState } from "react";
import "../../../../css/SearchResults.css";
import { createCookie, getSix, imageUrlBuilder } from "../../../../lib/helper";
import { fetchSearchedShow } from "../../../../lib/showNetworkCalls";
import { Spinner } from "../../../Spinner";

const Section = ({ posters, key }) => (
  <section
    className="sectioned_posters"
    data-testid="sectioned_posters"
    key={key}
  >
    {posters}
  </section>
);

const getSectionedPosters = (map) => {
  const sectionedMap = [];
  for (let i = 0; i < map.length; i += 6)
    sectionedMap.push(<Section posters={getSix(map, i)} key={i} />);
  return sectionedMap;
};

const createSectionedPosters = (
  movieResults,
  updateLocation,
  setHomepageLoaded
) => {
  const postersMap = movieResults.map((info, idx) => {
    const id = info.id;
    const title = info.name || info.title;
    const imagePath = info["poster_path"];
    const onClick = () => {
      info.setShowType();
      createCookie("showId", id);
      updateLocation("/");
      setHomepageLoaded(false);
    };
    return (
      <img
        className="search_posters"
        src={imageUrlBuilder(imagePath)}
        alt={title}
        onClick={onClick}
        key={idx}
      />
    );
  });
  return getSectionedPosters(postersMap);
};

export const SearchResults = ({
  currentShowTitle,
  homepageLoaded,
  setHomePageLoaded,
  updateLocation,
}) => {
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSearchedShow(
      "movie",
      currentShowTitle,
      setMovieResults,
      setLoaded,
      setHomePageLoaded
    );
    fetchSearchedShow(
      "tv",
      currentShowTitle,
      setTvResults,
      setLoaded,
      setHomePageLoaded
    );
  }, [currentShowTitle, setHomePageLoaded]);

  const results = movieResults.concat(tvResults).sort((a, b) => {
    const aTitle = a.name || a.title;
    const bTitle = b.name || b.title;
    return aTitle.toLowerCase() === currentShowTitle.toLowerCase()
      ? 1
      : bTitle.toLowerCase() === currentShowTitle.toLowerCase()
      ? 1
      : aTitle.toLowerCase() > bTitle.toLowerCase()
      ? -1
      : 1;
  });

  const Component = () => {
    return (
      <section className="search_results">
        <span className="search_text">{`Search Results For ${currentShowTitle}...`}</span>
        <section className="show_items" data-testid="show_items">
          <section className="show_results" data-testid="show_results">
            {_.isEmpty(results) ? (
              <span className="notice">No Results</span>
            ) : (
              createSectionedPosters(results, updateLocation, setHomePageLoaded)
            )}
          </section>
        </section>
      </section>
    );
  };

  return !loaded || !homepageLoaded ? (
    <Spinner loaded={loaded} />
  ) : (
    <Component />
  );
};
