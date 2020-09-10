import React from "react";
import '../../css/NavigationMenu.css'
import {list} from '../../editorsChoice.json'
import {getRandomItem} from "../../lib/helper";
import {fetchTopMovie, fetchTopTv} from "../../lib/networkCalls";
import {NavigationMenuItem} from "./NavigationMenuItem";
import {SearchBar} from "./SearchBar";

export const NavigationMenu = ({currentMenuItem, setCurrentMenuItem, setCurrentShow, setCurrentShowId, setCurrentShowType, setHomePageLoaded}) => {
    const createNavigationMenuItem = (name, onclick) => <NavigationMenuItem name={name}
                                                                            currentMenuItem={currentMenuItem}
                                                                            setCurrentMenuItem={setCurrentMenuItem}
                                                                            setHomePageLoaded={setHomePageLoaded}
                                                                            onclick={onclick}/>
    const onEditorsChoice = () => {
        const randomShow = getRandomItem(list);
        setCurrentShowType("");
        setCurrentShowId(0);
        setCurrentShow(randomShow);
    }
    const onTopTv = () => fetchTopTv(setCurrentShowId, setCurrentShowType, setHomePageLoaded)
    const onTopMovie = () => fetchTopMovie(setCurrentShowId, setCurrentShowType, setHomePageLoaded)

    return <section className="navigation_menu">
        {createNavigationMenuItem("Random Movie")}
        {createNavigationMenuItem("Random TV")}
        {createNavigationMenuItem("Top Rated Movie", onTopMovie)}
        {createNavigationMenuItem("Top Rated TV", onTopTv)}
        {createNavigationMenuItem("Editor's Choice", onEditorsChoice)}
        <SearchBar setCurrentShow={setCurrentShow}
                   setCurrentShowId={setCurrentShowId}
                   setHomePageLoaded={setHomePageLoaded}/>
    </section>
}