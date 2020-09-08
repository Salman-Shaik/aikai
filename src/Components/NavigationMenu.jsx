import React from "react";
import {NavigationMenuItem} from "./NavigationMenuItem";
import {SearchBar} from "./SearchBar";
import '../css/NavigationMenu.css'

export const NavigationMenu = ({currentMenuItem,setCurrentMenuItem}) => {
    const createNavigationMenuItem = (name) => <NavigationMenuItem name={name} currentMenuItem={currentMenuItem}
                                                                   setCurrentMenuItem={setCurrentMenuItem}/>
    return <section className="navigation_menu">
        {createNavigationMenuItem("Random Movie")}
        {createNavigationMenuItem("Random TV Show")}
        {createNavigationMenuItem("Latest")}
        {createNavigationMenuItem("Editor's Choice")}
        <SearchBar/>
    </section>
}