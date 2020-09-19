import Tooltip from "@material-ui/core/Tooltip";
import Share from "@material-ui/icons/ShareTwoTone";
import React from "react";

export const ShareComponent = ({id, currentShowType}) => {
    const copyUrl = () => {
        const showUrl = `${window.location.href}?showId=${id}&showType=${currentShowType}`;
        navigator.clipboard.writeText(showUrl).catch(e => new TypeError(e));
    }
    return <Tooltip title={"Copy Url"}>
        <Share className="share" onClick={copyUrl}/>
    </Tooltip>;
};