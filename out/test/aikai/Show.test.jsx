import { cleanup, render, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { showMockData } from "../../../../../lib/testHelper";
import { Show } from "../Show";

describe("Show", () => {
  let props;
  beforeEach(() => {
    props = {
      currentShowId: 12345,
      currentShowType: "movies",
      homepageLoaded: true,
    };
    fetchMock.doMock();
  });

  afterEach(() => {
    cleanup();
    fetch.resetMocks();
  });

  it("Snapshot Test", () => {
    fetch.mockResponse(JSON.stringify(showMockData), { status: 200 });
    const { container } = render(<Show {...props} />);
    expect(container).toMatchSnapshot();
  });
  // TODO: fix this
  it.skip("should show section for valid show request", async () => {
    fetch.mockResponses(
      [JSON.stringify(showMockData), { status: 200 }],
      [JSON.stringify({ results: [] }), { status: 200 }],
      [JSON.stringify({ results: [] }), { status: 200 }]
    );
    const { getByTestId } = render(<Show {...props} />);

    await waitFor(() => getByTestId("show_details"));
    await waitFor(() => getByTestId("recommended_movies"));
    await waitFor(() => getByTestId("similar_movies"));
  });

  it("should invalid query notice for invalid show request", async () => {
    fetch.mockResponse(JSON.stringify({ status_code: 34 }), { status: 200 });
    const { getByTestId } = render(<Show {...props} />);
    const invalidNotice = await waitFor(() => getByTestId("invalid_query"));
    expect(invalidNotice.innerHTML).toBe(
      "Invalid Show: Check The Your Search Query."
    );
  });
});
