import React, {useState} from "react";

export const NavigationMenuItem = ({name, currentMenuItem, setCurrentMenuItem}) => {
    let isItemSelected = name === currentMenuItem;
    let [isSelected, setIsSelected] = useState(isItemSelected);
    const onClick = () => {
        setCurrentMenuItem(name);
        setIsSelected(true);
    }
    return <button type="button" title={name} onClick={onClick}
                   className={`menu_item ${(isSelected ? "underline" : "")}`}>
        {name}
    </button>
}