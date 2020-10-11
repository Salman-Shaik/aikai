import React from "react";
import "../../css/Alert.css";

export const Alert = ({ style, message }) => {
  return (
    <div className={`alert ${style}-alert`}>
      <span className={`${style}_message`}>{message}</span>
    </div>
  );
};
