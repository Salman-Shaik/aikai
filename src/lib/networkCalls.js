import {getFirstFour, handlePerfectShowPromises, refineShowResults} from "./helper";

const API_KEY = "8f38dc176aea0ef9cbb167f50a8fc9b2";

export const fetchPlayingMovies = (setPlayingMovies) => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-IN&region=IN`;
    fetch(url).then(r => r.text())
        .then(data => JSON.parse(data))
        .then(json => {
            setPlayingMovies(json.results);
        })
        .catch(e => new TypeError(e));
};

export const fetchAiringTVShows = (setAiringTvShows, setLoaded, setHomepageLoaded) => {
    const tvUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-IN`;
    fetch(tvUrl).then(r => r.text())
        .then(data => JSON.parse(data))
        .then(json => {
            setAiringTvShows(json.results);
            setLoaded(true);
            setHomepageLoaded(true);
        })
        .catch(e => new TypeError(e));
};

const fetchMovie = currentShow => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${currentShow}`
    return fetch(url).then(r => r.text())
        .then(d => JSON.parse(d).results)
        .then(j => refineShowResults(j, currentShow))
        .catch(e => new TypeError(e));
};

const fetchTv = currentShow => {
    const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${currentShow}`
    return fetch(tvUrl).then(r => r.text())
        .then(d => JSON.parse(d).results)
        .then(j => refineShowResults(j, currentShow))
        .catch(e => new TypeError(e));
};

export const fetchShow = (currentShowId, currentShowType, setShowInformation, setLoaded, setHomePageLoaded) => {
    const url = `https://api.themoviedb.org/3/${currentShowType}/${currentShowId}?api_key=${API_KEY}&language=en-IN`
    fetch(url).then(r => r.text())
        .then(d => JSON.parse(d))
        .then(rj => {
            setShowInformation(rj);
            setLoaded(true);
            setHomePageLoaded(true);
        })
        .catch(e => new TypeError(e));
};

export const fetchOtherShow = (currentShowType, showId, keyword, setOtherShows, setLoaded, setHomePageLoaded) => {
    const url = `https://api.themoviedb.org/3/${currentShowType}/${showId}/${keyword}?api_key=${API_KEY}&language=en-IN&page=1`;
    fetch(url).then(r => r.text())
        .then(d => JSON.parse(d).results)
        .then(res => getFirstFour(res))
        .then(ff => {
            setHomePageLoaded(true);
            setOtherShows(ff)
            setLoaded(true);
        })
        .catch(e => new TypeError(e));
};

export const fetchPerfectShow = (currentShow, setShowInformation, setLoaded, setCurrentShowType, setCurrentShowId, setHomePageLoaded) => {
    const promises = []
    promises.push(fetchMovie(currentShow));
    promises.push(fetchTv(currentShow));
    handlePerfectShowPromises(promises, currentShow, setShowInformation, setLoaded, setCurrentShowType, setCurrentShowId, setHomePageLoaded);
};