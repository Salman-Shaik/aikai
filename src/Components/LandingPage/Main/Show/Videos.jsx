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
    height: "230",
    width: "325",
  };

  useEffect(() => {
    fetchVideoId(title, setVideoIds, setHomepageLoaded);
  }, [title, setHomepageLoaded]);

  return !homepageLoaded ? (
    <Spinner loaded={homepageLoaded} />
  ) : (
    <section className="trailer_section">
      <h3 className="trailer_title">Video</h3>
      <section className="videos">
        <YouTube videoId={videoIds[0]} opts={opts} className="trailer_video" />
        <div className="vertical-line" />
        <section className="video_sub">
          <YouTube
            videoId={videoIds[1]}
            opts={subOpts}
            className="trailer_video"
          />
          <YouTube
            videoId={videoIds[3]}
            opts={subOpts}
            className="trailer_video"
          />
        </section>
        <section className="video_sub">
          <YouTube
            videoId={videoIds[2]}
            opts={subOpts}
            className="trailer_video"
          />
          <YouTube
            videoId={videoIds[4]}
            opts={subOpts}
            className="trailer_video"
          />
        </section>
      </section>
    </section>
  );
};
