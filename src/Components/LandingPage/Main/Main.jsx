import _ from "lodash";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { list } from "../../../data/editorsChoice.json";
import { deleteCookie, getRandomItem } from "../../../lib/helper";
import { DoubleShow } from "./DoubleShow";
import { Favorites } from "./Favorites";
import { HomePage } from "./Homepage/HomePage";
import { NowPlaying } from "./NowPlaying/NowPlaying";
import { SearchResults } from "./Search/SearchResults";
import { Show } from "./Show/Show";
import { LoginPage } from "./User/LoginPage";
import { RegistrationPage } from "./User/RegistrationPage";
import { WatchList } from "./WatchList";

export const Main = (props) => {
  const {
    currentShow,
    currentShowId,
    isUserLoggedIn,
    setIsUserLoggedIn,
    currentShowType,
    homepageLoaded,
    setHomePageLoaded,
    updateLocation,
  } = props;

  const isShowEmpty = _.isEmpty(currentShow);
  const isShowIdEmpty = currentShowId === 0;
  const isShowPresent = !isShowIdEmpty || !isShowEmpty;
  const isMovie = _.isEqual(window.location.href, "/movies");
  const isTv = _.isEqual(window.location.href, "/tv_shows");
  const randomShow = getRandomItem(list);

  if (isMovie || isTv) {
    deleteCookie("showType");
  }

  if (_.isEqual(window.location.href, "/")) {
    deleteCookie("showType");
    deleteCookie("show");
    deleteCookie("showId");
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
            setHomePageLoaded={setHomePageLoaded}
            updateLocation={updateLocation}
          />
        ) : (
          <HomePage updateLocation={updateLocation} />
        )}
      </section>
    );
  };
  return (
    <main className="main_container">
      <Router>
        <Switch>
          <Route
            path="/login"
            render={() => (
              <LoginPage
                setIsUserLoggedIn={setIsUserLoggedIn}
                updateLocation={updateLocation}
              />
            )}
          />
          <Route
            path="/register"
            render={() => <RegistrationPage updateLocation={updateLocation} />}
          />
          <Route
            path="/favorite_shows"
            render={() => (
              <Favorites
                setHomePageLoaded={setHomePageLoaded}
                updateLocation={updateLocation}
                isUserLoggedIn={isUserLoggedIn}
              />
            )}
          />
          <Route
            path="/watch_list"
            render={() => (
              <WatchList
                setHomePageLoaded={setHomePageLoaded}
                updateLocation={updateLocation}
                isUserLoggedIn={isUserLoggedIn}
              />
            )}
          />
          <Route
            path="/now_playing"
            render={() => (
              <NowPlaying
                homepageLoaded={homepageLoaded}
                setHomePageLoaded={setHomePageLoaded}
                updateLocation={updateLocation}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <SearchResults
                currentShowTitle={currentShow}
                homepageLoaded={homepageLoaded}
                setHomePageLoaded={setHomePageLoaded}
                updateLocation={updateLocation}
              />
            )}
          />
          <Route
            path="/movies"
            render={() => (
              <DoubleShow
                currentShowId={currentShowId}
                currentShow={currentShow}
                currentShowType={currentShowType}
                isUserLoggedIn={isUserLoggedIn}
                homepageLoaded={homepageLoaded}
                setHomePageLoaded={setHomePageLoaded}
                updateLocation={updateLocation}
                type="movie"
              />
            )}
          />
          <Route
            path="/tv_shows"
            render={() => (
              <DoubleShow
                currentShowId={currentShowId}
                currentShow={currentShow}
                currentShowType={currentShowType}
                isUserLoggedIn={isUserLoggedIn}
                homepageLoaded={homepageLoaded}
                setHomePageLoaded={setHomePageLoaded}
                updateLocation={updateLocation}
                type="tv"
              />
            )}
          />
          <Route
            path="/editors_choice"
            render={() => (
              <Show
                currentShowId={randomShow.id}
                currentShow={currentShow}
                currentShowType={randomShow.type}
                isUserLoggedIn={isUserLoggedIn}
                homepageLoaded={homepageLoaded}
                setHomePageLoaded={setHomePageLoaded}
                updateLocation={updateLocation}
              />
            )}
          />
          <Route path="/" render={() => <Component />} />
        </Switch>
      </Router>
    </main>
  );
};
