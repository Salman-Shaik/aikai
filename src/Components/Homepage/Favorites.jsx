import _ from 'lodash';
import React from "react";
import '../../css/Favorite.css';
import {getFive} from "../../lib/helper";
import {MiniShow} from "./Show/MiniShow";

const Section = ({miniShows}) => {
    return <section className="sectioned_shows">{miniShows}</section>;
}

const getSectionedMiniShows = map => {
    const sectionedMap = []
    for (let i = 0; i < map.length; i += 5) sectionedMap.push(<Section miniShows={getFive(map, i)}/>);
    return sectionedMap;
}

export const Favorites = ({userFavorites, setCurrentShowId, setHomePageLoaded,setCurrentMenuItem}) => {
    const MiniShows = () => {
        const miniShowMap = userFavorites.map(({posterPath, title, id}) => <MiniShow posterPath={posterPath}
                                                                                     title={title} id={id}
                                                                                     setCurrentShowId={setCurrentShowId}
                                                                                     setHomePageLoaded={setHomePageLoaded}
                                                                                     setCurrentMenuItem={setCurrentMenuItem}/>);
        return getSectionedMiniShows(miniShowMap);
    }
    return <section className="favorites_section">
        {_.isEmpty(userFavorites)
            ? <h2 className="notice">You Haven't Liked Any Movie/Tv Show Yet</h2>
            : <MiniShows/>}
    </section>
}