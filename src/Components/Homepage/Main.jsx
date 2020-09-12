import _ from "lodash";
import React from "react";
import {NowPlaying} from "./NowPlaying/NowPlaying";
import {Show} from "./Show/Show";

export const Main = ({
                         currentMenuItem, setCurrentShowType, setCurrentShowId, homepageLoaded,
                         setHomePageLoaded, currentShowId, currentShow, currentShowType, setCurrentShow
                     }) => {
    const isShowEmpty = _.isEmpty(currentShow);
    const isShowIdEmpty = currentShowId === 0;

    return <main className="main_container">
        {(_.isEmpty(currentMenuItem) && isShowEmpty && isShowIdEmpty) &&
        <NowPlaying setCurrentShowType={setCurrentShowType}
                    setCurrentShowId={setCurrentShowId}
                    homepageLoaded={homepageLoaded}
                    setHomePageLoaded={setHomePageLoaded}/>}
        {(!isShowEmpty || !isShowIdEmpty) &&
        <Show currentShowId={currentShowId}
              currentShow={currentShow}
              currentShowType={currentShowType}
              setCurrentShow={setCurrentShow}
              setCurrentShowType={setCurrentShowType}
              setCurrentShowId={setCurrentShowId}
              homepageLoaded={homepageLoaded}
              setHomePageLoaded={setHomePageLoaded}/>}
    </main>;
};