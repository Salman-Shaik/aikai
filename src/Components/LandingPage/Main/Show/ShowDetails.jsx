import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "../../../../css/ShowDetails.css";
import { getGenreNames, imageUrlBuilder } from "../../../../lib/helper";
import { FavoriteComponent } from "./Actions/FavoriteComponent";
import { ShareComponent } from "./Actions/ShareComponent";
import { WatchList } from "./Actions/WatchList";
import { AvailableOn } from "./AvailableOn";

const createProgressBar = (rating) => (
  <CircularProgressbar
    value={rating}
    maxValue={10}
    text={`${rating * 10}%`}
    className="progress_bar"
    styles={buildStyles({
      rotation: 0,
      strokeLinecap: "round",
      textSize: "22px",
      pathTransitionDuration: 0.5,
      pathColor: `#f85149`,
      textColor: "#ffffff",
      trailColor: "#8c1844",
      backgroundColor: "#ffe1ec",
    })}
  />
);

export const ShowDetails = ({
  info,
  currentShowType,
  isUserLoggedIn,
  setGotoLoginPage,
}) => {
  const id = info.id;
  const title = info.name || info.title;
  const genre = getGenreNames(info, currentShowType);
  const rating = info["vote_average"];
  const description = info.overview;
  const releaseDate = info["first_air_date"] || info["release_date"];
  const imagePath = info["poster_path"];
  const language = info["original_language"];
  const homepage = info["homepage"];

  return (
    <section className="show_details" data-testid="show_details">
      <section className="show_specifics" data-testid="show_specifics">
        <img className="poster" src={imageUrlBuilder(imagePath)} alt={title} />
        <section className="show_info">
          <h2 className="show_title" data-testid="show_title">
            {title}
          </h2>
          <p className="description">{description}</p>
          <h4>{genre}</h4>
          {createProgressBar(rating)}
          <h4 className="language">Language: {language.toUpperCase()}</h4>
          {/*<h4>Release Date: {releaseDate}</h4>*/}
          <AvailableOn homePage={homepage} />
        </section>
      </section>
      <section className="show_actions" data-testid="show_actions">
        <FavoriteComponent
          id={id}
          title={title}
          posterPath={imagePath}
          isUserLoggedIn={isUserLoggedIn}
          setGotoLoginPage={setGotoLoginPage}
        />
        <WatchList
          id={id}
          title={title}
          posterPath={imagePath}
          isUserLoggedIn={isUserLoggedIn}
          setGotoLoginPage={setGotoLoginPage}
        />
        <ShareComponent
          id={id}
          currentShowType={currentShowType}
          navigator={navigator}
        />
      </section>
    </section>
  );
};
