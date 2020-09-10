import _ from 'lodash';
import React, {useState} from "react";
import '../css/Homepage.css'
import {NavigationMenu} from "./NavigationMenu/NavigationMenu";
import {NowPlaying} from "./NowPlaying/NowPlaying";
import {Show} from "./Show/Show";

export const Homepage = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState("");
    const [currentShow, setCurrentShow] = useState("");
    const [currentShowId, setCurrentShowId] = useState(0);
    const [currentShowType, setCurrentShowType] = useState("");
    const [homepageLoaded, setHomePageLoaded] = useState(false);

    const onIconClick = () => {
        setCurrentMenuItem("");
        setCurrentShow("");
        setCurrentShowId(0);
    }

    const isShowEmpty = _.isEmpty(currentShow);
    const isShowIdEmpty = currentShowId === 0;
    return (
        <div className="homepage">
            <header className="page_header">
                <h2 className="logo" onClick={onIconClick}>A.I.K.A.I</h2>
                <NavigationMenu currentMenuItem={currentMenuItem}
                                setCurrentMenuItem={setCurrentMenuItem}
                                setCurrentShow={setCurrentShow}
                                setCurrentShowId={setCurrentShowId}
                                setHomePageLoaded={setHomePageLoaded}/>
            </header>
            <main>
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
            </main>
        </div>
    )
}