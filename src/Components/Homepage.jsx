import React, {useState} from "react";
import {NavigationMenu} from "./NavigationMenu";
import {NavigationMenuItem} from "./NavigationMenuItem";
import {SearchBar} from "./SearchBar";
import '../css/Homepage.css'

export const Homepage = () => {

    let [currentMenuItem, setCurrentMenuItem] = useState("");
    return (
        <div className="homepage">
            <header className="page_header">
                <h2 className="logo">A.I.K.A.I</h2>
                <NavigationMenu currentMenuItem={currentMenuItem} setCurrentMenuItem={setCurrentMenuItem}/>
            </header>
            <main></main>
        </div>
    )
}