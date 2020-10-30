import React from "react";

export const MinimizeActionButton = ({
  minimizeMethod,
  anchorText,
  minimized,
  className,
}) => {
  return (
    <section className={className} onClick={minimizeMethod}>
      <span className="action_anchor">{anchorText}</span>
      <span className={`action_symbol ${minimized ? "minimized" : ""}`}>⌃</span>
    </section>
  );
};
