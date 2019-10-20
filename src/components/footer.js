import React, { useState, useEffect } from "react";
import Skeleton from 'react-skeleton-loader';
import { Jumbotron, Container } from 'reactstrap';
const Footer = () => {
    return (
        <div style={footerStyling.mainComponent}>
            <Jumbotron fluid style={footerStyling.jumbotron}>
                <p style={footerStyling.textContent}>Powered By Halosis<img src="../../assets/logo.png" style={footerStyling.imageContent}/></p>
            </Jumbotron>
        </div>
    )
}

const footerStyling = {
    mainComponent: {
        marginTop: 35,
        clear: "both",
        position: "relative",
        bottom: 0,
    },
    jumbotron: {
        borderRadius: 10,
        height: "75px"
    },
    textContent: {
        fontSize: 15,
        marginTop: -15,
        textAlign: "center"
    },
    imageContent: {
        width: "10%",
        height: "10%"
    }
}

export default Footer
