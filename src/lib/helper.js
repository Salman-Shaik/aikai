import jwt from "jsonwebtoken";
import _ from "lodash";
import React from "react";
import { Poster } from "../Components/LandingPage/Main/NowPlaying/Poster";
import { genres } from "../data/genres.json";
import { cinematicUniverses } from "../data/cinematicUniverses.json";

const filterPosterPaths = (item) => !!item["poster_path"];

export const createPosters = (
  rawJson,
  setCurrentShowType,
  setHomePageLoaded,
  updateLocation
) => {
  const filteredList = rawJson.filter(filterPosterPaths);
  return filteredList.map((item, index) => (
    <Poster
      data={item}
      key={index}
      setCurrentShowType={setCurrentShowType}
      setHomePageLoaded={setHomePageLoaded}
      updateLocation={updateLocation}
    />
  ));
};
export const imageUrlBuilder = (imageName) =>
  `https://image.tmdb.org/t/p/original${imageName}`;

export const getGenreNames = (info, showType) => {
  const genre = !!info.genres && info.genres.map((g) => g.name);
  const ids = info["genre_ids"];
  if (!_.isEmpty(genre)) return genre.join(", ");
  if (_.isEmpty(ids)) return "";
  const showGenres = genres[showType];
  return ids.map((id) => showGenres.find((sg) => sg.id === id).name).join(", ");
};

export const getFirstFour = (res) => res.slice(0, 4);

export const getFive = (res, i) => res.slice(i, i + 5);

export const getSix = (res, i) => res.slice(i, i + 6);

export const fetchExplicitFlag = () =>
  fetch("/explicitFlag")
    .then((r) => r.text())
    .then((d) => JSON.parse(d).flagStatus);

export const getCookieValue = (cookieString) => {
  const cookies = document.cookie.split("; ");
  const cookiesObj = {};
  cookies.forEach((cookie) => {
    const [key, val] = cookie.split("=");
    cookiesObj[key] = val;
  });
  return cookiesObj[cookieString];
};

export const getRandomSuggestion = (arr) => {
  const languages = getCookieValue("languages").split("%2C");
  const filteredArray = arr.filter((item) => languages.includes(item.language));
  return filteredArray.length === 0
    ? getRandomItem(arr)
    : getRandomItem(filteredArray);
};
export const getRandomItem = (arr) => {
  const shuffledArr = _.shuffle(arr);
  return shuffledArr[0];
};

export const createCookie = (key, value) => {
  deleteCookie(key);
  document.cookie = `${key}=${value}`;
};

export const createCookieIfNotExists = (key, value) => {
  const cookieValue = getCookieValue(key);
  if (!cookieValue) {
    document.cookie = `${key}=${value}`;
  }
};

export const deleteCookie = (key) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

export const getJwtToken = (payload) =>
  jwt.sign(payload, "ADHIIDHIKAADHUADHEIDHI");

export const onPosterError = (e) => {
  e.target.src = "fallback.jpg";
};

export const isCurrentItem = (name) => {
  const url = {
    "Now Playing": "/now_playing",
    Movie: "/movies",
    Tv: "/tv_shows",
    "Editor's Choice": "/editors_choice",
    "Download App": "/download_app",
  };
  const href = window.location.href;
  return href.includes(url[name]);
};

export const Section = ({ miniShows }) => (
  <section className="sectioned_shows">{miniShows}</section>
);

export const getSectionedMiniShows = (map) => {
  const sectionedMap = [];
  for (let i = 0; i < map.length; i += 5)
    sectionedMap.push(<Section miniShows={getFive(map, i)} />);
  return sectionedMap;
};

export const isEmptyOrUndefined = (value) => {
  return _.isEmpty(value) || _.isUndefined(value);
};

export const getCuratedLists = () => {
  return cinematicUniverses;
};

export const getSectionedPosters = (map) => {
  const Section = ({ posters, key }) => (
    <section
      className="sectioned_posters"
      data-testid="sectioned_posters"
      key={key}
    >
      {posters}
    </section>
  );

  const sectionedMap = [];
  for (let i = 0; i < map.length; i += 6)
    sectionedMap.push(<Section posters={getSix(map, i)} key={i} />);
  return sectionedMap;
};
