import { cleanup, render, waitFor, fireEvent } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { WatchListComponent } from "../WatchListComponent";

describe("Watchlist Component", () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  afterEach(() => {
    cleanup();
    fetch.resetMocks();
  });

  it("Snapshot Test", () => {
    fetch.mockResponse(JSON.stringify([{ title: "Gone Girl" }]));
    const { container } = render(
      <WatchListComponent isUserLoggedIn={true} title="Gone Girl" />
    );
    expect(container).toMatchSnapshot();
  });

  it("should show add to watchlist if not added to watchlist", async () => {
    fetch.mockResponse(JSON.stringify([{ title: "Duh" }]));
    const { getByTestId } = render(
      <WatchListComponent isUserLoggedIn={true} title="Gone Girl" />
    );
    const addToWatchList = await waitFor(() => getByTestId("add_to_watchlist"));
    expect(addToWatchList).toBeDefined();
  });

  it("should show on watchlist if added to watchlist", async () => {
    fetch.mockResponse(JSON.stringify([{ title: "Gone Girl" }]));
    const { getByTestId } = render(
      <WatchListComponent isUserLoggedIn={true} title="Gone Girl" />
    );
    const onWatchList = await waitFor(() => getByTestId("on_watchlist"));
    expect(onWatchList).toBeDefined();
  });

  it("should show add to watchlist when click on add to watchlist", async () => {
    fetch.mockResponses(
      [JSON.stringify([{ title: "Tre" }]), { status: 200 }],
      ["", { status: 200 }]
    );
    const { getByTestId } = render(
      <WatchListComponent isUserLoggedIn={true} title="Gone Girl" />
    );
    const addToWatchList = await waitFor(() => getByTestId("add_to_watchlist"));
    fireEvent.click(addToWatchList);

    const onWatchList = await waitFor(() => getByTestId("on_watchlist"));
    expect(onWatchList).toBeDefined();
  });
});
