import _ from "lodash";
import React, { useEffect, useState } from "react";
import { fetchOtherShow } from "../../../../lib/showNetworkCalls";
import { Spinner } from "../../../Spinner";
import { MiniShow } from "./MiniShow";

const createMiniShows = (
  shows,
  setCurrentShow,
  setCurrentShowId,
  setHomePageLoaded,
  updateLocation
) => {
  return shows.map((show, index) => {
    const posterPath = show["poster_path"];
    const title = show.title || show.name;
    return (
      <MiniShow
        posterPath={posterPath}
        title={title}
        setCurrentShowId={setCurrentShowId}
        key={index}
        setHomePageLoaded={setHomePageLoaded}
        id={show.id}
        updateLocation={updateLocation}
      />
    );
  });
};

const Component = ({
  className,
  otherShows,
  keyword,
  currentShowType,
  setCurrentShow,
  setCurrentShowId,
  setHomePageLoaded,
  updateLocation,
}) => {
  return (
    <section className={className} data-testid={className}>
      <h3 className="section_title">{_.capitalize(keyword)}</h3>
      {_.isEmpty(otherShows) ? (
        <h4 className="empty" data-testid="empty">{`No ${_.capitalize(
          keyword
        )} ${_.capitalize(currentShowType)}s`}</h4>
      ) : (
        <section className="mini_shows" data-testid="mini_shows">
          {createMiniShows(
            otherShows,
            setCurrentShow,
            setCurrentShowId,
            setHomePageLoaded,
            updateLocation
          )}
        </section>
      )}
    </section>
  );
};

export const OtherShows = ({
  keyword,
  className,
  showId,
  currentShowType,
  setCurrentShow,
  setCurrentShowId,
  homepageLoaded,
  setHomePageLoaded,
  updateLocation,
}) => {
  const [otherShows, setOtherShows] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (showId !== 0 && !_.isEmpty(currentShowType)) {
      fetchOtherShow(
        currentShowType,
        showId,
        keyword,
        setOtherShows,
        setLoaded,
        setHomePageLoaded
      );
    }
  }, [currentShowType, keyword, showId, setHomePageLoaded]);

  return !loaded || !homepageLoaded ? (
    <Spinner />
  ) : (
    <Component
      className={className}
      otherShows={otherShows}
      keyword={keyword}
      currentShowType={currentShowType}
      setCurrentShow={setCurrentShow}
      setCurrentShowId={setCurrentShowId}
      setHomePageLoaded={setHomePageLoaded}
      updateLocation={updateLocation}
    />
  );
};
