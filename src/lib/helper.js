import _ from 'lodash';
import React from "react";
import {Poster} from "../Components/NowPlaying/Poster";
import {genres} from "../genres.json"

const filterPosterPaths = item => {
    return !!item["poster_path"];
};

export const createPosters = (rawJson, setCurrentShowId, setCurrentShowType,setHomePageLoaded) => {
    const filteredList = rawJson.filter(filterPosterPaths);
    return filteredList.map((item, index) => <Poster data={item} key={index} setCurrentShowId={setCurrentShowId}
                                                     setCurrentShowType={setCurrentShowType} setHomePageLoaded={setHomePageLoaded}/>);
};

export const refineShowResults = (results, title) => {
    let movieInfo = results.find(result => {
        const showName = result.title || result.name;
        return showName.includes(title);
    });
    return !!movieInfo ? movieInfo : results[0];
};

export const imageUrlBuilder = (imageName) => `https://image.tmdb.org/t/p/original${imageName}`;

export const getGenreNames = (info, showType) => {
    const genre = !!info.genres && info.genres.map(g => g.name);
    const ids = info["genre_ids"];
    if (!_.isEmpty(genre)) return genre.join(", ");
    if (_.isEmpty(ids)) return "";
    const showGenres = genres[showType]
    return ids.map(id => showGenres.find(sg => sg.id === id).name).join(", ");
}

export const getFirstFour = res => {
    return res.slice(0, 4);
};

export const capitalize = s => _.snakeCase(s).split(`_`).map(x => _.capitalize(x)).join(` `);

export const handlePerfectShowPromises = (promises, title, setShowInformation, setLoaded, setCurrentShowType, setCurrentShowId,setHomePageLoaded) => {
    let result;
    const findPerfectShow = (val, title) => {
        const name = val.name || val.title;
        return name === capitalize(title);
    };
    const setPerfectShow = values => {
        result = values.filter(v => !_.isEmpty(v)).find(val => findPerfectShow(val, title));
        if (_.isEmpty(result)) result = values[0];
        setCurrentShowType(values.indexOf(result) === 0 ? "movie" : "tv")
        setShowInformation(result);
        setCurrentShowId((!!result && result.id) || 0);
        setHomePageLoaded(true)
        setLoaded(true);
    };
    Promise.all(promises).then(setPerfectShow);
};