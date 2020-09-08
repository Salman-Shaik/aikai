import React from "react";
import '../../css/Poster.css';

export const Poster = ({data,key}) => {
    let title = data["original_name"] || data["original_title"];

    return <section>
        <img src={`https://image.tmdb.org/t/p/original${data["poster_path"]}`} alt={title} className="poster" key={key}/>
    </section>
}