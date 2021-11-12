import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "../../../../css/Videos.css";
import { fetchVideoId } from "../../../../lib/showNetworkCalls";
import { Spinner } from "../../../Spinner";

export const Videos = ({ info, homepageLoaded, setHomepageLoaded }) => {
  const [videoIds, setVideoIds] = useState([]);
  const title = info.name || info.title;

  const opts = {
    height: "470",
    width: "718",
  };

  const subOpts = {
    height: "470",
    width: "670",
  };

  useEffect(() => {
    fetchVideoId(title, setVideoIds, setHomepageLoaded);
  }, [title, setHomepageLoaded]);

  return !homepageLoaded ? (
    <Spinner loaded={homepageLoaded} />
  ) : (
    <section className="trailer_section">
      <h3 className="trailer_title">Videos</h3>
      <section className="videos">
        <YouTube videoId={videoIds[0]} opts={opts} className="trailer_video" />
      </section>
    </section>
  );
};
