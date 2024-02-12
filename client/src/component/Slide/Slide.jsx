import React from 'react';
import "./Slide.scss";
import Slider from "react-slick";

const Slide = ({ children, slidesToShow, slidesToScroll }) => {
    return (
        <div className="slide">
            <div className="container">
                <Slider slidesToScroll={slidesToScroll} slidesToShow={slidesToShow} >
                    {children}
                </Slider>
            </div>
        </div>
    )
}

export default Slide