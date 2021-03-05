import React from "react";
import "../css/MobileHomepage.css";
export const MobileHomepage = () => {
  return <section className={"mobile_homepage"}>
    <section className={"mobile_header"}>
      <img
        src={`favicon.png`}
        alt="icon"
        className="mobile_header_logo"
      />
      <h2 className="mobile_header_text">
        A.I.K.A.I
      </h2>
    </section>
    <img
      src={`mockup.png`}
      alt="icon"
      className="mobile_mockup"
    />
    {/*<section>links</section>*/}
    {/*<section>*/}
    {/*  <h3>Why A.I.K.A.I?</h3>*/}
    {/*</section>*/}
  </section>
}