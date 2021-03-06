import Tooltip from "@material-ui/core/Tooltip";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  addToWatchList,
  isShowOnWatchList,
} from "../../../../../lib/networkCalls";

export const WatchListComponent = ({
  id,
  title,
  posterPath,
  isUserLoggedIn,
  updateLocation,
  initialValue,
}) => {
  const [isOnWatchList, setIsOnWatchList] = useState(
    !!initialValue ? initialValue : false
  );

  useEffect(() => {
    if (isUserLoggedIn) isShowOnWatchList(title, setIsOnWatchList);
  }, [title, isUserLoggedIn]);

  const onWatchListAdd = () => {
    if (isUserLoggedIn) {
      addToWatchList(title, id, posterPath, setIsOnWatchList);
    } else {
      updateLocation("/login");
    }
  };

  const Add = () => {
    return (
      <Tooltip title={"Add To WatchList"}>
        <BookmarkBorder
          className="add"
          onClick={onWatchListAdd}
          data-testid="add_to_watchlist"
        />
      </Tooltip>
    );
  };

  const Added = () => {
    return (
      <Tooltip title={"On WatchList"}>
        <Bookmark className="added" data-testid="on_watchlist" />
      </Tooltip>
    );
  };

  return isOnWatchList ? <Added /> : <Add />;
};
