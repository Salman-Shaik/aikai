import React from "react";

export const MinimizeActionButton = ({
  minimizeMethod,
  anchorText,
  minimized,
  className,
}) => {
  return (
    <section
      className={className}
      onClick={minimizeMethod}
      data-testid={className}
    >
      <span className="action_anchor">{anchorText}</span>
      <span
        className={`action_symbol ${minimized ? "minimized" : ""}`}
        data-testid="action_symbol"
      >
        ⌃
      </span>
    </section>
  );
};
