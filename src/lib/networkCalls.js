import { getJwtToken } from "./helper";

export const login = (
  username,
  password,
  setIsUserLoggedIn,
  updateLocation,
  setError,
  setSuccessMessage
) => {
  const body = { username, password };
  const loginHandler = ({ status }) => {
    if (status === 401) {
      setSuccessMessage("");
      setError("Invalid Credentials.");
    } else {
      setError("");
      setSuccessMessage("Login Success!");
      setTimeout(() => {
        setIsUserLoggedIn(true);
        updateLocation("/");
      }, 1000);
    }
  };
  const jwtToken = getJwtToken(body);
  fetch("/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then(loginHandler)
    .catch((e) => new TypeError(e));
};

export const logout = (
  setHomePageLoaded,
  setIsUserLoggedIn,
  updateLocation
) => {
  fetch("/logout", {
    method: "delete",
  })
    .then((res) => res.status)
    .then((st) => {
      if (st === 200) {
        setIsUserLoggedIn(false);
        setHomePageLoaded(true);
        updateLocation("/");
      }
    });
};

export const registerUser = (...args) => updateUserDetails(...args, "/register", "post", "Account Created!", "/login");

export const updateUser = (...args) => updateUserDetails(...args, "/details", "put", "User Details Updated!", "/");

export const updateUserDetails = (
  name,
  username,
  password,
  age,
  explicitFlag,
  languages,
  updateLocation,
  setSuccessMessage,
  url,
  method,
  successMessage,
  redirectUrl
) => {
  const jwtToken = getJwtToken({ username, password });
  fetch(url, {
    method: method,
    body: JSON.stringify({ name, age, explicitFlag, languages }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        setSuccessMessage(successMessage);
        setTimeout(() => {
          updateLocation(redirectUrl);
        }, 1000);
      }
    })
    .catch((e) => new TypeError(e));
};

export const setFavorite = (title, id, posterPath, setIsFavorite) => {
  fetch("/favorite", {
    method: "put",
    body: JSON.stringify({ title, id, posterPath }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.status === 200) {
        setIsFavorite(true);
      }
    })
    .catch((e) => new TypeError(e));
};

export const removeFavorite = (id, setIsFavorite, updateLocation) => {
  fetch("/favorite", {
    method: "delete",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.status === 200) {
        setIsFavorite(false);
        updateLocation("/favorite_shows");
      }
    })
    .catch((e) => new TypeError(e));
};

export const fetchUserFavorites = () =>
  fetch("/favorites")
    .then((res) => res.text())
    .then((data) => JSON.parse(data));

export const isFavoriteShow = (title, setIsFavorite) => {
  fetchUserFavorites()
    .then((favorites) => favorites.map((f) => f.title))
    .then((favorites) => {
      if (favorites.includes(title)) return setIsFavorite(true);
      setIsFavorite(false);
    })
    .catch((e) => new TypeError(e));
};

export const addToWatchList = (title, id, posterPath, setIsOnWatchList) => {
  fetch("/watch", {
    method: "put",
    body: JSON.stringify({ title, id, posterPath }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.status === 200) {
        setIsOnWatchList(true);
      }
    })
    .catch((e) => new TypeError(e));
};

const fetchUserWatchList = () => {
  return fetch("/watchlist")
    .then((r) => r.text())
    .then((d) => JSON.parse(d));
};

export const fetchWatchList = (
  setWatchList,
  setWatched,
  setLoaded,
  setHomePageLoaded
) => {
  fetchUserWatchList()
    .then((watchList) => {
      const watched = watchList.filter((w) => w.watched);
      const yetToWatch = watchList.filter((w) => !w.watched);
      setWatchList(yetToWatch);
      setWatched(watched);
      setLoaded(true);
      setHomePageLoaded(true);
    })
    .catch((e) => new TypeError(e));
};

export const isShowOnWatchList = (title, setIsOnWatchList) => {
  fetchUserWatchList()
    .then((watchListMap) => watchListMap.map((w) => w.title))
    .then((watchList) => {
      if (watchList.includes(title)) {
        return setIsOnWatchList(true);
      }
      setIsOnWatchList(false);
    })
    .catch((e) => new TypeError(e));
};

export const markWatched = (id, updateLocation) => {
  fetch("/watched", {
    method: "put",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  })
    .then((r) => {
      if (r.status === 200) {
        updateLocation("/watch_list");
      }
    })
    .catch((e) => new TypeError(e));
};

export const fetchDetails = (
  setAge,
  setExplicitFlag,
  setLanguages,
  setName,
  setDisabled,
  setLoaded,
  setHomePageLoaded
) => {
  fetch("/user_details")
    .then((res) => res.text())
    .then((d) => JSON.parse(d))
    .then((details) => {
      const { languages, age, name, explicitFlag } = details;
      setAge(age);
      setDisabled(age < 18);
      setExplicitFlag(explicitFlag);
      setLanguages(languages);
      setName(name);
      setLoaded(true);
      setHomePageLoaded(true);
    })
    .catch((e) => new TypeError(e));
};
