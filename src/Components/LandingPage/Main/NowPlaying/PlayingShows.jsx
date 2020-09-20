import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import React from "react";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {createPosters} from "../../../../lib/helper";

const Arrow = ({text, className}) => <div className={className}>{text}</div>;

const ArrowLeft = Arrow({text: <ArrowBackIos className="arrow"/>, className: 'arrow-prev'});
const ArrowRight = Arrow({text: <ArrowForwardIos className="arrow"/>, className: 'arrow-next'});

export const PlayingShows = ({data, setCurrentShowId, setCurrentShowType, setHomePageLoaded}) => {
    let menu = createPosters(data, setCurrentShowId, setCurrentShowType, setHomePageLoaded);
    return <section className="playing_movies">
        <ScrollMenu
            data={menu}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            dragging={false}
            hideArrows={false}
            hideSingleArrow={true}
            wheel={false}
        />
    </section>
}