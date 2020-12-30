import { cleanup, render } from "@testing-library/react";
import React from "react";
import { showMockData } from "../../../../../lib/testHelper";
import { Show } from "../Show";
import { ShowDetails } from "../ShowDetails";

describe("Show Details", () => {
  afterEach(() => {
    cleanup();
  });

  it("Snapshot Test", () => {
    const { container } = render(<Show info={showMockData} />);
    expect(container).toMatchSnapshot();
  });

  it("should render show Details successfully", () => {
    const { getByTestId, getByAltText } = render(
      <ShowDetails info={showMockData} currentShowType="movie" />
    );
    const releaseDate = showMockData.release_date;
    const year = releaseDate.split("-")[0] || "Y.T.A";
    const showSpecifics = getByTestId("show_specifics");
    const showActions = getByTestId("show_actions");
    const availableOn = getByAltText("Netflix");
    const showTitle = getByTestId("show_title");

    expect(showSpecifics).toBeDefined();
    expect(showActions).toBeDefined();
    expect(availableOn).toBeDefined();
    expect(showTitle.innerHTML).toBe(`${showMockData.title} ${year}`);
  });
});
