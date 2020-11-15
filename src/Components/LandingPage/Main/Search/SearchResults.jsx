import _ from "lodash";
import React, { useEffect, useState } from "react";
import "../../../../css/SearchResults.css";
import { createCookie, getSix, imageUrlBuilder } from "../../../../lib/helper";
import { fetchSearchedShow } from "../../../../lib/showNetworkCalls";
import { Spinner } from "../../../Spinner";
import { MinimizeActionButton } from "../MinimizeActionButton";

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
  setShowType,
  updateLocation,
  setHomepageLoaded
) => {
  const postersMap = movieResults.map((info, idx) => {
    const id = info.id;
    const title = info.name || info.title;
    const imagePath = info["poster_path"];
    const onClick = () => {
      createCookie("showId", id);
      setShowType();
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
  const [movieMinimized, setMovieMinimized] = useState(false);
  const [tvMinimized, setTVMinimized] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSearchedShow(
      "movie",
      currentShowTitle,
      setMovieResults,
      setLoaded,
      setHomePageLoaded
    );
  }, [currentShowTitle, setHomePageLoaded]);

  const ResultsComponent = ({
    minimizeMethod,
    minimized,
    anchorText,
    results,
    setShowType,
    setHomepageLoaded,
  }) => {
    return (
      <section className="show_items" data-testid="show_items">
        <MinimizeActionButton
          minimized={minimized}
          anchorText={anchorText}
          minimizeMethod={minimizeMethod}
          className="action_button"
        />
        {!minimized && (
          <section className="show_results" data-testid="show_results">
            {_.isEmpty(results) ? (
              <span className="notice">No Results</span>
            ) : (
              createSectionedPosters(
                results,
                setShowType,
                updateLocation,
                setHomepageLoaded
              )
            )}
          </section>
        )}
      </section>
    );
  };

  const minimizeMovies = () => {
    setMovieMinimized(!movieMinimized);
    setTVMinimized(true);
  };

  const minimizeTv = () => {
    setLoaded(false);
    setHomePageLoaded(false);
    setTVMinimized(!tvMinimized);
    setMovieMinimized(true);
    fetchSearchedShow(
      "tv",
      currentShowTitle,
      setTvResults,
      setLoaded,
      setHomePageLoaded
    );
  };

  const setMovie = () => createCookie("showType", "movie");
  const setTv = () => createCookie("showType", "tv");

  const Component = () => {
    return (
      <section className="search_results">
        <span className="search_text">{`Search Results For ${currentShowTitle}...`}</span>
        <ResultsComponent
          minimizeMethod={minimizeMovies}
          anchorText="Movies"
          results={movieResults}
          setShowType={setMovie}
          minimized={movieMinimized}
          setHomepageLoaded={setHomePageLoaded}
        />
        <ResultsComponent
          minimizeMethod={minimizeTv}
          anchorText="TV Shows"
          results={tvResults}
          setShowType={setTv}
          minimized={tvMinimized}
          setHomepageLoaded={setHomePageLoaded}
        />
      </section>
    );
  };

  return !loaded || !homepageLoaded ? (
    <Spinner loaded={loaded} />
  ) : (
    <Component />
  );
};
