import React from "react";
import Loader from 'react-loader'

export const Spinner = ({loaded}) => {
    return <Loader loaded={loaded}
                   lines={13} length={20} width={10} radius={30}
                   corners={1} rotate={0} direction={1} color="#ffefd5" speed={1}
                   trail={60} shadow={true} hwaccel={false} className="spinner"
                   zIndex={2e9} top="50%" left="50%" scale={1.00}
                   loadedClassName="loadedContent"/>
}