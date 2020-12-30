import { cleanup, render, waitFor, fireEvent } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { FavoriteComponent } from "../FavoriteComponent";

describe("Favorite Component", () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  afterEach(() => {
    cleanup();
    fetch.resetMocks();
  });

  it("Snapshot Test", function () {
    fetch.mockResponse(JSON.stringify([{ title: "Gone Girl" }]));
    const { container } = render(
      <FavoriteComponent isUserLoggedIn={true} title="Gone Girl" />
    );
    expect(container).toMatchSnapshot();
  });

  it("should show unliked symbol if not a liked movie", async () => {
    fetch.mockResponse(JSON.stringify([{ title: "Duh" }]));
    const { getByTestId } = render(
      <FavoriteComponent isUserLoggedIn={true} title="Gone Girl" />
    );
    const unlikedIcon = await waitFor(() => getByTestId("not_favorite"));
    expect(unlikedIcon).toBeDefined();
  });

  it("should show liked symbol if a liked movie", async () => {
    fetch.mockResponse(JSON.stringify([{ title: "Gone Girl" }]));
    const { getByTestId } = render(
      <FavoriteComponent isUserLoggedIn={true} title="Gone Girl" />
    );
    const likedIcon = await waitFor(() => getByTestId("favorite"));
    expect(likedIcon).toBeDefined();
  });

  it("should show unliked symbol if clicked on like", async () => {
    fetch.mockResponses(
      [JSON.stringify([{ title: "Gone Girl" }]), { status: 200 }],
      ["", { status: 200 }]
    );
    const { getByTestId } = render(
      <FavoriteComponent isUserLoggedIn={true} title="Gone Girl" />
    );
    const likedIcon = await waitFor(() => getByTestId("favorite"));
    fireEvent.click(likedIcon);

    const unlikedIcon = await waitFor(() => getByTestId("not_favorite"));
    expect(unlikedIcon).toBeDefined();
  });

  it("should show liked symbol if clicked on unlike", async () => {
    fetch.mockResponses(
      [JSON.stringify([{ title: "Tre" }]), { status: 200 }],
      ["", { status: 200 }]
    );
    const { getByTestId } = render(
      <FavoriteComponent isUserLoggedIn={true} title="Gone Girl" />
    );
    const unlikedIcon = await waitFor(() => getByTestId("not_favorite"));
    fireEvent.click(unlikedIcon);

    const likedIcon = await waitFor(() => getByTestId("favorite"));
    expect(likedIcon).toBeDefined();
  });
});
