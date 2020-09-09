import React from "react";
import '../../css/Poster.css';
import {imageUrlBuilder} from "../../lib/helper";

export const Poster = ({data,key,setCurrentShow,setCurrentShowType}) => {
    let title = data.name || data.title;
    const onClick = ({target}) => {
        let title = target.alt;
        setCurrentShow(title);
        setCurrentShowType();
    }
    return <section>
        <img src={imageUrlBuilder(data["poster_path"])} alt={title} className="poster" key={key} onClick={onClick}/>
    </section>
}