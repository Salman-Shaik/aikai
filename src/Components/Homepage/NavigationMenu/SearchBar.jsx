import Close from '@material-ui/icons/Close'
import Search from '@material-ui/icons/Search'
import Tooltip from "@material-ui/core/Tooltip";
import _ from "lodash";
import React, {useState} from "react";
import '../../../css/SearchBar.css';

export const SearchBar = ({setCurrentShow, setCurrentShowId, setHomePageLoaded}) => {
    const [show, setShow] = useState("");
    const [error, setError] = useState(false);
    const onClick = (event) => {
        event.preventDefault();
        if (_.isEmpty(show.trim())) return setError(true);
        setHomePageLoaded(false);
        setError(false);
        setCurrentShow(show);
        setCurrentShowId(0);
    }

    const onChange = ({target}) => {
        setError(false);
        setShow(target.value);
    };

    const onClose = () => {
        setError(false);
        setShow("");
    }
    return <form className={`search_bar ${error ? "error" : ""}`} onSubmit={onClick}>
        <Tooltip title="Search"><Search className="search_icon" onClick={onClick}/></Tooltip>
        <input type="text" title="Search" placeholder="Search Movie, TV Shows..." className="search_input"
               value={show} onChange={onChange}/>
        <Tooltip title="Clear"><Close className="close_icon" onClick={onClose}/></Tooltip>
    </form>
}