import React from "react";
import { Link } from "react-scroll";
import "../../../../css/LinkMenu.css";

const LinkButton = ({ id, text, childNumber }) => {
  return (
    <Link
      activeClass="active"
      className="link"
      to={id}
      spy={true}
      smooth={true}
      offset={-70}
      duration={childNumber * 500}
    >
      <span>{text}</span>
    </Link>
  );
};

export const LinkMenu = () => (
  <section className="menu">
    <LinkButton id="now-playing" text="Now Playing" childNumber={1} />
    <LinkButton id="random" text="Random" childNumber={2} />
    <LinkButton id="top_rated" text="Top Rated" childNumber={3} />
    <LinkButton id="editors_choice" text="Editor's Choice" childNumber={4} />
    <LinkButton id="favorites" text="Favorites" childNumber={5} />
    {/*<LinkButton id="watchlist" text="Watchlist" childNumber={6} disabled={true}/>*/}
  </section>
);
