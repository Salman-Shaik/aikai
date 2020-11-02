import _ from "lodash";
import languagesList from "../data/languages.json";
import { getCookieValue, getFirstFour, getRandomItem } from "./helper";
import { fetchLanguages } from "./networkCalls";

const API_KEY = getCookieValue("apiKey");
const API_HOST = "https://api.themoviedb.org/3";

const playingMoviesFilter = (json, setPlayingMovies) => {
  let results = json.results;
  fetchLanguages().then((languages) => {
    if (!_.isEmpty(languages))
      results = results.filter((r) =>
        languages.includes(languagesList[r["original_language"]])
      );
    if (results.length > 16) results = results.slice(0, 16);
    setPlayingMovies(results);
  });
};

const airingShowsFilter = (
  json,
  setAiringTvShows,
  setLoaded,
  setHomepageLoaded
) => {
  let results = json.results;
  fetchLanguages().then((languages) => {
    if (!_.isEmpty(languages))
      results = results.filter((r) =>
        languages.includes(languagesList[r["original_language"]])
      );
    if (results.length > 10) results = results.slice(0, 16);
    setAiringTvShows(results);
    setLoaded(true);
    setHomepageLoaded(true);
  });
};

export const fetchPlayingMovies = (setPlayingMovies) => {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=en-IN&region=IN`;
  fetch(url)
    .then((r) => r.text())
    .then((data) => JSON.parse(data))
    .then((json) => playingMoviesFilter(json, setPlayingMovies))
    .catch((e) => new TypeError(e));
};

export const fetchAiringTVShows = (
  setAiringTvShows,
  setLoaded,
  setHomepageLoaded
) => {
  const tvUrl = `${API_HOST}/tv/on_the_air?api_key=${API_KEY}&language=en-IN`;
  fetch(tvUrl)
    .then((r) => r.text())
    .then((data) => JSON.parse(data))
    .then((json) =>
      airingShowsFilter(json, setAiringTvShows, setLoaded, setHomepageLoaded)
    )
    .catch((e) => new TypeError(e));
};
export const fetchShow = (
  currentShowId,
  currentShowType,
  setShowInformation,
  setLoaded,
  setHomePageLoaded
) => {
  const url = `${API_HOST}/${currentShowType}/${currentShowId}?api_key=${API_KEY}&language=en-IN`;
  fetch(url)
    .then((r) => r.text())
    .then((d) => JSON.parse(d))
    .then((rj) => {
      setShowInformation(rj);
      setLoaded(true);
      setHomePageLoaded(true);
    })
    .catch((e) => new TypeError(e));
};

export const fetchOtherShow = (
  currentShowType,
  showId,
  keyword,
  setOtherShows,
  setLoaded,
  setHomePageLoaded
) => {
  const url = `${API_HOST}/${currentShowType}/${showId}/${keyword}?api_key=${API_KEY}&language=en-IN&page=1`;
  fetch(url)
    .then((r) => {
      return r.text();
    })
    .then((d) => {
      return JSON.parse(d).results;
    })
    .then((res) => getFirstFour(res))
    .then((ff) => {
      setLoaded(true);
      setOtherShows(ff);
      setHomePageLoaded(true);
    })
    .catch((e) => new TypeError(e));
};
export const fetchTopShow = (
  setCurrentShowId,
  setCurrentShowType,
  setHomePageLoaded,
  pageNumber,
  type
) => {
  const url = `${API_HOST}/${type}/top_rated?api_key=${API_KEY}&language=en-IN&page=${pageNumber}`;
  fetch(url)
    .then((res) => res.text())
    .then((data) => JSON.parse(data).results)
    .then((res) => getRandomItem(res))
    .then((show) => {
      setCurrentShowType(type);
      setCurrentShowId(show.id);
      setHomePageLoaded(true);
    })
    .catch((e) => new TypeError(e));
};

export const fetchSearchedShow = (
  type,
  currentShow,
  setResults,
  setLoaded,
  setHomePageLoaded
) => {
  const url = `${API_HOST}/search/${type}?api_key=${API_KEY}&query=${currentShow}`;
  fetch(url)
    .then((r) => r.text())
    .then((d) => JSON.parse(d).results)
    .then((res) => res.slice(0, 12))
    .then((sr) => {
      setResults(sr);
      if (!!setLoaded) {
        setLoaded(true);
        setHomePageLoaded(true);
      }
    })
    .catch((e) => new TypeError(e));
};
