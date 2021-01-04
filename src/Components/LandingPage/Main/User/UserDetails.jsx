import checkPasswordStrength from "check-password-strength";
import { decode } from "js-base64";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import "../../../../css/UserDetails.css";
import languageList from "../../../../data/languages.json";
import { getCookieValue } from "../../../../lib/helper";
import {
  fetchDetails,
  registerUser,
  updateUser,
} from "../../../../lib/networkCalls";
import { Spinner } from "../../../Spinner";
import { Alert } from "../../Alert";
import { LanguageOption } from "./LanguageOption";

//TODO: Need to add test
const createLanguageComponents = (
  languageList,
  addLanguage,
  removeLanguage,
  languages
) =>
  Object.values(languageList).map((i) => (
    <LanguageOption
      languages={languages}
      text={i}
      addLanguage={addLanguage}
      removeLanguage={removeLanguage}
    />
  ));

export const UserDetails = ({
  updateLocation,
  updateFlag,
  isUserLoggedIn,
  homepageLoaded,
  setHomePageLoaded,
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [explicitFlag, setExplicitFlag] = useState(false);
  const [termsFlag, setTermsFlag] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (updateFlag && isUserLoggedIn) {
      const userCookie = getCookieValue("user").replaceAll("%3D", "=");
      const userName = decode(userCookie);
      setUsername(userName);
      setHomePageLoaded(false);
      return fetchDetails(
        setAge,
        setExplicitFlag,
        setLanguages,
        setName,
        setDisabled,
        setLoaded,
        setHomePageLoaded
      );
    }
    setLoaded(true);
  }, [updateFlag, isUserLoggedIn, setHomePageLoaded]);

  const updateName = ({ target }) => {
    setNameError(false);
    setName(target.value);
  };

  const updateUsername = ({ target }) => {
    setUsernameError(false);
    setUsername(target.value);
  };

  const updatePassword = ({ target }) => {
    setPasswordError(false);
    const password = target.value;
    setPassword(password);
    if (_.isEmpty(password.trim())) return setPasswordStrength("");
    const strength = checkPasswordStrength(password).value;
    setPasswordStrength(strength);
  };

  const updateAge = ({ target }) => {
    setAgeError(false);
    const value = +target.value;
    setDisabled(value < 18);
    setAge(value);
  };

  const onSwitch = (checked) => {
    setExplicitFlag(checked);
  };

  const setErrors = (state) => {
    setNameError(state);
    setUsernameError(state);
    setPasswordError(state);
    setAgeError(state);
  };

  const isFormInvalid = () => {
    let isInvalid = false;
    const isValidUsername = !!username.match(
      "(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
    );
    if (_.isEmpty(username.trim()) || !isValidUsername) {
      isInvalid = true;
      setUsernameError(true);
    }
    if (_.isEmpty(password.trim())) {
      isInvalid = true;
      setPasswordError(true);
    }
    if (_.isEqual(age, 0)) {
      isInvalid = true;
      setAgeError(true);
    }
    if (_.isEmpty(name.trim())) {
      isInvalid = true;
      setNameError(true);
    }
    return isInvalid;
  };

  const isUpdateFormInvalid = () => {
    let isInvalid = false;
    if (_.isEqual(age, 0)) {
      isInvalid = true;
      setAgeError(true);
    }
    if (_.isEmpty(name.trim())) {
      isInvalid = true;
      setNameError(true);
    }
    return isInvalid;
  };

  const onUpdate = () => {
    if (isUpdateFormInvalid()) return;
    setErrors(false);
    updateUser(
      name,
      username,
      password,
      age,
      explicitFlag,
      languages,
      updateLocation,
      setSuccessMessage
    );
  };

  const onRegister = () => {
    if (isFormInvalid()) return;
    setErrors(false);
    registerUser(
      name,
      username,
      password,
      age,
      explicitFlag,
      languages,
      updateLocation,
      setSuccessMessage
    );
  };

  const addLanguage = (language) => {
    const languagesMap = languages;
    languagesMap.push(language);
    setLanguages(languagesMap);
  };

  const removeLanguage = (language) => {
    setLanguages(languages.filter((l) => l !== language));
  };

  return !loaded && !homepageLoaded ? (
    <Spinner loaded={loaded} />
  ) : (
    <section className="register" data-testid="register">
      {!!successMessage && <Alert type="success" message={successMessage} />}
      <section className="register_page">
        <h3 className="header">
          {updateFlag ? "Update Details" : "Create Account"}
        </h3>
        <section className="user_inputs">
          <section className="user_details">
            <section className="personal_details">
              <section className="name_and_age">
                <label htmlFor={"name"}>Full Name</label>
                <input
                  type="text"
                  id="name"
                  className={`detail name ${nameError ? "error" : ""}`}
                  onChange={updateName}
                  value={name}
                />
              </section>
              <section className="name_and_age">
                <label htmlFor={"age"}>Age</label>
                <input
                  type="number"
                  id="age"
                  className={`detail age ${ageError ? "error" : ""}`}
                  onChange={updateAge}
                  value={age}
                />
              </section>
            </section>
            <>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className={`detail email ${usernameError ? "error" : ""}`}
                onChange={updateUsername}
                value={username}
                readOnly={updateFlag}
              />
            </>
            <>
              <label htmlFor={"password"}>Password</label>
              <input
                type="password"
                id="password"
                className={`detail password ${passwordError ? "error" : ""}`}
                onChange={updatePassword}
              />
              <h5 className={`strength ${passwordStrength.toLowerCase()}`}>
                <i>{`${passwordStrength} Password`}</i>
              </h5>
            </>
          </section>
          <section className="explicit">
            <span className="explicit_label">Show Explicit Content</span>
            <Switch
              checked={explicitFlag}
              className={"explicit_switch"}
              disabled={disabled}
              offHandleColor="#ffefd5"
              onHandleColor="#222222"
              offColor="#000000"
              onColor="#4CE990"
              onChange={onSwitch}
            />
          </section>
          {!updateFlag && (
            <section className="terms_and_policy">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={termsFlag}
                onChange={() => setTermsFlag(!termsFlag)}
                className="terms_flag"
              />
              <label htmlFor="terms" className="termsLabel">
                By clicking this, I agree to{" "}
                <a
                  className="hyper_links"
                  href={"/terms_and_conditions"}
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  className="hyper_links"
                  href={"/privacy_policy"}
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </section>
          )}
          <button
            type="button"
            className="reg_btn"
            onClick={updateFlag ? onUpdate : onRegister}
          >
            {`${updateFlag ? "Update" : "Sign Up"}`}
          </button>
        </section>
        <section className="languages_section">
          <span className="explicit_label">Select Languages</span>
          <section className="languages">
            {createLanguageComponents(
              languageList,
              addLanguage,
              removeLanguage,
              languages
            )}
          </section>
        </section>
      </section>
    </section>
  );
};
