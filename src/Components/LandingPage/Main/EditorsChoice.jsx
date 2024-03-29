import React, { useEffect, useState } from "react";
import { getRandomSuggestion } from "../../../lib/helper";
import { Show } from "./Show/Show";
import { list } from "../../../data/editorsChoice.json";

export const EditorsChoice = ({
  currentShow,
  isUserLoggedIn,
  homepageLoaded,
  setHomePageLoaded,
  updateLocation,
  country,
}) => {
  const [randomShow, setRandomShow] = useState({});
  useEffect(() => {
    const randomItem = getRandomSuggestion(list);
    setRandomShow(randomItem);
  }, []);

  return (
    <Show
      currentShowId={randomShow.id}
      currentShow={currentShow}
      currentShowType={randomShow.type}
      isUserLoggedIn={isUserLoggedIn}
      homepageLoaded={homepageLoaded}
      setHomePageLoaded={setHomePageLoaded}
      updateLocation={updateLocation}
      country={country}
    />
  );
};
