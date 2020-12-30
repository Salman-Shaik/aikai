import { render } from "@testing-library/react";
import React from "react";
import { AvailableOn } from "../AvailableOn";

describe("Available On", () => {
  it("Snapshot Test", function () {
    const { container } = render(<AvailableOn homePage="" />);
    expect(container).toMatchSnapshot();
  });

  it("should return a empty span when the homepage is not recognized or empty", () => {
    const { container } = render(<AvailableOn homePage="" />);
    const emptySpan = container.querySelector(`span`);
    expect(emptySpan).toBeDefined();
  });

  it("should return Netflix Image when the homepage is netflix link", () => {
    const { getByAltText } = render(<AvailableOn homePage="netflix.com" />);
    const netflixImage = getByAltText("Netflix");
    expect(netflixImage).toBeDefined();
  });

  it("should return Prime Image when the homepage is netflix link", () => {
    const { getByAltText } = render(<AvailableOn homePage="primevideo.com" />);
    const primeImage = getByAltText("Prime video");
    expect(primeImage).toBeDefined();
  });

  it("should return Disney Image when the homepage is netflix link", () => {
    const { getByAltText } = render(<AvailableOn homePage="disney.com" />);
    const disneyImage = getByAltText("Disney +");
    expect(disneyImage).toBeDefined();
  });
});
