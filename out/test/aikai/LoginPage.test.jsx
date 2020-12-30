import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { LoginPage } from "../LoginPage";

describe("Login Page", () => {
  let updateLocation, setIsUserLoggedIn, props;
  beforeEach(() => {
    fetchMock.doMock();
    setIsUserLoggedIn = jest.fn();
    updateLocation = jest.fn();
    props = {
      setIsUserLoggedIn,
      updateLocation,
    };
  });

  afterEach(() => {
    cleanup();
    setIsUserLoggedIn.mockClear();
    updateLocation.mockClear();
  });

  it("Snapshot Test", function () {
    const { container } = render(<LoginPage {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should added error classes to credentials if they are empty or blank ", async () => {
    fetch.mockResponse("", { status: 200 });
    const { getByTestId, getByPlaceholderText } = render(
      <LoginPage {...props} />
    );
    let username = getByPlaceholderText("Enter Username");
    let password = getByPlaceholderText("Enter Password");
    const loginButton = getByTestId("login_button");

    fireEvent.change(username, { target: { value: "" } });
    fireEvent.change(password, { target: { value: "" } });
    fireEvent.click(loginButton);

    username = getByPlaceholderText("Enter Username");
    password = getByPlaceholderText("Enter Password");

    expect(username.className.includes("error")).toBeTruthy();
    expect(password.className.includes("error")).toBeTruthy();

    fireEvent.change(username, { target: { value: "  " } });
    fireEvent.change(password, { target: { value: "  " } });
    fireEvent.click(loginButton);

    username = getByPlaceholderText("Enter Username");
    password = getByPlaceholderText("Enter Password");

    expect(username.className.includes("error")).toBeTruthy();
    expect(password.className.includes("error")).toBeTruthy();
  });

  it("should show success alert when the login works", async () => {
    fetch.mockResponse("", { status: 200 });
    const { getByTestId, getByPlaceholderText } = render(
      <LoginPage {...props} />
    );
    const username = getByPlaceholderText("Enter Username");
    const password = getByPlaceholderText("Enter Password");
    const loginButton = getByTestId("login_button");

    fireEvent.change(username, { target: { value: "test" } });
    fireEvent.change(password, { target: { value: "test" } });
    fireEvent.click(loginButton);

    const successAlert = await waitFor(() => getByTestId("success-alert"));
    expect(successAlert).toBeDefined();
  });

  it("should show error alert when the login fails", async () => {
    fetch.mockResponse("", { status: 401 });
    const { getByTestId, getByPlaceholderText } = render(
      <LoginPage {...props} />
    );
    const username = getByPlaceholderText("Enter Username");
    const password = getByPlaceholderText("Enter Password");
    const loginButton = getByTestId("login_button");

    fireEvent.change(username, { target: { value: "test" } });
    fireEvent.change(password, { target: { value: "test" } });
    fireEvent.click(loginButton);

    const errorAlert = await waitFor(() => getByTestId("error-alert"));
    expect(errorAlert).toBeDefined();
    expect(setIsUserLoggedIn).not.toHaveBeenCalled();
    expect(updateLocation).not.toHaveBeenCalledWith("/login");
  });

  it("should render registration when clicked on create account", async () => {
    const { getByTestId } = render(<LoginPage {...props} />);
    const createAccount = getByTestId("create_account");
    fireEvent.click(createAccount);

    expect(updateLocation).not.toHaveBeenCalledWith("/login");
    expect(updateLocation).toHaveBeenCalledWith("/register");
  });
});
