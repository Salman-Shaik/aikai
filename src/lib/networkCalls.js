import {
    getCookieValue,
    getFirstFour,
    getJwtToken,
    getRandomItem,
    handlePerfectShowPromises,
    refineShowResults
} from "./helper";

const API_KEY = getCookieValue("apiKey");
const API_HOST = "https://api.themoviedb.org/3";

export const fetchPlayingMovies = (setPlayingMovies) => {
    const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=en-IN&region=IN`;
    fetch(url).then(r => r.text())
        .then(data => JSON.parse(data))
        .then(json => {
            let results = json.results;
            if (results.length > 16) {
                results = results.slice(0, 16);
            }
            setPlayingMovies(results);
        })
        .catch(e => new TypeError(e));
};

export const fetchAiringTVShows = (setAiringTvShows, setLoaded, setHomepageLoaded) => {
    const tvUrl = `${API_HOST}/tv/on_the_air?api_key=${API_KEY}&language=en-IN`;
    fetch(tvUrl).then(r => r.text())
        .then(data => JSON.parse(data))
        .then(json => {
            let results = json.results;
            if (results.length > 10) {
                results = results.slice(0, 16);
            }
            setAiringTvShows(results);
            setLoaded(true);
            setHomepageLoaded(true);
        })
        .catch(e => new TypeError(e));
};

const fetchMovie = currentShow => {
    const url = `${API_HOST}/search/movie?api_key=${API_KEY}&query=${currentShow}`
    return fetch(url).then(r => r.text())
        .then(d => JSON.parse(d).results)
        .then(async j => await refineShowResults(j, currentShow))
        .catch(e => new TypeError(e));
};

const fetchTv = currentShow => {
    const tvUrl = `${API_HOST}/search/tv?api_key=${API_KEY}&query=${currentShow}`
    return fetch(tvUrl).then(r => r.text())
        .then(d => JSON.parse(d).results)
        .then(async j => await refineShowResults(j, currentShow))
        .catch(e => new TypeError(e));
};

export const fetchShow = (currentShowId, currentShowType, setShowInformation, setLoaded, setHomePageLoaded) => {
    const url = `${API_HOST}/${currentShowType}/${currentShowId}?api_key=${API_KEY}&language=en-IN`
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
    const url = `${API_HOST}/${currentShowType}/${showId}/${keyword}?api_key=${API_KEY}&language=en-IN&page=1`;
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

export const fetchTopShow = (setCurrentShowId, setCurrentShowType, setHomePageLoaded, pageNumber, type) => {
    const url = `${API_HOST}/${type}/top_rated?api_key=${API_KEY}&language=en-IN&page=${pageNumber}`
    fetch(url).then(res => res.text())
        .then(data => JSON.parse(data).results)
        .then(res => getRandomItem(res))
        .then(show => {
            setCurrentShowType(type)
            setCurrentShowId(show.id);
            setHomePageLoaded(true);
        })
        .catch(e => new TypeError(e));
}

export const login = (username, password, setIsUserLoggedIn, setIsLoginError, setIsLoginSuccess, setGotoLoginPage) => {
    const body = {username, password}
    const loginHandler = ({status}) => {
        if (status === 401) setIsLoginError(true);
        else {
            setGotoLoginPage(false)
            setIsLoginSuccess(true);
            setIsUserLoggedIn(true);
        }
    };
    const jwtToken = getJwtToken(body);
    fetch("/login", {
        method: "post",
        headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${jwtToken}`}
    }).then(loginHandler)
        .catch(e => new TypeError(e));
}

export const logout = (setHomePageLoaded, setIsUserLoggedIn) => {
    fetch("/logout", {
        method: "delete"
    }).then(res => res.status).then(st => {
        if (st === 200) {
            setIsUserLoggedIn(false);
            setHomePageLoaded(true);
        }
    });
}

export const registerUser = (name, username, password, age, explicitFlag, setGotoRegisterPage, setGotoLoginPage) => {
    const jwtToken = getJwtToken({username, password});
    fetch("/register", {
        method: "post",
        body: JSON.stringify({name, age, explicitFlag}),
        headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${jwtToken}`}
    }).then(res => {
        if (res.status === 200) {
            setGotoRegisterPage(false);
            setGotoLoginPage(true);
        }
    }).catch(e => new TypeError(e));
}

export const setFavorite = (title, id, posterPath, setIsFavorite) => {
    fetch("/favorite", {
        method: "put",
        body: JSON.stringify({title, id, posterPath}),
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        if (res.status === 200) {
            setIsFavorite(true);
        }
    }).catch(e => new TypeError(e));
}

export const removeFavorite = (id, setIsFavorite) => {
    fetch("/favorite", {
        method: "delete",
        body: JSON.stringify({id}),
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        if (res.status === 200) {
            setIsFavorite(false);
        }
    }).catch(e => new TypeError(e));
}

export const fetchUserFavorites = () => fetch("/favorites")
    .then(res => res.text())
    .then(data => JSON.parse(data));

export const isFavoriteShow = (title, setIsFavorite) => {
    fetchUserFavorites()
        .then(favoritesInfo => favoritesInfo.map(f => f.title))
        .then(favorites => {
            if (favorites.includes(title)) {
                return setIsFavorite(true);
            }
            setIsFavorite(false);
        }).catch(e => new TypeError(e));
}