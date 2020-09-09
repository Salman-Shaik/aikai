import _ from 'lodash';
import React, {useEffect, useState} from "react";
import {fetchOtherShow} from "../../lib/networkCalls";
import {Spinner} from "../Spinner";
import {MiniShow} from "./MiniShow";

const createMiniShows = (shows, setCurrentShow) => {
    return shows.map((show, index) => {
        const posterPath = show["poster_path"];
        const title = show.title || show.name;
        return <MiniShow posterPath={posterPath} title={title} setCurrentShow={setCurrentShow} key={index}/>;
    });
};

const Component = ({className, otherShows, keyword, currentShowType, setCurrentShow}) => {
    return <section className={className}>
        <h3 className="section_title">{_.capitalize(keyword)}</h3>
        {_.isEmpty(otherShows)
            ? <h4 className="empty">{`No ${_.capitalize(keyword)} ${_.capitalize(currentShowType)}s`}</h4>
            : <section className="mini_shows">{createMiniShows(otherShows, setCurrentShow)}</section>}
    </section>;
};

export const OtherShows = ({keyword, className, showId, currentShowType, setCurrentShow}) => {
    const [otherShows, setOtherShows] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => fetchOtherShow(currentShowType, showId, keyword, setOtherShows, setLoaded), [currentShowType, keyword, showId])

    return !loaded ? <Spinner/> :
        <Component className={className} otherShows={otherShows} keyword={keyword} currentShowType={currentShowType}
                   setCurrentShow={setCurrentShow}/>;
}