import React, {useState} from "react";
import {NavigationMenuItem} from "./NavigationMenuItem";
import {SearchBar} from "./SearchBar";
import '../css/Homepage.css'

export const Homepage = () => {

    let [currentMenuItem, setCurrentMenuItem] = useState("");
    const createNavigationMenuItem = (name) => <NavigationMenuItem name={name} currentMenuItem={currentMenuItem}
                                                                   setCurrentMenuItem={setCurrentMenuItem}/>
    return (
        <div className="homepage">
            <header className="page_header">
                <h2 className="logo">A.I.K.A.I</h2>
                <section className="navigation_menu">
                    {createNavigationMenuItem("Random Movie")}
                    {createNavigationMenuItem("Random TV Show")}
                    {createNavigationMenuItem("Latest")}
                    {createNavigationMenuItem("Editor's Choice")}
                    <SearchBar/>
                </section>
            </header>
            <main></main>
        </div>
    )
}