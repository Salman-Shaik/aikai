import Tooltip from "@material-ui/core/Tooltip";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  addToWatchList,
  isShowOnWatchList,
} from "../../../../../lib/networkCalls";

export const WatchList = ({
  id,
  title,
  posterPath,
  isUserLoggedIn,
  setGotoLoginPage,
}) => {
  const [isOnWatchList, setIsOnWatchList] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn) isShowOnWatchList(title, setIsOnWatchList);
  }, [title, isUserLoggedIn]);

  const onWatchListAdd = () => {
    if (isUserLoggedIn) {
      addToWatchList(title, id, posterPath, setIsOnWatchList);
    } else {
      setGotoLoginPage(true);
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
