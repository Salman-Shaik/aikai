import _ from "lodash";
import React, { useEffect, useState } from "react";
import "../../../../css/SearchResults.css";
import { getSix, imageUrlBuilder } from "../../../../lib/helper";
import { fetchSearchedShow } from "../../../../lib/showNetworkCalls";
import { Spinner } from "../../../Spinner";

const Section = ({ posters, key }) => (
  <section className="sectioned_posters" key={key}>
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
  setCurrentShowId,
  setShowType,
  setCurrentMenuItem,
  setHomepageLoaded
) => {
  const postersMap = movieResults.map((info, idx) => {
    const id = info.id;
    const title = info.name || info.title;
    const imagePath = info["poster_path"];
    const onClick = () => {
      setCurrentMenuItem("");
      setCurrentShowId(id);
      setShowType();
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
  setCurrentShowId,
  setCurrentShowType,
  homepageLoaded,
  setHomePageLoaded,
  setCurrentMenuItem,
}) => {
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [movieMinimized, setMovieMinimized] = useState(false);
  const [tvMinimized, setTVMinimized] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSearchedShow("movie", currentShowTitle, setMovieResults);
    fetchSearchedShow(
      "tv",
      currentShowTitle,
      setTvResults,
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
      <section className="show_items">
        <section className="action_button" onClick={minimizeMethod}>
          <span className="action_anchor">{anchorText}</span>
          <span className={`action_symbol ${minimized ? "minimized" : ""}`}>
            ⌃
          </span>
        </section>
        {!minimized && (
          <section className="show_results">
            {_.isEmpty(results) ? (
              <span className="notice">No Results</span>
            ) : (
              createSectionedPosters(
                results,
                setCurrentShowId,
                setShowType,
                setCurrentMenuItem,
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
    setTVMinimized(!tvMinimized);
    setMovieMinimized(true);
  };
  const setMovie = () => setCurrentShowType("movie");
  const setTv = () => setCurrentShowType("tv");

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
