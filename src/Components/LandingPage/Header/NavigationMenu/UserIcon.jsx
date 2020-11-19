import Tooltip from "@material-ui/core/Tooltip";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import React from "react";
import "../../../../css/UserIcon.css";
import { logout } from "../../../../lib/networkCalls";

export const UserIcon = ({
  isUserLoggedIn,
  updateLocation,
  setHomePageLoaded,
  setIsUserLoggedIn,
}) => {
  const onClick = () => {
    if (!isUserLoggedIn) {
      updateLocation("/login");
    }
  };

  const onProfile = () => {
    updateLocation("/update_profile");
  };

  const onLogout = () => {
    logout(setHomePageLoaded, setIsUserLoggedIn, updateLocation);
  };

  return isUserLoggedIn ? (
    window.location.href.includes("/update_profile") ? (
      <Tooltip title="Logout">
        <PowerSettingsNew className="logout_icon" onClick={onLogout} />
      </Tooltip>
    ) : (
      <Tooltip title="Profile">
        <AccountCircle className="user_icon" onClick={onProfile} />
      </Tooltip>
    )
  ) : (
    <Tooltip title="Login">
      <span className="login_item" onClick={onClick}>
        LogIn
      </span>
    </Tooltip>
  );
};
