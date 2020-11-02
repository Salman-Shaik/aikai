import Tooltip from "@material-ui/core/Tooltip";
import React from "react";

export const AvailableOn = ({ homePage }) => {
  const isNetflix = () => homePage.includes("netflix");
  const isDisneyPlus = () => homePage.includes("disney");
  const isPrimeVideo = () =>
    homePage.includes("amazon") || homePage.includes("primevideo");
  const goToHomepage = () => window.open(homePage);

  return isNetflix() || isPrimeVideo() || isDisneyPlus() ? (
    <section className="available_on">
      <h4>Available On: </h4>
      {isNetflix() && (
        <Tooltip title="May Require Subscription.">
          <img
            src={`/Netflix.png`}
            alt="Netflix"
            className="stream"
            onClick={goToHomepage}
          />
        </Tooltip>
      )}
      {isPrimeVideo() && (
        <Tooltip title="May Require Subscription.">
          <img
            src={`/Prime.png`}
            alt="Prime video"
            className="stream prime"
            onClick={goToHomepage}
          />
        </Tooltip>
      )}
      {isDisneyPlus() && (
        <Tooltip title="May Require Subscription.">
          <img
            src={`/Disney+.jpg`}
            alt="Disney +"
            className="stream prime"
            onClick={goToHomepage}
          />
        </Tooltip>
      )}
    </section>
  ) : (
    <span />
  );
};
