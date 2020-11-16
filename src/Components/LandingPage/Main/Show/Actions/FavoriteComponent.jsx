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
  updateLocation,
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
      updateLocation("/login");
    }
  };

  const onDislike = () => removeFavorite(id, setIsFavorite, updateLocation);

  const Liked = () => (
    <Tooltip title="You Like It">
      <Favorite
        className="favorite"
        onClick={onDislike}
        data-testid="favorite"
      />
    </Tooltip>
  );

  const NotLiked = () => (
    <Tooltip title="Like It?">
      <FavoriteBorder
        className="not_favorite"
        onClick={onLike}
        data-testid="not_favorite"
      />
    </Tooltip>
  );

  return isFavorite ? <Liked /> : <NotLiked />;
};
