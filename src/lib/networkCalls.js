export const fetchPlayingMovies = (url, setPlayingMovies, setIsLoading) => {
    fetch(url).then(r => r.text()).then(data => JSON.parse(data)).then(json => {
        setPlayingMovies(json.results);
        setIsLoading(false);
    }).catch(e => new TypeError(e));
};

export const fetchAiringTVShows = (tvUrl, setAiringTvShows, setIsLoading) => {
    fetch(tvUrl).then(r => r.text()).then(data => JSON.parse(data)).then(json => {
        setAiringTvShows(json.results);
        setIsLoading(false);
    }).catch(e => new TypeError(e));
};