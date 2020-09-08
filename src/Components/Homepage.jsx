import React, {useState} from "react";
import {NavigationMenu} from "./NavigationMenu/NavigationMenu";
import {NowPlaying} from "./NowPlaying/NowPlaying";
import '../css/Homepage.css'

export const Homepage = () => {
    let [currentMenuItem, setCurrentMenuItem] = useState("");
    const onIconClick = () => {
        setCurrentMenuItem("");
    }

    return (
        <div className="homepage">
            <header className="page_header">
                <h2 className="logo" onClick={onIconClick}>A.I.K.A.I</h2>
                <NavigationMenu currentMenuItem={currentMenuItem} setCurrentMenuItem={setCurrentMenuItem}/>
            </header>
            <main>
                <NowPlaying />
            </main>
        </div>
    )
}