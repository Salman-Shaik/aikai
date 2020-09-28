import Tooltip from "@material-ui/core/Tooltip";
import AddToWatchList from "@material-ui/icons/PlaylistAdd";
import AddedToWatchList from "@material-ui/icons/PlaylistAddCheck";
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
  }, [title]);

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
        <AddToWatchList className="add" onClick={onWatchListAdd} />
      </Tooltip>
    );
  };

  const Added = () => {
    return (
      <Tooltip title={"On WatchList"}>
        <AddedToWatchList className="added" />
      </Tooltip>
    );
  };

  return isOnWatchList ? <Added /> : <Add />;
};
