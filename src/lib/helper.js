import React from "react";
import {genres} from "../genres.json"
import {Poster} from "../Components/NowPlaying/Poster";

const filterPosterPaths = item => {
    return !!item["poster_path"];
};

export const createPosters = (rawJson, setCurrentShow, setCurrentShowType) => {
    const filteredList = rawJson.filter(filterPosterPaths);
    return filteredList.map((item, index) => <Poster data={item} key={index} setCurrentShow={setCurrentShow}
                                                     setCurrentShowType={setCurrentShowType}/>);
};

export const refineShowResults = (results, title) => {
    let movieInfo = results.find(result => {
        const showName = result.title || result.name;
        return showName.includes(title);
    });
    return !!movieInfo ? movieInfo : results[0];
};

export const imageUrlBuilder = (imageName) => `https://image.tmdb.org/t/p/original${imageName}`;

export const getGenreNames = (ids, showType) => {
    const showGenres = genres[showType]
    return ids.map(id => showGenres.find(sg => sg.id === id).name).join(", ");
}

export const getFirstFour = res => {
    return res.slice(0, 4);
};