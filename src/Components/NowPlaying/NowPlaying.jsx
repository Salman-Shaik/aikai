import React, {useEffect, useState} from "react";
import '../../css/NowPlaying.css'
import {fetchAiringTVShows, fetchPlayingMovies} from "../../lib/networkCalls";
import {Spinner} from "../Spinner";
import {AiringShows} from "./AiringShows";
import {PlayingMovies} from "./PlayingMovies";

const Component = ({playingMovies, airingTvShows}) => <section className="now_playing">
    <h2 className="sub_header">Now Playing - Movies</h2>
    <PlayingMovies data={playingMovies}/>
    <h2 className="sub_header">Now Airing - TV Shows</h2>
    <AiringShows data={airingTvShows}/>
</section>

export const NowPlaying = () => {
    let [playingMovies, setPlayingMovies] = useState([]);
    let [airingTvShows, setAiringTvShows] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let url = "https://api.themoviedb.org/3/movie/now_playing?api_key=8f38dc176aea0ef9cbb167f50a8fc9b2&language=en-IN&region=IN";
        let tvUrl = "https://api.themoviedb.org/3/tv/on_the_air?api_key=8f38dc176aea0ef9cbb167f50a8fc9b2&language=en-IN";
        fetchPlayingMovies(url, setPlayingMovies, setIsLoading);
        fetchAiringTVShows(tvUrl, setAiringTvShows, setIsLoading);
    }, [])

    return isLoading ? <Spinner/> : <Component playingMovies={playingMovies} airingTvShows={airingTvShows}/>
}