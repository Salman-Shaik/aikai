import React from "react";
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {createPosters} from "../../lib/helper";

const Arrow = ({text, className}) => <div className={className}>{text}</div>;
const ArrowLeft = Arrow({text: '<', className: 'arrow-prev'});
const ArrowRight = Arrow({text: '>', className: 'arrow-next'});

export const AiringShows = ({data,setCurrentShow,setCurrentShowType}) => {
    let menu = createPosters(data,setCurrentShow,setCurrentShowType);

    return <section className="airing_shows">
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