import _ from "lodash";
import React, { useEffect, useState } from "react";
import "../../../css/Favorites.css";
import { getSectionedMiniShows } from "../../../lib/helper";
import { fetchUserFavorites } from "../../../lib/networkCalls";
import { Spinner } from "../../Spinner";
import { MiniShow } from "./Show/MiniShow";

export const Favorites = ({
  setHomePageLoaded,
  updateLocation,
  isUserLoggedIn,
}) => {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isUserLoggedIn) return updateLocation("/login");
    fetchUserFavorites()
      .then((fav) => {
        setFavorites(fav);
        setHomePageLoaded(true);
        setLoaded(true);
      })
      .catch((e) => new TypeError(e));
  }, []);

  const MiniShows = () => {
    const miniShowMap = favorites.map(({ posterPath, title, id }) => (
      <MiniShow
        posterPath={posterPath}
        title={title}
        id={id}
        setHomePageLoaded={setHomePageLoaded}
        updateLocation={updateLocation}
        favFlag={true}
        isUserLoggedIn={isUserLoggedIn}
      />
    ));
    return getSectionedMiniShows(miniShowMap);
  };

  return !loaded ? (
    <Spinner loaded={loaded} />
  ) : (
    <section className="favorites_section">
      {_.isEmpty(favorites) ? (
        <h2 className="notice">You Haven't Liked Any Movie/Tv Show Yet</h2>
      ) : (
        <MiniShows />
      )}
    </section>
  );
};
