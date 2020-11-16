import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "../../../../css/Trailer.css";
import { fetchVideoId } from "../../../../lib/showNetworkCalls";
import { Spinner } from "../../../Spinner";

export const Trailer = ({ info, homepageLoaded, setHomepageLoaded }) => {
  const [videoId, setVideoId] = useState("");
  const title = info.name || info.title;
  const opts = {
    height: "480",
    width: "720",
  };

  useEffect(() => {
    fetchVideoId(title, setVideoId, setHomepageLoaded);
  }, [title, setHomepageLoaded]);

  return !homepageLoaded ? (
    <Spinner loaded={homepageLoaded} />
  ) : (
    <section className="trailer_section">
      <h3 className="trailer_title">Video</h3>
      <YouTube videoId={videoId} opts={opts} className="trailer_video" />
    </section>
  );
};
