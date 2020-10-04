import { getJwtToken } from "./helper";

export const login = (
  username,
  password,
  setIsUserLoggedIn,
  setGotoLoginPage,
  manager
) => {
  const body = { username, password };
  const loginHandler = ({ status }) => {
    if (status === 401) {
      manager.error("Invalid Credentials");
    } else {
      setGotoLoginPage(false);
      manager.success("Login Success!");
      setIsUserLoggedIn(true);
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

export const logout = (setHomePageLoaded, setIsUserLoggedIn) => {
  fetch("/logout", {
    method: "delete",
  })
    .then((res) => res.status)
    .then((st) => {
      if (st === 200) {
        setIsUserLoggedIn(false);
        setHomePageLoaded(true);
      }
    });
};

export const registerUser = (
  name,
  username,
  password,
  age,
  explicitFlag,
  languages,
  setGotoRegisterPage,
  setGotoLoginPage,
  manager
) => {
  const jwtToken = getJwtToken({ username, password });
  fetch("/register", {
    method: "post",
    body: JSON.stringify({ name, age, explicitFlag, languages }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        manager.success("Account Created!");
        setGotoRegisterPage(false);
        setGotoLoginPage(true);
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

export const removeFavorite = (id, setIsFavorite) => {
  fetch("/favorite", {
    method: "delete",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.status === 200) {
        setIsFavorite(false);
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

export const isShowOnWatchList = (title, setIsOnWatchList) => {
  fetch("/watchlist")
    .then((r) => r.text())
    .then((d) => JSON.parse(d))
    .then((watchListMap) => watchListMap.map((w) => w.title))
    .then((watchList) => {
      if (watchList.includes(title)) {
        return setIsOnWatchList(true);
      }
      setIsOnWatchList(false);
    })
    .catch((e) => new TypeError(e));
};

export const fetchLanguages = () => fetch('/languages').then(r => r.text()).then(d => JSON.parse(d));