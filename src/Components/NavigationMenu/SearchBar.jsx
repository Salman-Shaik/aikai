import Search from '@material-ui/icons/Search'
import React from "react";
import '../../css/SearchBar.css';

export const SearchBar = () => {
    const onClick = ({target}) => {
    }
    return <section className="search_bar">
        <Search className="search_icon"/>
        <input type="text" title="Search" placeholder="Search Movie, TV Shows..."
               className="search_input" onClick={onClick}/>
    </section>
}