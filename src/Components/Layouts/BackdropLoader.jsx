import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import "./BackdropLoader.css"

const BackdropLoader = () => {
    return (
        <div className={"backdropLoader"}>
            <CircularProgress color="primary" />
        </div>
    );
};

export default BackdropLoader;
