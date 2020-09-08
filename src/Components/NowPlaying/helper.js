import React from "react";
import {Poster} from "./Poster";

const filterPosterPaths = item => {
    return !!item["poster_path"];
};

export const createPosters = (rawJson) => {
    const filteredList = rawJson.filter(filterPosterPaths);
    return filteredList.map((item, index) => <Poster data={item} key={index}/>);
};