const fetchMock = require("jest-fetch-mock");
fetchMock.enableMocks();

const originalConsoleError = console.error;

console.error = (message) => {
  if (
    /(Failed prop type)/.test(message) &&
    /(is marked as required)/.test(message)
  ) {
    throw new Error(message);
  } else if (/Warning.*not wrapped in act/.test(message)) {
    return;
  } else if (/Error: Not implemented: window.scrollTo.*/) {
    return;
  } else if (
    /Warning: You seem to have overlapping act.* calls, this is not supported. Be sure to await previous act.* calls before making a new one./.test(
      message
    )
  ) {
    return;
  }

  originalConsoleError(message);
};
