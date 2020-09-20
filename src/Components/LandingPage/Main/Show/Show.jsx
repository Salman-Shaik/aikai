import _ from 'lodash';
import React, {useEffect, useState} from "react";
import 'react-circular-progressbar/dist/styles.css';
import '../../../../css/Show.css';
import {fetchPerfectShow, fetchShow} from "../../../../lib/networkCalls";
import {Spinner} from "../../../Spinner";
import {OtherShows} from "./OtherShows";
import {ShowDetails} from "./ShowDetails";


const Component = ({info, currentShowType, setCurrentShow, setCurrentShowId, setHomePageLoaded, homepageLoaded, isUserLoggedIn, setGotoLoginPage, setCurrentMenuItem}) => {
    const createOtherMovies = (keyword, className) =>
        <OtherShows keyword={keyword}
                    className={className}
                    currentShowType={currentShowType}
                    showId={info.id}
                    setCurrentShow={setCurrentShow}
                    setCurrentShowId={setCurrentShowId}
                    homepageLoaded={homepageLoaded}
                    setHomePageLoaded={setHomePageLoaded}
                    setCurrentMenuItem={setCurrentMenuItem}/>;

    const ShowSection = () => <section className="show_section">
        <ShowDetails info={info}
                     currentShowType={currentShowType}
                     isUserLoggedIn={isUserLoggedIn}
                     setGotoLoginPage={setGotoLoginPage}/>
        {createOtherMovies("recommendations", "recommended_movies")}
        {createOtherMovies("similar", "similar_movies")}
    </section>;

    return <section>
        <section className="show">
            {(_.isEmpty(info) || info["status_code"] === 34) ?
                <h2 className="invalid_query">{"Invalid Show: Check The Your Search Query."}</h2> :
                <ShowSection/>}
        </section>
    </section>;
};

export const Show = (props) => {
    const {
        currentShowId, currentShow, currentShowType, setCurrentShow, setCurrentShowType, setCurrentMenuItem,
        setCurrentShowId, homepageLoaded, setHomePageLoaded, isUserLoggedIn, setGotoLoginPage
    } = props;

    const [info, setShowInformation] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (_.isEmpty(currentShowType) || currentShowId === 0) {
            return fetchPerfectShow(currentShow, setShowInformation, setLoaded, setCurrentShowType, setCurrentShowId, setHomePageLoaded);
        }
        fetchShow(currentShowId, currentShowType, setShowInformation, setLoaded, setHomePageLoaded);
    }, [currentShow, currentShowId, currentShowType, setCurrentShowId, setCurrentShowType, setHomePageLoaded]);

    return (!loaded || !homepageLoaded) ? <Spinner loaded={loaded}/> :
        <Component info={info}
                   currentShowType={currentShowType}
                   setCurrentShow={setCurrentShow}
                   setCurrentShowId={setCurrentShowId}
                   setHomePageLoaded={setHomePageLoaded}
                   homepageLoaded={homepageLoaded}
                   isUserLoggedIn={isUserLoggedIn}
                   setGotoLoginPage={setGotoLoginPage}
                   setCurrentMenuItem={setCurrentMenuItem}/>;
}