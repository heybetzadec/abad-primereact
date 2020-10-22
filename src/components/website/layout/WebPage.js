import React, {useEffect} from 'react';
import WebTopBar from "./WebTopBar";

const WebPage = (props) => {

    useEffect(() => {
        if (props.title === undefined){
            document.title = global.variable.appName
        } else {
            document.title = `${props.title} | ${global.variable.appName}`
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.title])

    return (
        <>
            <WebTopBar />

            {props.children}
        </>
    );
};

export default WebPage;