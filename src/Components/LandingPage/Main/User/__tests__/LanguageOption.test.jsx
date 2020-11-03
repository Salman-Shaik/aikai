import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { LanguageOption } from "../LanguageOption";

describe("Language Option", () => {
  let addLanguage, removeLanguage, props;

  beforeEach(() => {
    addLanguage = jest.fn();
    removeLanguage = jest.fn();
    props = {
      addLanguage,
      removeLanguage,
      text: "English",
    };
  });

  afterEach(() => {
    cleanup();
    addLanguage.mockClear();
    removeLanguage.mockClear();
  });

  it("Snapshot Test", function () {
    const { container } = render(<LanguageOption {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should show unselected symbol if clicked on selected", () => {
    const { getByTestId } = render(<LanguageOption {...props} />);
    let notSelected = getByTestId("not_selected");
    fireEvent.click(notSelected);

    const selectedIcon = getByTestId("selected");
    fireEvent.click(selectedIcon);

    notSelected = getByTestId("not_selected");
    expect(notSelected).toBeDefined();
    expect(removeLanguage).toHaveBeenCalledWith("English");
  });

  it("should show selected symbol if clicked on unselected", () => {
    const { getByTestId } = render(<LanguageOption {...props} />);
    const notSelected = getByTestId("not_selected");
    fireEvent.click(notSelected);

    const selected = getByTestId("selected");
    expect(selected).toBeDefined();
    expect(addLanguage).toHaveBeenCalledWith("English");
  });
});
