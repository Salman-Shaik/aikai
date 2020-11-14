import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    setTimeout(() => ReactDOM.unmountComponentAtNode(div), 10);
  });

  it("App Snapshot Test", () => {
    fetch.mockResponse(JSON.stringify(new TypeError()), { status: 400 });
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
