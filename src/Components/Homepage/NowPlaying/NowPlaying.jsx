import React, {useEffect, useState} from "react";
import '../../../css/NowPlaying.css'
import {fetchAiringTVShows, fetchPlayingMovies} from "../../../lib/networkCalls";
import {Spinner} from "../../Spinner";
import {AiringShows} from "./AiringShows";
import {PlayingMovies} from "./PlayingMovies";

const Component = ({playingMovies, airingTvShows, setCurrentShowId, setCurrentShowType, setHomePageLoaded}) =>
    <section className="now_playing">
        <h2 className="sub_header">Now Playing - Movies</h2>
        <h5 className="note">**RESULTS CAN BE UNRELAVENT DUE TO ONGOING PANDEMIC**</h5>
        <PlayingMovies data={playingMovies}
                       setCurrentShowId={setCurrentShowId}
                       setCurrentShowType={() => setCurrentShowType("movie")} setHomePageLoaded={setHomePageLoaded}/>
        <h2 className="sub_header">Now Airing - TV Shows</h2>
        <AiringShows data={airingTvShows}
                     setCurrentShowId={setCurrentShowId}
                     setCurrentShowType={() => setCurrentShowType("tv")} setHomePageLoaded={setHomePageLoaded}/>
    </section>

export const NowPlaying = ({setCurrentShowType, setCurrentShowId, homepageLoaded, setHomePageLoaded}) => {
    const [playingMovies, setPlayingMovies] = useState([]);
    const [airingTvShows, setAiringTvShows] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchPlayingMovies(setPlayingMovies);
        fetchAiringTVShows(setAiringTvShows, setLoaded, setHomePageLoaded);
    }, [setHomePageLoaded]);

    return (!loaded || !homepageLoaded) ? <Spinner loaded={loaded}/> : <Component playingMovies={playingMovies}
                                                                                  airingTvShows={airingTvShows}
                                                                                  setCurrentShowId={setCurrentShowId}
                                                                                  setCurrentShowType={setCurrentShowType}
                                                                                  setHomePageLoaded={setHomePageLoaded}/>
}