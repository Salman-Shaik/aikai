import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AboutUs } from "./AboutUs";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { RefundPolicy } from "./RefundPolicy";
import { TermsAndConditions } from "./TermsAndConditions";

const Component = () => (
  <>
    <img src={`mockup.png`} alt="icon" className="mobile_mockup" />
    <section className={"policies"}>
      <a
        href="mailto: lightmasters.aikai@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mobile_policy_link"
      >
        Contact Us
      </a>
      <a
        href="/terms_and_conditions"
        target="_blank"
        rel="noopener noreferrer"
        className="mobile_policy_link"
      >
        Terms & Conditions
      </a>
      <a
        href="/privacy_policy"
        target="_blank"
        rel="noopener noreferrer"
        className="mobile_policy_link"
      >
        Privacy Policy
      </a>
      <a
        href="/refund_policy"
        target="_blank"
        rel="noopener noreferrer"
        className="mobile_policy_link"
      >
        Refund Policy
      </a>
    </section>
  </>
);

export const Main = () => {
  return (
    <main className="main_container">
      <Router>
        <Switch>
          <Route
            path="/terms_and_conditions"
            render={() => <TermsAndConditions />}
          />
          <Route path="/privacy_policy" render={() => <PrivacyPolicy />} />
          <Route path="/refund_policy" render={() => <RefundPolicy />} />
          <Route path="/about_us" render={() => <AboutUs />} />
          <Route path="/" render={() => <Component />} />
        </Switch>
      </Router>
    </main>
  );
};