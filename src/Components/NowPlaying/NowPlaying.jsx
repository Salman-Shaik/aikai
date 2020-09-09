import React, {useEffect, useState} from "react";
import '../../css/NowPlaying.css'
import {fetchAiringTVShows, fetchPlayingMovies} from "../../lib/networkCalls";
import {Spinner} from "../Spinner";
import {AiringShows} from "./AiringShows";
import {PlayingMovies} from "./PlayingMovies";

const Component = ({playingMovies, airingTvShows, setCurrentShow, setCurrentShowType}) => <section
    className="now_playing">
    <h2 className="sub_header">Now Playing - Movies</h2>
    <PlayingMovies data={playingMovies}
                   setCurrentShow={setCurrentShow}
                   setCurrentShowType={() => setCurrentShowType("movie")}/>
    <h2 className="sub_header">Now Airing - TV Shows</h2>
    <AiringShows data={airingTvShows}
                 setCurrentShow={setCurrentShow}
                 setCurrentShowType={() => setCurrentShowType("tv")}/>
</section>

export const NowPlaying = ({setCurrentShow, setCurrentShowType}) => {
    const [playingMovies, setPlayingMovies] = useState([]);
    const [airingTvShows, setAiringTvShows] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetchPlayingMovies(setPlayingMovies);
        fetchAiringTVShows(setAiringTvShows, setLoaded);
    }, []);

    return !loaded ? <Spinner loaded={loaded}/> : <Component playingMovies={playingMovies}
                                                            airingTvShows={airingTvShows}
                                                            setCurrentShow={setCurrentShow}
                                                            setCurrentShowType={setCurrentShowType}/>
}