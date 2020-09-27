import React, {useEffect, useState} from "react";
import '../../../../css/NowPlaying.css'
import {fetchAiringTVShows, fetchPlayingMovies} from "../../../../lib/showNetworkCalls";
import {Spinner} from "../../../Spinner";
import {PlayingShows} from "./PlayingShows";

const Component = ({playingMovies, airingTvShows, setCurrentShowId, setCurrentShowType, setHomePageLoaded}) => {
    const createPlayingShows = (data, className, type) => <PlayingShows data={data}
                                                                        setCurrentShowId={setCurrentShowId}
                                                                        className={className}
                                                                        setCurrentShowType={() => setCurrentShowType(type)}
                                                                        setHomePageLoaded={setHomePageLoaded}/>;

    return <section className="now_playing">
        <h2 className="sub_header">Now Playing - Movies</h2>
        <h5 className="note">**RESULTS CAN BE UNRELAVENT DUE TO ONGOING PANDEMIC**</h5>
        {createPlayingShows(playingMovies, "playing_movies", "movies")}
        <h2 className="sub_header">Now Airing - TV Shows</h2>
        {createPlayingShows(airingTvShows, "airing_shows", "tv")}
    </section>;
}

export const NowPlaying = ({setCurrentShowType, setCurrentShowId, homepageLoaded, setHomePageLoaded}) => {
    const [playingMovies, setPlayingMovies] = useState([]);
    const [airingTvShows, setAiringTvShows] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchPlayingMovies(setPlayingMovies);
        fetchAiringTVShows(setAiringTvShows, setLoaded, setHomePageLoaded);
    }, [setHomePageLoaded]);

    return (!loaded || !homepageLoaded)
        ? <Spinner loaded={loaded}/>
        : <Component playingMovies={playingMovies}
                     airingTvShows={airingTvShows}
                     setCurrentShowId={setCurrentShowId}
                     setCurrentShowType={setCurrentShowType}
                     setHomePageLoaded={setHomePageLoaded}/>
}