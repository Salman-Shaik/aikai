import _ from 'lodash';
import React, {useEffect, useState} from "react";
import 'react-circular-progressbar/dist/styles.css';
import '../../css/Show.css';
import {fetchPerfectShow, fetchShow} from "../../lib/networkCalls";
import {Spinner} from "../Spinner";
import {OtherShows} from "./OtherShows";
import {ShowDetails} from "./ShowDetails";

const Component = ({info, currentShowType, setCurrentShow}) => {
    const ShowSection = () => <section className="show_section">
        <ShowDetails info={info} currentShowType={currentShowType}/>
        <OtherShows keyword="recommendations" className="recommended_movies" currentShowType={currentShowType}
                    showId={info.id} setCurrentShow={setCurrentShow}/>
        <OtherShows keyword="similar" className="similar_movies" currentShowType={currentShowType}
                    showId={info.id} setCurrentShow={setCurrentShow}/>
    </section>;

    return <section>
        <section className="show">
            {_.isEmpty(info) ? <h2 className="invalid_query">{"Invalid Show: Check The Your Search Query."}</h2> : <ShowSection/>}
        </section>
    </section>;
};

export const Show = ({currentShow, currentShowType, setCurrentShow, setCurrentShowType}) => {
    const [info, setShowInformation] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (_.isEmpty(currentShowType)) {
            return fetchPerfectShow(currentShow, setShowInformation, setLoaded, setCurrentShowType);
        }
        fetchShow(currentShow, currentShowType, setShowInformation, setLoaded);
    }, [currentShow, currentShowType, setCurrentShowType]);

    return !loaded ? <Spinner loaded={loaded}/> :
        <Component info={info} currentShowType={currentShowType} setCurrentShow={setCurrentShow}/>;
}