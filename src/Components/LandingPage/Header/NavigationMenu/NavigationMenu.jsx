import Tooltip from "@material-ui/core/Tooltip";
import Favorite from "@material-ui/icons/Favorite";
import PlayArrow from "@material-ui/icons/PlayArrow";
import _ from "lodash";
import React from "react";
import '../../../../css/NavigationMenu.css'
import {list} from '../../../../editorsChoice.json'
import {getRandomItem} from "../../../../lib/helper";
import {fetchTopShow, fetchUserFavorites} from "../../../../lib/networkCalls";
import {NavigationMenuItem} from "./NavigationMenuItem";
import {SearchBar} from "./SearchBar";
import {UserIcon} from "./UserIcon";

export const NavigationMenu = (props) => {
    const {
        currentMenuItem,
        isUserLoggedIn,
        setCurrentMenuItem,
        setCurrentShow,
        setCurrentShowId,
        setIsUserLoggedIn,
        setCurrentShowType,
        setHomePageLoaded,
        setGotoLoginPage,
        setFavorites,
        setGotoRegisterPage
    } = props;

    const createNavigationMenuItem = (name, onclick) => <NavigationMenuItem name={name}
                                                                            currentMenuItem={currentMenuItem}
                                                                            setCurrentMenuItem={setCurrentMenuItem}
                                                                            setHomePageLoaded={setHomePageLoaded}
                                                                            onclick={onclick}/>

    const setUserPagesOff = () => {
        setGotoLoginPage(false);
        setGotoRegisterPage(false);
    };

    const onEditorsChoice = () => {
        setUserPagesOff();
        const randomShow = getRandomItem(list);
        setCurrentShowType("");
        setCurrentShowId(0);
        setCurrentShow(randomShow);
        setHomePageLoaded(true);
    }

    const onTopTv = () => {
        setUserPagesOff();
        const pageNumber = _.random(1, 21);
        fetchTopShow(setCurrentShowId, setCurrentShowType, setHomePageLoaded, pageNumber, "tv");
    }

    const onTopMovie = () => {
        setUserPagesOff();
        const pageNumber = _.random(1, 21);
        fetchTopShow(setCurrentShowId, setCurrentShowType, setHomePageLoaded, pageNumber, "movie");
    }

    const onRandomTv = () => {
        setUserPagesOff();
        const pageNumber = _.random(1, 60);
        fetchTopShow(setCurrentShowId, setCurrentShowType, setHomePageLoaded, pageNumber, "tv");
    }

    const onRandomMovie = () => {
        setUserPagesOff();
        const pageNumber = _.random(1, 389);
        fetchTopShow(setCurrentShowId, setCurrentShowType, setHomePageLoaded, pageNumber, "movie");
    }

    const onFavorites = () => {
        setGotoRegisterPage(false);
        if (!isUserLoggedIn) return setGotoLoginPage(true);
        fetchUserFavorites().then((favorites) => {
            setCurrentMenuItem("Favorites");
            setFavorites(favorites);
            setHomePageLoaded(true);
        });
    }

    const onNowPlaying = () => {
        setCurrentMenuItem("Now Playing");
        setUserPagesOff();
    };

    return <section className="navigation_menu">
        <Tooltip title="Now Playing"><PlayArrow className="play_icon" onClick={onNowPlaying}/></Tooltip>
        {createNavigationMenuItem("Random Movie", onRandomMovie)}
        {createNavigationMenuItem("Random TV", onRandomTv)}
        {createNavigationMenuItem("Top Rated Movie", onTopMovie)}
        {createNavigationMenuItem("Top Rated TV", onTopTv)}
        {createNavigationMenuItem("Editor's Choice", onEditorsChoice)}
        <Tooltip title="Favorites"><Favorite className="favorites_icon" onClick={onFavorites}/></Tooltip>
        <SearchBar setCurrentShow={setCurrentShow}
                   setCurrentShowId={setCurrentShowId}
                   setHomePageLoaded={setHomePageLoaded}/>
        <UserIcon isUserLoggedIn={isUserLoggedIn}
                  setGotoLoginPage={setGotoLoginPage}
                  setHomePageLoaded={setHomePageLoaded}
                  setIsUserLoggedIn={setIsUserLoggedIn}
                  setCurrentMenuItem={setCurrentMenuItem}/>
    </section>
}