import _ from "lodash";
import React from "react";
import {DoubleShow} from "./DoubleShow";
import {Favorites} from "./Favorites";
import {HomePage} from "./Homepage/HomePage";
import {NowPlaying} from "./NowPlaying/NowPlaying";
import {SearchResults} from "./Search/SearchResults";
import {Show} from "./Show/Show";

export const Main = (props) => {
  const {
    favorites,
    currentShow,
    currentShowId,
    isUserLoggedIn,
    currentMenuItem,
    currentShowType,
    homepageLoaded,
    setCurrentShow,
    setCurrentShowId,
    setCurrentShowType,
    setHomePageLoaded,
    setGotoLoginPage,
    setCurrentMenuItem,
  } = props;

  const isShowEmpty = _.isEmpty(currentShow);
  const isShowIdEmpty = currentShowId === 0;
  const isShowPresent = !isShowIdEmpty || !isShowEmpty;
  const isNowPlaying = _.isEqual(currentMenuItem, "Now Playing");
  const isFavorites = _.isEqual(currentMenuItem, "Favorites");
  const isSearch = _.isEqual(currentMenuItem, "Search");
  const isMovie = _.isEqual(currentMenuItem, "movie");
  const isTv = _.isEqual(currentMenuItem, "tv");
  if (isMovie || isTv) {
    setCurrentShowType("");
  }
  const Component = () => {
    return (
      <section>
        {isShowPresent ? (
          <Show
            currentShowId={currentShowId}
            currentShow={currentShow}
            currentShowType={currentShowType}
            isUserLoggedIn={isUserLoggedIn}
            homepageLoaded={homepageLoaded}
            setCurrentShow={setCurrentShow}
            setCurrentShowType={setCurrentShowType}
            setCurrentShowId={setCurrentShowId}
            setHomePageLoaded={setHomePageLoaded}
            setGotoLoginPage={setGotoLoginPage}
            setCurrentMenuItem={setCurrentMenuItem}
          />
        ) : (
          <HomePage setCurrentMenuItem={setCurrentMenuItem}/>
        )}
      </section>
    );
  };

  return (
    <main className="main_container">
      {isFavorites ? (
        <Favorites
          userFavorites={favorites}
          setCurrentShowId={setCurrentShowId}
          setHomePageLoaded={setHomePageLoaded}
          setCurrentMenuItem={setCurrentMenuItem}
          setGotoLoginPage={setGotoLoginPage}
          isUserLoggedIn={isUserLoggedIn}
        />
      ) : isNowPlaying ? (
        <NowPlaying
          setCurrentShowType={setCurrentShowType}
          setCurrentShowId={setCurrentShowId}
          homepageLoaded={homepageLoaded}
          setHomePageLoaded={setHomePageLoaded}
        />
      ) : isSearch ? (
        <SearchResults
          currentShowTitle={currentShow}
          setCurrentShowId={setCurrentShowId}
          setCurrentShowType={setCurrentShowType}
          homepageLoaded={homepageLoaded}
          setHomePageLoaded={setHomePageLoaded}
          setCurrentMenuItem={setCurrentMenuItem}
        />
      ) : (isMovie || isTv) ?
        <DoubleShow currentShowId={currentShowId}
                    currentShow={currentShow}
                    currentShowType={currentShowType}
                    isUserLoggedIn={isUserLoggedIn}
                    homepageLoaded={homepageLoaded}
                    setCurrentShow={setCurrentShow}
                    setCurrentShowType={setCurrentShowType}
                    setCurrentShowId={setCurrentShowId}
                    setHomePageLoaded={setHomePageLoaded}
                    setGotoLoginPage={setGotoLoginPage}
                    setCurrentMenuItem={setCurrentMenuItem}
                    type={currentMenuItem}/> : (
          <Component/>
        )}
    </main>
  );
};
