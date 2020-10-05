import React from "react";
import "../../../../css/IntroductionPage.css";
import { LinkMenu } from "./LinkMenu";

export const IntroductionPage = () => {
  return (
    <section className="introduction_page">
      <section className="introduction">
        <span className="heading">Random Movie / TV Show Generator</span>
        <p className="info">
          Confused what to watch today, want to know the details of a movie/tv
          show, want to get recommendations for a movie/tv show, want to know
          what's playing in theatres or what's airing on TV. You can get all of
          them here @ A.I.K.A.I .
        </p>
        <LinkMenu />
      </section>
    </section>
  );
};
