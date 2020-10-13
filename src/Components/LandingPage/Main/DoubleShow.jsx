import _ from "lodash";
import React, { useState } from "react";
import "../../../css/DoubleShow.css";
import { fetchTopShow } from "../../../lib/showNetworkCalls";
import { MinimizeActionButton } from "./MinimizeActionButton";
import { Show } from "./Show/Show";

export const DoubleShow = (props) => {
  const [randomMinimized, setRandomMinimized] = useState(true);
  const [topRatedMinimized, setTopRatedMinimized] = useState(true);
  const [topRatedId, setTopRatedId] = useState(0);
  const [randomId, setRandomId] = useState(0);

  const randomShowPageNumber = {
    movie: 389,
    tv: 60,
  };

  const topRatedShowPageNumber = 22;
  const type = props.type;

  const minimizeRandom = () => {
    const randomPageNumber = _.random(1, randomShowPageNumber[type]);
    fetchTopShow(
      setRandomId,
      props.setCurrentShowType,
      props.setHomePageLoaded,
      randomPageNumber,
      type
    );
    setRandomMinimized(!randomMinimized);
    setTopRatedMinimized(true);
    props.setHomePageLoaded(false);
  };

  const minimizeTopRated = () => {
    const topRatedPageNumber = _.random(1, topRatedShowPageNumber);
    fetchTopShow(
      setTopRatedId,
      props.setCurrentShowType,
      props.setHomePageLoaded,
      topRatedPageNumber,
      type
    );
    setTopRatedMinimized(!topRatedMinimized);
    setRandomMinimized(true);
    props.setHomePageLoaded(false);
  };

  return (
    <section className="double_show">
      <section className="double_show_section">
        <MinimizeActionButton
          minimized={topRatedMinimized}
          anchorText={`Top Rated ${_.capitalize(type)}`}
          minimizeMethod={minimizeTopRated}
          className="section_action"
        />
        {!topRatedMinimized && (
          <Show {...props} currentShowId={topRatedId} currentShowType={type} />
        )}
        <MinimizeActionButton
          minimized={randomMinimized}
          anchorText={`Random ${_.capitalize(type)}`}
          minimizeMethod={minimizeRandom}
          className="section_action"
        />
        {!randomMinimized && (
          <Show {...props} currentShowId={randomId} currentShowType={type} />
        )}
      </section>
    </section>
  );
};
