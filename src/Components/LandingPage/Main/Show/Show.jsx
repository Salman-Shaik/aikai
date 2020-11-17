import _ from "lodash";
import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import "../../../../css/Show.css";
import { fetchShow } from "../../../../lib/showNetworkCalls";
import { Spinner } from "../../../Spinner";
import { OtherShows } from "./OtherShows";
import { ShowDetails } from "./ShowDetails";
import { Videos } from "./Videos";

const Component = ({
  info,
  currentShowType,
  setHomePageLoaded,
  homepageLoaded,
  isUserLoggedIn,
  updateLocation,
}) => {
  const createOtherMovies = (keyword, className) => (
    <OtherShows
      keyword={keyword}
      className={className}
      currentShowType={currentShowType}
      showId={info.id}
      homepageLoaded={homepageLoaded}
      setHomePageLoaded={setHomePageLoaded}
      updateLocation={updateLocation}
    />
  );

  const ShowSection = () => (
    <section className="show_section">
      <ShowDetails
        info={info}
        currentShowType={currentShowType}
        isUserLoggedIn={isUserLoggedIn}
        updateLocation={updateLocation}
      />
      {createOtherMovies("recommendations", "recommended_movies")}
      {createOtherMovies("similar", "similar_movies")}
      <Videos
        info={info}
        homepageLoaded={homepageLoaded}
        setHomepageLoaded={setHomePageLoaded}
      />
    </section>
  );

  return (
    <section>
      <section className="show">
        {_.isEmpty(info) || info["status_code"] === 34 ? (
          <h2 className="invalid_query" data-testid="invalid_query">
            {"Invalid Show: Check The Your Search Query."}
          </h2>
        ) : (
          <ShowSection />
        )}
      </section>
    </section>
  );
};

export const Show = ({
  currentShowId,
  currentShow,
  currentShowType,
  homepageLoaded,
  setHomePageLoaded,
  isUserLoggedIn,
  updateLocation,
}) => {
  const [info, setShowInformation] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (currentShowId !== 0 && !_.isEmpty(currentShowType)) {
      return fetchShow(
        currentShowId,
        currentShowType,
        setShowInformation,
        setLoaded,
        setHomePageLoaded
      );
    }
  }, [currentShow, currentShowId, currentShowType, setHomePageLoaded]);

  return !loaded || !homepageLoaded ? (
    <Spinner loaded={loaded} />
  ) : (
    <Component
      info={info}
      currentShowType={currentShowType}
      setHomePageLoaded={setHomePageLoaded}
      homepageLoaded={homepageLoaded}
      isUserLoggedIn={isUserLoggedIn}
      updateLocation={updateLocation}
    />
  );
};
