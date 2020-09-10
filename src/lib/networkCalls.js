import {getFirstFour, handlePerfectShowPromises, refineShowResults} from "./helper";

export const fetchPlayingMovies = (setPlayingMovies) => {
    const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=8f38dc176aea0ef9cbb167f50a8fc9b2&language=en-IN&region=IN";
    fetch(url).then(r => r.text())
        .then(data => JSON.parse(data))
        .then(json => {
            setPlayingMovies(json.results);
        })
        .catch(e => new TypeError(e));
};

export const fetchAiringTVShows = (setAiringTvShows, setLoaded) => {
    const tvUrl = "https://api.themoviedb.org/3/tv/on_the_air?api_key=8f38dc176aea0ef9cbb167f50a8fc9b2&language=en-IN";
    fetch(tvUrl).then(r => r.text())
        .then(data => JSON.parse(data))
        .then(json => {
            setAiringTvShows(json.results);
            setLoaded(true);
        })
        .catch(e => new TypeError(e));
};

const fetchMovie = currentShow => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=8f38dc176aea0ef9cbb167f50a8fc9b2&query=${currentShow}`
    return fetch(url).then(r => r.text())
        .then(d => JSON.parse(d).results)
        .then(j => refineShowResults(j, currentShow))
        .catch(e => new TypeError(e));
};

const fetchTv = currentShow => {
    const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=8f38dc176aea0ef9cbb167f50a8fc9b2&query=${currentShow}`
    return fetch(tvUrl).then(r => r.text())
        .then(d => JSON.parse(d).results)
        .then(j => refineShowResults(j, currentShow))
        .catch(e => new TypeError(e));
};

export const fetchPerfectShow = (currentShow, setShowInformation, setLoaded,setCurrentShowType) => {
    const promises = []
    promises.push(fetchMovie(currentShow));
    promises.push(fetchTv(currentShow));
    handlePerfectShowPromises(promises, currentShow, setShowInformation, setLoaded,setCurrentShowType);
};

export const fetchShow = (currentShow, currentShowType, setShowInformation, setLoaded) => {
    const url = `https://api.themoviedb.org/3/search/${currentShowType}?api_key=8f38dc176aea0ef9cbb167f50a8fc9b2&query=${currentShow}`
    fetch(url).then(r => r.text())
        .then(d => JSON.parse(d).results)
        .then(j => {
            return refineShowResults(j, currentShow);
        })
        .then(rj => {
            setShowInformation(rj);
            setLoaded(true);
        })
        .catch(e => new TypeError(e));
};

export const fetchOtherShow = (currentShowType, showId, keyword, setOtherShows, setLoaded) => {
    const showType = currentShowType;
    const url = `https://api.themoviedb.org/3/${showType}/${showId}/${keyword}?api_key=8f38dc176aea0ef9cbb167f50a8fc9b2&language=en-IN&page=1`;
    fetch(url).then(r => r.text())
        .then(d => JSON.parse(d).results)
        .then(res => getFirstFour(res))
        .then(ff => {
            setOtherShows(ff)
            setLoaded(true);
        })
        .catch(e => new TypeError(e));
};