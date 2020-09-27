import _ from "lodash";
import React from "react";
import {Favorites} from "./Favorites";
import {HomePage} from "./Homepage";
import {NowPlaying} from "./NowPlaying/NowPlaying";
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
        setCurrentMenuItem
    } = props;

    const isShowEmpty = _.isEmpty(currentShow);
    const isShowIdEmpty = currentShowId === 0;
    const isShowPresent = !isShowIdEmpty || !isShowEmpty;
    const isNowPlaying = _.isEqual(currentMenuItem, "Now Playing");
    const isFavorites = _.isEqual(currentMenuItem, "Favorites");

    const Component = () => {
        return <section>
            {isShowPresent
                ? <Show currentShowId={currentShowId}
                        currentShow={currentShow}
                        currentShowType={currentShowType}
                        isUserLoggedIn={isUserLoggedIn}
                        homepageLoaded={homepageLoaded}
                        setCurrentShow={setCurrentShow}
                        setCurrentShowType={setCurrentShowType}
                        setCurrentShowId={setCurrentShowId}
                        setHomePageLoaded={setHomePageLoaded}
                        setGotoLoginPage={setGotoLoginPage}
                        setCurrentMenuItem={setCurrentMenuItem}/>
                : <HomePage/>
            }
        </section>;
    }

    return <main className="main_container">
        {isFavorites
            ? <Favorites userFavorites={favorites}
                         setCurrentShowId={setCurrentShowId}
                         setHomePageLoaded={setHomePageLoaded}
                         setCurrentMenuItem={setCurrentMenuItem}/>
            : isNowPlaying
                ? <NowPlaying setCurrentShowType={setCurrentShowType}
                              setCurrentShowId={setCurrentShowId}
                              homepageLoaded={homepageLoaded}
                              setHomePageLoaded={setHomePageLoaded}/>
                : <Component/>}
    </main>;
};