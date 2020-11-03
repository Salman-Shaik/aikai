import {render} from "@testing-library/react";
import React from "react";
import {HomePage} from "../HomePage";

describe("Homepage", () => {
  it("Snapshot Test", () => {
    const {container} = render(<HomePage/>);
    expect(container).toMatchSnapshot();
  });
})