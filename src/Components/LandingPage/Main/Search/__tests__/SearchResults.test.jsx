import {cleanup, fireEvent, render, waitFor} from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import {searchResultsMockData} from "../../../../../lib/testHelper";
import {SearchResults} from "../SearchResults";

describe("Search Results", () => {
  let setHomePageLoaded, setCurrentShowId, setCurrentShowType,setCurrentMenuItem;

  beforeEach(() => {
    fetchMock.doMock();
    setHomePageLoaded = jest.fn();
    setCurrentShowId = jest.fn();
    setCurrentShowType = jest.fn();
    setCurrentMenuItem = jest.fn();
  });

  afterEach(() => {
    cleanup()
    setHomePageLoaded.mockClear();
    setCurrentShowId.mockClear();
    setCurrentShowType.mockClear();
    setCurrentMenuItem.mockClear();
  });

  it("Snapshot Test", () => {
    fetch.mockResponse(JSON.stringify(searchResultsMockData), {status: 200});
    const {container} = render(<SearchResults currentShowTitle="love"/>);
    expect(container).toMatchSnapshot();
  });

  it("should maximize movies section and show movie posters by default", async () => {
    fetch.mockResponse(JSON.stringify(searchResultsMockData), {status: 200});
    const {getByTestId, getAllByTestId} = render(<SearchResults currentShowTitle="love" homepageLoaded={true}/>);

    const showResults = await waitFor(() => getByTestId("show_results"));
    const sectionedPosters = await waitFor(() => getAllByTestId("sectioned_posters"));

    expect(showResults).toBeDefined();
    expect(sectionedPosters.length).toBe(2);
    expect(sectionedPosters[0].childElementCount).toBe(6);
  });

  it("should maximize tv section and minimize movie section when click on tv bar", async () => {
    fetch.mockResponse(JSON.stringify(searchResultsMockData), {status: 200});
    const {getAllByTestId} = render(<SearchResults currentShowTitle="love" homepageLoaded={true}
                                                   setHomePageLoaded={setHomePageLoaded}/>);

    fireEvent.click(await waitFor(() => getAllByTestId("action_button")[1]));

    const tv = await waitFor(() => getAllByTestId("action_symbol")[1]);
    const movie = await waitFor(() => getAllByTestId("action_symbol")[0]);
    expect(movie.className.includes("minimized")).toBeTruthy()
    expect(tv.className.includes("minimized")).toBeFalsy()
  });

  it("should set setCurrentShowId when clicked on a poster", async () => {
    fetch.mockResponse(JSON.stringify(searchResultsMockData), {status: 200});
    const {getAllByTestId} = render(<SearchResults currentShowTitle="love" homepageLoaded={true}
                                                   setCurrentShowId={setCurrentShowId}
                                                   setHomePageLoaded={setHomePageLoaded}
                                                   setCurrentShowType={setCurrentShowType}
                                                   setCurrentMenuItem={setCurrentMenuItem}/>);

    const sectionedPosters = await waitFor(() => getAllByTestId("sectioned_posters"));
    fireEvent.click(sectionedPosters[0].firstChild)
    expect(setCurrentShowId).toHaveBeenCalledWith(searchResultsMockData.results[0].id);
  });
})