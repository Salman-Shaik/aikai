import Tooltip from "@material-ui/core/Tooltip";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import React, { useEffect, useState } from "react";
import "../../../../../css/FavoritesComponent.css";
import {
  isFavoriteShow,
  removeFavorite,
  setFavorite,
} from "../../../../../lib/networkCalls";

export const FavoriteComponent = ({
  isUserLoggedIn,
  title,
  id,
  posterPath,
  setGotoLoginPage,
  initialValue,
}) => {
  const [isFavorite, setIsFavorite] = useState(
    !!initialValue ? initialValue : false
  );

  useEffect(() => {
    if (isUserLoggedIn) isFavoriteShow(title, setIsFavorite);
  }, [title, isUserLoggedIn]);

  const onLike = () => {
    if (isUserLoggedIn) {
      setFavorite(title, id, posterPath, setIsFavorite);
    } else {
      setGotoLoginPage(true);
    }
  };

  const onDislike = () => removeFavorite(id, setIsFavorite);

  const Liked = () => (
    <Tooltip title="You Like It">
      <Favorite className="favorite" onClick={onDislike} />
    </Tooltip>
  );

  const NotLiked = () => (
    <Tooltip title="Like It?">
      <FavoriteBorder className="not_favorite" onClick={onLike} />
    </Tooltip>
  );

  return isFavorite ? <Liked /> : <NotLiked />;
};
