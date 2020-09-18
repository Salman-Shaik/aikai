import _ from "lodash";
import React from "react";
import '../../../css/NavigationMenu.css'
import {list} from '../../../editorsChoice.json'
import {getRandomItem} from "../../../lib/helper";
import {fetchTopShow, fetchUserFavorites} from "../../../lib/networkCalls";
import {UserIcon} from "./UserIcon";
import {NavigationMenuItem} from "./NavigationMenuItem";
import {SearchBar} from "./SearchBar";

export const NavigationMenu = ({
                                   currentMenuItem, setCurrentMenuItem, setCurrentShow, setCurrentShowId, setIsUserLoggedIn,
                                   setCurrentShowType, setHomePageLoaded, isUserLoggedIn, setGotoLoginPage, setFavorites, setGotoRegisterPage
                               }) => {
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
            setFavorites(favorites);
            setHomePageLoaded(true);
        });
    }

    return <section className="navigation_menu">
        {createNavigationMenuItem("Random Movie", onRandomMovie)}
        {createNavigationMenuItem("Random TV", onRandomTv)}
        {createNavigationMenuItem("Top Rated Movie", onTopMovie)}
        {createNavigationMenuItem("Top Rated TV", onTopTv)}
        {createNavigationMenuItem("Editor's Choice", onEditorsChoice)}
        {createNavigationMenuItem("Favorites", onFavorites)}
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