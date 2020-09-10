import React from "react";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {getGenreNames, imageUrlBuilder} from "../../lib/helper";

const createProgressBar = rating => <CircularProgressbar value={rating} maxValue={10} text={`${rating * 10}%`}
                                                         className="progress_bar"
                                                         styles={buildStyles({
                                                             rotation: 0,
                                                             strokeLinecap: 'round',
                                                             textSize: '22px',
                                                             pathTransitionDuration: 0.5,
                                                             pathColor: `rgba(251, 116, 169)`,
                                                             textColor: '#8d8c8c',
                                                             trailColor: '#fffff2',
                                                             backgroundColor: '#fb74a9'
                                                         })}/>;

export const ShowDetails = ({info, currentShowType}) => {
    const title = info.name || info.title;
    const genre = getGenreNames(info, currentShowType);
    const rating = info["vote_average"];
    const description = info.overview;
    const releaseDate = info["first_air_date"] || info["release_date"];
    const imagePath = info["poster_path"]
    const language = info["original_language"];

    return <section className="show_details">
        <img className="poster" src={imageUrlBuilder(imagePath)} alt={title}/>
        <section className="show_info">
            <p className="description">{description}</p>
            <h4>{genre}</h4>
            {createProgressBar(rating)}
            <h4 className="language">Language: {language.toUpperCase()}</h4>
            <h4>Release Date: {releaseDate}</h4>
        </section>
    </section>
}