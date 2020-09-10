import Search from '@material-ui/icons/Search'
import _ from "lodash";
import React, {useState} from "react";
import '../../css/SearchBar.css';

export const SearchBar = ({setCurrentShow, setCurrentShowType}) => {
    const [show, setShow] = useState("");
    const [error, setError] = useState(false);
    const onClick = (event) => {
        event.preventDefault();
        if (_.isEmpty(show)) return setError(true);
        setError(false);
        setCurrentShow(show);
    }

    const onChange = ({target}) => {
        setError(false);
        setShow(target.value);
    };

    return <form className={`search_bar ${error ? "error" : ""}`} onSubmit={onClick}>
        <Search className="search_icon" onClick={onClick}/>
        <input type="text" title="Search" placeholder="Search Movie, TV Shows..." className="search_input"
               onChange={onChange}/>
    </form>
}