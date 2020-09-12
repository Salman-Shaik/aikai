import AccountCircle from '@material-ui/icons/AccountCircle';
import React from "react";
import '../../../css/UserIcon.css';

export const UserIcon = ({isUserLoggedIn, setGotoLoginPage}) => {
    const onClick = () => {
        if (!isUserLoggedIn) {
            setGotoLoginPage(true);
        }
    }

    return <AccountCircle className="user_icon" onClick={onClick}/>
}