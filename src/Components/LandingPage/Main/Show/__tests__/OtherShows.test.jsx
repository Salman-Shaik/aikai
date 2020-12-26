import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { otherShowsMockData } from "../../../../../lib/testHelper";
import { OtherShows } from "../OtherShows";

describe("Other Shows", () => {
  let props, setHomePageLoaded, updateLocation;

  beforeEach(() => {
    updateLocation = jest.fn();
    setHomePageLoaded = jest.fn();
    props = {
      showId: 12345,
      currentShowType: "movie",
      homepageLoaded: true,
      updateLocation,
      setHomePageLoaded,
    };

    fetchMock.doMock();
  });

  afterEach(() => {
    cleanup();
    updateLocation.mockClear();
    setHomePageLoaded.mockClear();
    fetch.resetMocks();
  });

  it("Snapshot Test", () => {
    fetch.mockResponse(JSON.stringify(otherShowsMockData), { status: 200 });
    const { container } = render(<OtherShows {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should render four mini shows", async () => {
    fetch.mockResponse(JSON.stringify(otherShowsMockData), { status: 200 });
    const { getByTestId } = render(<OtherShows {...props} />);

    const mini_shows = await waitFor(() => getByTestId("mini_shows"));
    expect(mini_shows.childElementCount).toBe(4);
  });

  it("should render notice on empty shows", async () => {
    fetch.mockResponse(JSON.stringify({ results: [] }), { status: 200 });
    const { getByTestId } = render(<OtherShows {...props} />);

    const notice = await waitFor(() => getByTestId("empty"));
    expect(notice.innerHTML).toBe("No  Movies");
  });

  it("should set current show Id when clicked on a mini show", async () => {
    fetch.mockResponse(JSON.stringify(otherShowsMockData), { status: 200 });
    const { getAllByTestId } = render(<OtherShows {...props} />);

    const mini_poster = await waitFor(() => getAllByTestId("mini_poster")[0]);
    fireEvent.click(mini_poster);

    expect(document.cookie).toBe("showId=123; showType=movie");
  });
});
