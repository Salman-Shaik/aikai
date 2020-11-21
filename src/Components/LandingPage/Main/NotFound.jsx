import React from "react";
import "../../../css/NotFound.css";

export const NotFound = () => {
  return (
    <section className="not-found">
      <section className="info-section">
        <h3 className="title_of_the_page">
          Hey there! You have come very far.
        </h3>
        <h4 className="description_of_the_page">
          Go back to{" "}
          <a href="/" className="links_to_pages">
            home.
          </a>
        </h4>
        <h4 className="description_of_the_page">
          or, you can look at our{" "}
          <a href="/editors_choice" className="links_to_pages">
            Editor's Suggestions
          </a>
          . He thinks he has a good taste.
        </h4>
      </section>
    </section>
  );
};
