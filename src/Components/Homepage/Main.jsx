import _ from "lodash";
import React from "react";
import {Favorites} from "./Favorites";
import {NowPlaying} from "./NowPlaying/NowPlaying";
import {Show} from "./Show/Show";

export const Main = (props) => {
    const {
        currentMenuItem, setCurrentShowType, setCurrentShowId, homepageLoaded, isUserLoggedIn, favorites,
        setHomePageLoaded, currentShowId, currentShow, currentShowType, setCurrentShow, setGotoLoginPage, setCurrentMenuItem
    } = props;
    const isShowEmpty = _.isEmpty(currentShow);
    const isShowIdEmpty = currentShowId === 0;

    const Component = () => <section>
        {(!isShowEmpty || !isShowIdEmpty)
            ? <Show currentShowId={currentShowId}
                    currentShow={currentShow}
                    currentShowType={currentShowType}
                    setCurrentShow={setCurrentShow}
                    setCurrentShowType={setCurrentShowType}
                    setCurrentShowId={setCurrentShowId}
                    homepageLoaded={homepageLoaded}
                    setHomePageLoaded={setHomePageLoaded}
                    isUserLoggedIn={isUserLoggedIn}
                    setGotoLoginPage={setGotoLoginPage}
                    setCurrentMenuItem={setCurrentMenuItem}/>
            : (_.isEmpty(currentMenuItem) &&
                 <NowPlaying setCurrentShowType={setCurrentShowType}
                            setCurrentShowId={setCurrentShowId}
                            homepageLoaded={homepageLoaded}
                            setHomePageLoaded={setHomePageLoaded}/>)
        }
    </section>

    return <main className="main_container">
        {currentMenuItem === "Favorites"
            ? <Favorites userFavorites={favorites}
                         setCurrentShowId={setCurrentShowId}
                         setHomePageLoaded={setHomePageLoaded}
                         setCurrentMenuItem={setCurrentMenuItem}/>
            : <Component/>}
    </main>;
};