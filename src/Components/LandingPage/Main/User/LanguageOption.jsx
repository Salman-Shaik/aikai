import Tooltip from "@material-ui/core/Tooltip";
import { CheckCircle, RadioButtonUncheckedOutlined } from "@material-ui/icons";
import _ from "lodash";
import React, { useState } from "react";
import "../../../../css/LanguageOption.css";

export const LanguageOption = ({
  languages,
  text,
  addLanguage,
  removeLanguage,
}) => {
  const [selected, setSelected] = useState(
    _.isEmpty(languages) ? false : !!languages.includes(text)
  );

  const onSelect = () => {
    setSelected(true);
    addLanguage(text);
  };

  const onUnSelect = () => {
    setSelected(false);
    removeLanguage(text);
  };

  return (
    <section className="language_option">
      <img src={`${text}.png`} alt={text} className="language_icon" />
      <h4 className="language">{text}</h4>
      {selected ? (
        <Tooltip title="Selected">
          <CheckCircle
            className={"selected"}
            onClick={onUnSelect}
            data-testid="selected"
          />
        </Tooltip>
      ) : (
        <Tooltip title="Select">
          <RadioButtonUncheckedOutlined
            className="not_selected"
            onClick={onSelect}
            data-testid="not_selected"
          />
        </Tooltip>
      )}
    </section>
  );
};
