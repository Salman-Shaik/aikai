import checkPasswordStrength from "check-password-strength";
import _ from "lodash";
import React, { useState } from "react";
import Switch from "react-switch";
import "../../../../css/RegistrationPage.css";
import languageList from "../../../../data/languages.json";
import { registerUser } from "../../../../lib/networkCalls";
import { Alert } from "../../Alert";
import { LanguageOption } from "./LanguageOption";

//TODO: Need to add test
const createLanguageComponents = (languages, addLanguage, removeLanguage) =>
  Object.values(languages).map((language) => (
    <LanguageOption
      text={language}
      addLanguage={addLanguage}
      removeLanguage={{ removeLanguage }}
    />
  ));

export const RegistrationPage = ({ setGotoRegisterPage, setGotoLoginPage }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [explicitFlag, setExplicitFlag] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [languages, setLanguages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
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

  const onSwitch = () => setExplicitFlag(!explicitFlag);

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
      setGotoRegisterPage,
      setGotoLoginPage,
      setSuccessMessage
    );
  };

  const onNext = () => {
    if (isFormInvalid()) return;
    setErrors(false);
    setPageNumber(2);
  };

  const addLanguage = (language) => {
    const languagesMap = languages;
    languagesMap.push(language);
    setLanguages(languagesMap);
  };

  const removeLanguage = (language) => {
    setLanguages(languages.filter((l) => l !== language));
  };

  return (
    <section className="register" data-testid="register">
      {!!successMessage && <Alert style="success" message={successMessage} />}
      {_.isEqual(pageNumber, 1) && (
        <section className="register_page">
          <h3 className="header">Create Account</h3>
          <section className="user_details">
            <section className="personal_details">
              <input
                type="name"
                placeholder="Enter Full Name"
                className={`detail name ${nameError ? "error" : ""}`}
                onChange={updateName}
              />
              <input
                type="number"
                placeholder="Age"
                className={`detail age ${ageError ? "error" : ""}`}
                onChange={updateAge}
              />
            </section>
            <input
              type="text"
              placeholder="Enter Your Email"
              className={`detail email ${usernameError ? "error" : ""}`}
              onChange={updateUsername}
            />
            <input
              type="password"
              placeholder="Enter Password"
              className={`detail password ${passwordError ? "error" : ""}`}
              onChange={updatePassword}
            />
            <h5 className={`strength ${passwordStrength.toLowerCase()}`}>
              <i>{`${passwordStrength} Password`}</i>
            </h5>
          </section>
          <button type="button" className="next_btn" onClick={onNext}>
            Next >
          </button>
        </section>
      )}
      {_.isEqual(pageNumber, 2) && (
        <section className="user_preferences">
          <h3 className="pref_header">Preferences</h3>
          <section className="explicit">
            <span className="explicit_label">Show Explicit Content</span>
            <Switch
              onChange={onSwitch}
              checked={explicitFlag}
              className={"explicit_switch"}
              disabled={disabled}
              offHandleColor="#a9a9a9"
              onHandleColor="#ffefd5"
              offColor="#000000"
              onColor="#fb74a9"
            />
          </section>
          <section className="languages_section">
            <span className="explicit_label">Language Preferences</span>
            <section className="languages">
              {createLanguageComponents(
                languageList,
                addLanguage,
                removeLanguage
              )}
            </section>
          </section>
          <button type="button" className="reg_btn" onClick={onRegister}>
            Sign Up
          </button>
        </section>
      )}
    </section>
  );
};
