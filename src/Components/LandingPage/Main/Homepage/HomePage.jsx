import _ from "lodash";
import React from "react";
import "../../../../css/HomePage.css";
import { IntroductionPage } from "./IntroductionPage";

const InfoSection = ({ description, onClick }) => {
  return (
    <section className="info_section">
      <p className="page_info">{description}</p>
      <button type="button" className="visit" onClick={onClick}>
        Visit →
      </button>
    </section>
  );
};

const Page = ({ keyword, image, alt, description, onClick }) => {
  return (
    <section id={keyword} className="page">
      <section className={keyword}>
        <img src={image} alt={alt} className={`${keyword}_image`} />
        <InfoSection description={description} onClick={onClick} />
      </section>
    </section>
  );
};

const NowPlayingPage = ({ updateLocation }) => (
  <Page
    keyword="now-playing"
    image="nowPlaying.jpg"
    alt="Now Playing"
    description="Wanna know what's playing in Theatres or which TV show is airing today."
    onClick={() => updateLocation("/now_playing")}
  />
);

const ShowPage = ({ image1, image2, description, updateLocation, type }) => {
  return (
    <section className="show-page">
      <section className="examples">
        <img
          src={image1}
          alt={`Top Rated ${_.capitalize(type)}`}
          className="show_example"
        />
        <img
          src={image2}
          alt={`Random ${_.capitalize(type)}`}
          className="show_example"
        />
      </section>
      <InfoSection description={description} onClick={() => updateLocation()} />
    </section>
  );
};

const MoviesPage = ({ updateLocation }) => (
  <ShowPage
    image1="movies-top.jpg"
    image2="movies-random.jpg"
    description="Puzzled which Movie to watch? We are here to help you."
    updateLocation={() => updateLocation("/movies")}
    type="movie"
  />
);

const TVPage = ({ updateLocation }) => (
  <ShowPage
    image1="tv-top.jpg"
    image2="tv-random.jpg"
    description="Want to watch a TV / Web Series. We got your back with suggestions."
    updateLocation={() => updateLocation("/tv_shows")}
    type="tv"
  />
);

const EditorsChoicePage = ({ updateLocation }) => (
  <Page
    keyword="editors_choice"
    image="editorsChoice.jpg"
    alt="Editor's Choice"
    description="Recommendations from the Editor, he says these are best he has ever seen. Do you believe him?"
    onClick={() => updateLocation("/editors_choice")}
  />
);

const ActionsPage = ({ updateLocation, action, description }) => {
  return (
    <section id={action} className="page">
      <section className={action}>
        <img src={`${action}.jpg`} alt={action} className="action_image" />
        <InfoSection
          description={description}
          onClick={() => updateLocation()}
        />
      </section>
    </section>
  );
};

const FavoritesPage = ({ updateLocation }) => {
  return (
    <ActionsPage
      updateLocation={() => updateLocation("/favorite_shows")}
      description="You can add a movie or a tv shows to your favorites list but you need to login first."
      action="favorites"
    />
  );
};

const WatchListPage = ({ updateLocation }) => {
  return (
    <ActionsPage
      updateLocation={() => updateLocation("/watch_list")}
      description="You can keep a track of all the movies or tv shows which you want to watch in future but you need to login first."
      action="watchlist"
    />
  );
};

const WaveComponent = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#EB2F53"
        fillOpacity="1"
        d="M0,64L48,58.7C96,53,192,43,288,69.3C384,96,480,160,576,160C672,160,768,96,864,106.7C960,117,1056,203,1152,224C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  );
};

const Footer = () => {
  return (
    <section className="feature_page">
      <section className="features">
        <span className="features_header">Features coming soon</span>
        <ul className="feature_list">
          <li className="feature">Subscriptions</li>
          <li className="feature">New Features are yet to add</li>
        </ul>
      </section>
      <section className="feedback">
        <span className="feedback_header">
          Feedback makes A.I.K.A.I perfect
        </span>
        <button
          type="button"
          className="feedback_button"
          onClick={() =>
            window.open("https://forms.gle/MAiEH8fJDmZc6oda6", "_blank")
          }
        >
          Share feedback
        </button>
      </section>
      <span className="signature">
        Made by{" "}
        <a
          href="https://github.com/Salman-Shaik"
          target="_blank"
          rel="noopener noreferrer"
          className="profile_link"
        >
          Salman Shaik
        </a>
      </span>
      <WaveComponent />
    </section>
  );
};

export const HomePage = ({ updateLocation }) => {
  return (
    <section className="homepage">
      <IntroductionPage />
      <NowPlayingPage updateLocation={updateLocation} />
      <MoviesPage updateLocation={updateLocation} />
      <TVPage updateLocation={updateLocation} />
      <EditorsChoicePage updateLocation={updateLocation} />
      <FavoritesPage updateLocation={updateLocation} />
      <WatchListPage updateLocation={updateLocation} />
      <Footer />
    </section>
  );
};
