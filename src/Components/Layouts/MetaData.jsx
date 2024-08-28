import { Helmet } from 'react-helmet';
import React from 'react';


const MetaData = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    );
};

export default MetaData;
