import React, {useState} from "react";
import '../../css/NavigationMenuItem.css';

export const NavigationMenuItem = ({name, currentMenuItem, setCurrentMenuItem}) => {
    let isItemSelected = name === currentMenuItem;
    let [isSelected, setIsSelected] = useState(isItemSelected);
    const onClick = ({target}) => {
        setCurrentMenuItem(name);
        setIsSelected(true);
        target.blur();
    }
    return <button type="button" title={name} onClick={onClick}
                   className={`menu_item ${(isSelected ? "underline" : "")}`}>
        {name}
    </button>
}