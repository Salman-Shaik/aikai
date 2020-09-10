import React from "react";
import '../../css/NavigationMenu.css'
import {NavigationMenuItem} from "./NavigationMenuItem";
import {SearchBar} from "./SearchBar";

export const NavigationMenu = ({currentMenuItem, setCurrentMenuItem, setCurrentShow, setCurrentShowId, setHomePageLoaded}) => {
    const createNavigationMenuItem = (name) => <NavigationMenuItem name={name} currentMenuItem={currentMenuItem}
                                                                   setCurrentMenuItem={setCurrentMenuItem}/>
    return <section className="navigation_menu">
        {createNavigationMenuItem("Random Movie")}
        {createNavigationMenuItem("Random TV Show")}
        {createNavigationMenuItem("Editor's Choice")}
        <SearchBar setCurrentShow={setCurrentShow}
                   setCurrentShowId={setCurrentShowId}
                   setHomePageLoaded={setHomePageLoaded}/>
    </section>
}