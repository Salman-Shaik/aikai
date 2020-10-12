import React from "react";

export const MinimizeActionButton = ({minimizeMethod, anchorText, minimized}) => {
  return <section className="action_button" onClick={minimizeMethod}>
    <span className="action_anchor">{anchorText}</span>
    <span className={`action_symbol ${minimized ? "minimized" : ""}`}>⌃</span>
  </section>;
};