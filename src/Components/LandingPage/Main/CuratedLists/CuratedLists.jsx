import React, { useEffect, useState } from "react";
import { List } from "./List";
import "../../../../css/CuratedLists.css";
import { getCuratedLists } from "../../../../lib/helper";
import { list } from "../../../../data/editorsChoice.json";

export const CuratedLists = () => {
  let [curatedLists, setCuratedLists] = useState({});

  useEffect(() => {
    setCuratedLists(getCuratedLists());
  }, []);

  return (
    <section className={"curated_lists"}>
      {Object.values(curatedLists).map(
        ({ moviesAndShows, description, title }) => (
          <List
            title={title}
            description={description}
            items={moviesAndShows}
          />
        )
      )}
      <List
        title={"Editor's Choice"}
        description={"Movies And TV Show recommendations from Editor"}
        items={list}
      />
    </section>
  );
};
