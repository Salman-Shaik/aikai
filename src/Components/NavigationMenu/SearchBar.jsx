import Search from '@material-ui/icons/Search'
import React, {useState} from "react";
import '../../css/SearchBar.css';

export const SearchBar = ({setCurrentShow}) => {
    const [show, setShow] = useState("");
    const onClick = (event) => {
        setCurrentShow(show);
        event.preventDefault()
    }
    return <form className="search_bar" onSubmit={onClick}>
        <Search className="search_icon" onClick={onClick}/>
        <input type="text" title="Search" placeholder="Search Movie, TV Shows..."
               className="search_input" onChange={(({target}) => setShow(target.value))}/>
    </form>
}