import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { searchResultsMockData } from "../../../../../lib/testHelper";
import { SearchResults } from "../SearchResults";

describe("Search Results", () => {
  let setHomePageLoaded, updateLocation;

  beforeEach(() => {
    fetchMock.doMock();
    setHomePageLoaded = jest.fn();
    updateLocation = jest.fn();
  });

  afterEach(() => {
    cleanup();
    setHomePageLoaded.mockClear();
    updateLocation.mockClear();
  });

  it("Snapshot Test", () => {
    fetch.mockResponse(JSON.stringify(searchResultsMockData), { status: 200 });
    const { container } = render(<SearchResults currentShowTitle="love" />);
    expect(container).toMatchSnapshot();
  });

  it("should set setCurrentShowId when clicked on a poster", async () => {
    fetch.mockResponse(JSON.stringify(searchResultsMockData), { status: 200 });
    const { getAllByTestId } = render(
      <SearchResults
        currentShowTitle="love"
        homepageLoaded={true}
        updateLocation={updateLocation}
        setHomePageLoaded={setHomePageLoaded}
      />
    );

    const sectionedPosters = await waitFor(() =>
      getAllByTestId("sectioned_posters")
    );
    fireEvent.click(sectionedPosters[0].firstChild);
    expect(document.cookie).toBe("showType=movie; showId=59315");
  });
});
