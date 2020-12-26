import Tooltip from "@material-ui/core/Tooltip";
import { LiveTvOutlined, TheatersRounded } from "@material-ui/icons";
import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "../../../../css/ShowDetails.css";
import {
  getGenreNames,
  imageUrlBuilder,
  onPosterError,
} from "../../../../lib/helper";
import { FavoriteComponent } from "./Actions/FavoriteComponent";
import { ShareComponent } from "./Actions/ShareComponent";
import { WatchListComponent } from "./Actions/WatchListComponent";
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
  updateLocation,
}) => {
  const id = info.id;
  const title = info.name || info.title;
  const genre = getGenreNames(info, currentShowType);
  const rating = info["vote_average"];
  const description = info.overview;
  const releaseDate = info["first_air_date"] || info["release_date"];
  const year = releaseDate.split("-")[0] || "Y.T.A";
  const imagePath = info["poster_path"];
  const language = info["original_language"];
  const homepage = info["homepage"];

  return (
    <section className="show_details" data-testid="show_details">
      <section className="show_specifics" data-testid="show_specifics">
        <img
          className="poster"
          src={imageUrlBuilder(imagePath)}
          alt={title}
          title={title}
          onError={onPosterError}
        />
        <section className="show_info">
          <h2 className="show_title" data-testid="show_title">
            {`${title} (${year})`}
            {currentShowType === "movie" ? (
              <Tooltip title="Movie">
                <TheatersRounded className="show_type_movie" />
              </Tooltip>
            ) : (
              <Tooltip title="TV / Web Series">
                <LiveTvOutlined className="show_type_tv" />
              </Tooltip>
            )}
          </h2>
          <p className="description">{description}</p>
          <h4>{genre}</h4>
          {createProgressBar(rating)}
          <h4 className="language">Language: {language.toUpperCase()}</h4>
          <AvailableOn homePage={homepage} />
        </section>
      </section>
      <section className="show_actions" data-testid="show_actions">
        <FavoriteComponent
          id={id}
          title={title}
          posterPath={imagePath}
          isUserLoggedIn={isUserLoggedIn}
          updateLocation={updateLocation}
        />
        <WatchListComponent
          id={id}
          title={title}
          posterPath={imagePath}
          isUserLoggedIn={isUserLoggedIn}
          updateLocation={updateLocation}
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
