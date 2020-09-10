import _ from 'lodash';
import React, {useState} from "react";
import '../css/Homepage.css'
import {NavigationMenu} from "./NavigationMenu/NavigationMenu";
import {NowPlaying} from "./NowPlaying/NowPlaying";
import {Show} from "./Show/Show";

export const Homepage = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState("");
    const [currentShow, setCurrentShow] = useState("");
    const [currentShowType, setCurrentShowType] = useState("");
    const onIconClick = () => {
        setCurrentMenuItem("");
        setCurrentShow("");
    }

    return (
        <div className="homepage">
            <header className="page_header">
                <h2 className="logo" onClick={onIconClick}>A.I.K.A.I</h2>
                <NavigationMenu currentMenuItem={currentMenuItem} setCurrentMenuItem={setCurrentMenuItem} setCurrentShow={setCurrentShow} setCurrentShowType={setCurrentShowType}/>
            </header>
            <main>
                {(_.isEmpty(currentMenuItem) && _.isEmpty(currentShow)) &&
                <NowPlaying setCurrentShow={setCurrentShow} setCurrentShowType={setCurrentShowType}/>}
                {!_.isEmpty(currentShow) &&
                <Show currentShow={currentShow} currentShowType={currentShowType} setCurrentShow={setCurrentShow} setCurrentShowType={setCurrentShowType}/>}
            </main>
        </div>
    )
}