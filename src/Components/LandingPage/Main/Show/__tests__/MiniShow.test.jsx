import { render } from "@testing-library/react";
import React from "react";
import { MiniShow } from "../MiniShow";
describe("Mini Show", () => {
  it("Snapshot Test", function () {
    const { container } = render(<MiniShow />);
    expect(container).toMatchSnapshot();
  });

  it("should render a mini show component", () => {
    const title = "Shazam!";
    const { getByAltText, getByTestId } = render(<MiniShow title={title} />);
    const poster = getByAltText(title);
    const titleComponent = getByTestId("title");
    expect(poster).toBeDefined();
    expect(titleComponent.innerHTML).toBe(title);
  });

  it("should render a mini show component with actions", () => {
    const { getByTestId, queryByTestId } = render(<MiniShow favFlag={true} />);
    const like = getByTestId("favorite");
    const unlike = queryByTestId("unlike");
    expect(like).toBeDefined();
    expect(unlike).toBeNull();
  });
});
