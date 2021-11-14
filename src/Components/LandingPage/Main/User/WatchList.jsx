import _ from "lodash";
import React, { useEffect, useState } from "react";
import "../../../../css/WatchList.css";
import { getSectionedMiniShows } from "../../../../lib/helper";
import { fetchWatchList } from "../../../../lib/networkCalls";
import { Spinner } from "../../../Spinner";
import { MinimizeActionButton } from "../MinimizeActionButton";
import { MiniShow } from "../Show/MiniShow";

export const WatchList = ({
  setHomePageLoaded,
  updateLocation,
  isUserLoggedIn,
}) => {
  const [watchList, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const [watchListMinimized, setWatchListMinimized] = useState(false);
  const [watchedMinimized, setWatchedMinimized] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const notice = "You Haven't Added Any Movie/Tv Show to your watchlist Yet.";

  useEffect(() => {
    if (!isUserLoggedIn) return updateLocation("/login");
    fetchWatchList(setWatchlist, setWatched, setLoaded, setHomePageLoaded);
  }, [isUserLoggedIn, setHomePageLoaded, updateLocation]);

  const minimizeWatchList = () => {
    setWatchListMinimized(!watchListMinimized);
    setWatchedMinimized(true);
  };

  const minimizeWatched = () => {
    setWatchedMinimized(!watchedMinimized);
    setWatchListMinimized(true);
  };

  const MiniShows = ({ list, flag }) => {
    const miniShowMap = list.map(({ posterPath, title, id }) => (
      <MiniShow
        posterPath={posterPath}
        title={title}
        id={id}
        setHomePageLoaded={setHomePageLoaded}
        updateLocation={updateLocation}
        watchListFlag={flag}
        isUserLoggedIn={isUserLoggedIn}
      />
    ));
    return getSectionedMiniShows(miniShowMap);
  };

  return !loaded ? (
    <Spinner loaded={loaded} />
  ) : (
    <section className="watchlist_section">
      <section className="yet_to_watch">
        <MinimizeActionButton
          minimizeMethod={minimizeWatchList}
          anchorText="Watchlist"
          minimized={watchListMinimized}
          className="minim_button"
        />
        {_.isEmpty(watchList) ? (
          <h2 className="notice">{notice}</h2>
        ) : (
          !watchListMinimized && <MiniShows list={watchList} flag={true} />
        )}
      </section>
      <section className="watched">
        <MinimizeActionButton
          minimizeMethod={minimizeWatched}
          anchorText="Watch History"
          minimized={watchedMinimized}
          className="minim_button"
        />
        {!_.isEmpty(watched) && !watchedMinimized && (
          <MiniShows list={watched} flag={false} />
        )}
      </section>
    </section>
  );
};
