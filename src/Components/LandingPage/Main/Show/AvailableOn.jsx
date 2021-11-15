import Tooltip from "@material-ui/core/Tooltip";
import React, { useEffect, useState } from "react";
import { fetchOttPlatforms } from "../../../../lib/showNetworkCalls";

export const AvailableOn = ({ country, type, id }) => {
  const [ott, setOtt] = useState("");

  useEffect(async () => {
    await fetchOttPlatforms(country, type, id, setOtt);
  }, []);

  const isNetflix = () => ott.includes("Netflix");
  const isDisneyPlus = () =>
    ott.includes("Disney Plus") || ott.includes("Hotstar");
  const isPrimeVideo = () => ott.includes("Amazon Prime Video");

  return isNetflix() || isPrimeVideo() || isDisneyPlus() ? (
    <section className="available_on">
      <h4>Available On: </h4>
      {isNetflix() && (
        <Tooltip title="May Require Subscription.">
          <img src={`/Netflix.png`} alt="Netflix" className="stream" />
        </Tooltip>
      )}
      {isPrimeVideo() && (
        <Tooltip title="May Require Subscription.">
          <img src={`/Prime.png`} alt="Prime video" className="stream prime" />
        </Tooltip>
      )}
      {isDisneyPlus() && (
        <Tooltip title="May Require Subscription.">
          <img src={`/Disney+.jpg`} alt="Disney +" className="stream prime" />
        </Tooltip>
      )}
    </section>
  ) : (
    <span />
  );
};
