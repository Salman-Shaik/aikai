import React from "react";
import { List } from "./List";
import "../../../../css/CuratedLists.css";
import { list } from "../../../../data/editorsChoice.json";

export const CuratedLists = ({ curatedLists, updateLocation }) => {
  return (
    <section className={"curated_lists"}>
      {Object.values(curatedLists).map(
        ({ moviesAndShows, description, title }) => (
          <List
            title={title}
            description={description}
            items={moviesAndShows}
            updateLocation={updateLocation}
          />
        )
      )}
      <List
        title={"Editor's Choice"}
        description={"Movies And TV Show recommendations from Editor"}
        items={list}
        updateLocation={updateLocation}
      />
    </section>
  );
};
