import { render } from "@testing-library/react";
import React from "react";
import { IntroductionPage } from "../IntroductionPage";

describe("Introduction Page", () => {
  it("Snapshot Test", () => {
    const { container } = render(<IntroductionPage />);
    expect(container).toMatchSnapshot();
  });
});
