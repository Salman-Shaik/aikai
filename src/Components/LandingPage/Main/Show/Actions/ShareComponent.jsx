import Tooltip from "@material-ui/core/Tooltip";
import Share from "@material-ui/icons/ShareTwoTone";
import React, {useState} from "react";

export const ShareComponent = ({id, currentShowType, navigator}) => {
  const [isClicked, setIsClicked] = useState(false);

  const copyUrl = () => {
    const showUrl = `${window.location.href}?showId=${id}&showType=${currentShowType}`;
    navigator.clipboard.writeText(showUrl).catch((e) => new TypeError(e));
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 3000);
  };
  return (
    <Tooltip title={!!isClicked ? "Url Copied" : "Copy Url"}>
      <Share className={`share ${!!isClicked ? "share_clicked" : ""}`} onClick={copyUrl} data-testid="share"/>
    </Tooltip>
  );
};
