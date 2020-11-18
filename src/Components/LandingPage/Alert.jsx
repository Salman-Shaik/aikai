import React from "react";
import "../../css/Alert.css";

export const Alert = ({ type, message }) => {
  return (
    <div className={`alert ${type}-alert`} data-testid={`${type}-alert`}>
      <span className={`${type}_message`}>{message}</span>
    </div>
  );
};
