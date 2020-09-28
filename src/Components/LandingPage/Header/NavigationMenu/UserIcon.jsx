import Tooltip from "@material-ui/core/Tooltip";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import React from "react";
import "../../../../css/UserIcon.css";
import { logout } from "../../../../lib/networkCalls";

export const UserIcon = ({
  isUserLoggedIn,
  setGotoLoginPage,
  setHomePageLoaded,
  setIsUserLoggedIn,
  setCurrentMenuItem,
}) => {
  const onClick = () => {
    if (!isUserLoggedIn) {
      setCurrentMenuItem("");
      setGotoLoginPage(true);
    }
  };
  const onLogout = () => logout(setHomePageLoaded, setIsUserLoggedIn);

  return isUserLoggedIn ? (
    <Tooltip title="Logout">
      <PowerSettingsNew className="logout_icon" onClick={onLogout} />
    </Tooltip>
  ) : (
    <Tooltip title="Login">
      <AccountCircle className="user_icon" onClick={onClick} />
    </Tooltip>
  );
};
