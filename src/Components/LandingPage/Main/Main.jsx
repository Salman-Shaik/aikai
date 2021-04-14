import _ from "lodash";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { deleteCookie } from "../../../lib/helper";
import { AboutUs } from "./AboutUs";
import { DoubleShow } from "./DoubleShow";
import { DownloadApp } from "./DownloadApp";
import { EditorsChoice } from "./EditorsChoice";
import { Favorites } from "./Favorites";
import { HomePage } from "./Homepage/HomePage";
import { NotFound } from "./NotFound";
import { NowPlaying } from "./NowPlaying/NowPlaying";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { RefundPolicy } from "./RefundPolicy";
import { SearchResults } from "./Search/SearchResults";
import { Show } from "./Show/Show";
import { TermsAndConditions } from "./TermsAndConditions";
import { LoginPage } from "./User/LoginPage";
import { UserDetails } from "./User/UserDetails";
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
            render={() => (
              <UserDetails
                updateLocation={updateLocation}
                updateFlag={false}
                isUserLoggedIn={isUserLoggedIn}
                homepageLoaded={homepageLoaded}
                setHomePageLoaded={setHomePageLoaded}
              />
            )}
          />
          <Route
            path="/update_profile"
            render={() => (
              <UserDetails
                updateLocation={updateLocation}
                updateFlag={true}
                isUserLoggedIn={isUserLoggedIn}
                homepageLoaded={homepageLoaded}
                setHomePageLoaded={setHomePageLoaded}
              />
            )}
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
              <EditorsChoice
                currentShow={currentShow}
                updateLocation={updateLocation}
                isUserLoggedIn={isUserLoggedIn}
                setHomePageLoaded={setHomePageLoaded}
                homepageLoaded={homepageLoaded}
              />
            )}
          />
          <Route
            path="/terms_and_conditions"
            render={() => <TermsAndConditions />}
          />
          <Route path="/download_app" render={() => <DownloadApp />} />
          <Route path="/privacy_policy" render={() => <PrivacyPolicy />} />
          <Route path="/refund_policy" render={() => <RefundPolicy />} />
          <Route path="/about_us" render={() => <AboutUs />} />
          <Route path="/not-found" render={() => <NotFound />} />
          <Route path="/" render={() => <Component />} />
        </Switch>
      </Router>
    </main>
  );
};
