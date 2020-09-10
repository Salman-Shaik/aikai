import React from "react";
import '../../css/MiniShow.css'
import {imageUrlBuilder} from "../../lib/helper";

export const MiniShow = ({posterPath, title, setCurrentShowId, setHomePageLoaded,id}) => {
    const onClick = () => {
        setHomePageLoaded(false);
        setCurrentShowId(id);
    }

    return <section className="mini_show" onClick={onClick}>
        <img className="mini_poster" src={imageUrlBuilder(posterPath)} alt={title} onClick={onClick}/>
        <h4 className="title" onClick={onClick}>{title}</h4>
    </section>
}