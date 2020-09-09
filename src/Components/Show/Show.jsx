import React, {useEffect, useState} from "react";
import 'react-circular-progressbar/dist/styles.css';
import '../../css/Show.css';
import {fetchShow} from "../../lib/networkCalls";
import {Spinner} from "../Spinner";
import {OtherShows} from "./OtherShows";
import {ShowDetails} from "./ShowDetails";

const Component = ({info, currentShowType, setCurrentShow}) => {
    console.log(info)
    return <section>
        <section className="show">
            <section className="show_section">
                <ShowDetails info={info} currentShowType={currentShowType}/>
                <OtherShows keyword="recommendations" className="recommended_movies" currentShowType={currentShowType}
                            showId={info.id} setCurrentShow={setCurrentShow}/>
                <OtherShows keyword="similar" className="similar_movies" currentShowType={currentShowType}
                            showId={info.id} setCurrentShow={setCurrentShow}/>
            </section>
        </section>
    </section>;
};


export const Show = ({currentShow, currentShowType, setCurrentShow}) => {
    const [info, setShowInformation] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        fetchShow(currentShow, currentShowType, setShowInformation, setLoaded);
    }, [currentShow,currentShowType]);

    return !loaded ? <Spinner loaded={loaded}/> :
        <Component info={info} currentShowType={currentShowType} setCurrentShow={setCurrentShow}/>;
}