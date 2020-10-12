import _ from "lodash";
import React, {useEffect, useState} from "react";
import {fetchTopShow} from "../../../lib/showNetworkCalls";
import {MinimizeActionButton} from "./MinimizeActionButton";
import {Show} from "./Show/Show";
import '../../../css/DoubleShow.css'

export const DoubleShow = (props) => {
  const [randomMinimized, setRandomMinimized] = useState(true);
  const [topRatedMinimized, setTopRatedMinimized] = useState(true);
  const [topRatedId, setTopRatedId] = useState(0);
  const [randomId, setRandomId] = useState(0);

  const randomShowPageNumber = {
    "movie": 389,
    "tv": 60
  }

  const topRatedShowPageNumber = 22
  const type = props.type;

  useEffect(() => {
    if(_.isEqual(topRatedId,0) || _.isEqual(randomId,0)){
      const topRatedPageNumber = _.random(1, topRatedShowPageNumber);
      const randomPageNumber = _.random(1, randomShowPageNumber[type]);
      fetchTopShow(
        setTopRatedId,
        props.setCurrentShowType,
        props.setHomePageLoaded,
        topRatedPageNumber,
        type
      );
      fetchTopShow(
        setRandomId,
        props.setCurrentShowType,
        props.setHomePageLoaded,
        randomPageNumber,
        type
      );
    }
  }, [props,randomShowPageNumber]);

  const minimizeRandom = () => {
    setRandomMinimized(!randomMinimized);
    setTopRatedMinimized(true);
  };

  const minimizeTopRated = () => {
    setTopRatedMinimized(!topRatedMinimized);
    setRandomMinimized(true);
  };

  return <section className="double_show">
    <section className="double_show_section">
      <MinimizeActionButton minimized={randomMinimized} anchorText={`Random ${_.capitalize(type)}`} minimizeMethod={minimizeRandom}/>
      {!randomMinimized &&
      <Show {...props} currentShowId={randomId}/>}
      <MinimizeActionButton minimized={topRatedMinimized} anchorText={`Top Rated ${_.capitalize(type)}`}
                            minimizeMethod={minimizeTopRated}/>
      {!topRatedMinimized &&
      <Show {...props} currentShowId={topRatedId}/>}
    </section>
  </section>
}