import _ from "lodash";
import languagesList from "../data/languages.json";
import {
  createCookie,
  getCookieValue,
  getFirstFour,
  getRandomItem,
  isEmptyOrUndefined,
} from "./helper";

const API_KEY = getCookieValue("apiKey");
const YOUTUBE_API_KEY = getCookieValue("youtubeKey");
const API_HOST = "https://api.themoviedb.org/3";

const playingMoviesFilter = (json, setPlayingMovies) => {
  let results = json.results;
  let languageCookieValue = getCookieValue("languages");
  const explicitFlag = getCookieValue("explicitFlag");
  if (
    !isEmptyOrUndefined(languageCookieValue) &&
    !isEmptyOrUndefined(explicitFlag)
  ) {
    const languages = languageCookieValue.split("%2C");
    results = results.filter((r) => {
      return (
        languages.includes(languagesList[r["original_language"]]) &&
        !_.isUndefined(r.adult) &&
        (!r.adult || r.adult === explicitFlag)
      );
    });
  }

  let extraResults = results.length % 4;
  if (extraResults !== 0) {
    let desiredNumberOfResults = results.length - extraResults;
    results = results.slice(0, desiredNumberOfResults);
  }
  setPlayingMovies(results);
};

const airingShowsFilter = (
  json,
  setAiringTvShows,
  setLoaded,
  setHomepageLoaded
) => {
  let results = json.results;
  let cookieValue = getCookieValue("languages");

  if (!isEmptyOrUndefined(cookieValue)) {
    const languages = cookieValue.split("%2C");
    results = results.filter((r) =>
      languages.includes(languagesList[r["original_language"]])
    );
  }

  let extraResults = results.length % 4;
  if (extraResults !== 0) {
    let desiredNumberOfResults = results.length - extraResults;
    results = results.slice(0, desiredNumberOfResults);
  }
  setAiringTvShows(results);
  setLoaded(true);
  setHomepageLoaded(true);
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
  setShowId,
  setHomePageLoaded,
  pageNumber,
  type
) => {
  const url = `${API_HOST}/${type}/top_rated?api_key=${API_KEY}&language=en-IN&page=${pageNumber}`;
  fetch(url)
    .then((res) => res.text())
    .then((data) => JSON.parse(data).results)
    .then((res) => {
      let languageCookieValue = getCookieValue("languages");
      const explicitFlag = getCookieValue("explicitFlag");
      let results = res;
      if (type === "movie") {
        if (
          !isEmptyOrUndefined(languageCookieValue) &&
          !isEmptyOrUndefined(explicitFlag)
        ) {
          const languages = languageCookieValue.split("%2C");
          results = res.filter((r) => {
            return (
              languages.includes(languagesList[r["original_language"]]) &&
              !_.isUndefined(r.adult) &&
              (!r.adult || r.adult === explicitFlag)
            );
          });
        }
      } else {
        if (!isEmptyOrUndefined(languageCookieValue)) {
          results = results.filter((r) => {
            const languages = languageCookieValue.split("%2C");
            languages.includes(languagesList[r["original_language"]]);
          });
        }
      }
      return getRandomItem(results);
    })
    .then((show) => {
      createCookie("showType", type);
      setShowId(show.id);
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
      const results = sr.map((r) => {
        const t = r;
        t.setShowType = () => {
          createCookie("showType", type);
        };
        return t;
      });
      setResults(results);
      if (!!setLoaded) {
        setLoaded(true);
        setHomePageLoaded(true);
      }
    })
    .catch((e) => new TypeError(e));
};

export const fetchVideoId = (title, setVideoIds, setHomepageLoaded) => {
  const url =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&type=video&videoEmbeddable=true" +
    `&key=${YOUTUBE_API_KEY}&q=${title} Trailer`;
  fetch(url)
    .then((res) => res.text())
    .then((d) => JSON.parse(d))
    .then((results) => {
      const videoIds = results.items.map((i) => i.id.videoId);
      setVideoIds(videoIds);
      setHomepageLoaded(true);
    })
    .catch((e) => new TypeError(e));
};
