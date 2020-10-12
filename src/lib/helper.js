import jwt from "jsonwebtoken";
import _ from "lodash";
import React from "react";
import { Poster } from "../Components/LandingPage/Main/NowPlaying/Poster";
import { genres } from "../data/genres.json";

const filterPosterPaths = (item) => !!item["poster_path"];

export const createPosters = (
  rawJson,
  setCurrentShowId,
  setCurrentShowType,
  setHomePageLoaded
) => {
  const filteredList = rawJson.filter(filterPosterPaths);
  return filteredList.map((item, index) => (
    <Poster
      data={item}
      key={index}
      setCurrentShowId={setCurrentShowId}
      setCurrentShowType={setCurrentShowType}
      setHomePageLoaded={setHomePageLoaded}
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

export const getRandomItem = (arr) => {
  const shuffledArr = _.shuffle(arr);
  return shuffledArr[0];
};

export const getCookieValue = (cookieString) => {
  const cookies = document.cookie.split("; ");
  const cookiesObj = {};
  cookies.forEach((cookie) => {
    const [key, val] = cookie.split("=");
    cookiesObj[key] = val;
  });
  return cookiesObj[cookieString];
};

export const getJwtToken = (payload) =>
  jwt.sign(payload, "ADHIIDHIKAADHUADHEIDHI");
