import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { ShareComponent } from "../ShareComponent";

describe("Share Component", () => {
  let navigatorMock;

  beforeEach(() => {
    navigatorMock = {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve()),
      },
    };
  });

  afterEach(() => {
    cleanup();
    navigatorMock.clipboard.writeText.mockClear();
  });

  it("Snapshot Test", () => {
    const { container } = render(
      <ShareComponent
        id={12345}
        currentShowType="tv"
        navigator={navigatorMock}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should copy movie link to clipboard on click", () => {
    const { getByTestId } = render(
      <ShareComponent
        id={12345}
        currentShowType="tv"
        navigator={navigatorMock}
      />
    );
    const shareComponent = getByTestId("share");
    fireEvent.click(shareComponent);
    expect(navigatorMock.clipboard.writeText).toHaveBeenCalledWith(
      "http://localhost/?showId=12345&showType=tv"
    );
  });
});
