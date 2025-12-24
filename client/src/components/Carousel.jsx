import React from "react";
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    draggable: true,
    touchThreshold: 10
}
console.log("Slider Import Debug:", Slider);

const Carousel = ({children, settings = {}})=> {
    const carouselSettings = {...defaultSettings, ...settings};
    const SliderComponent = Slider.default ? Slider.default : Slider;
    return (
        <div className="slider-container">
            <SliderComponent {...carouselSettings} >
                {children}
            </SliderComponent>
        </div>
    )
}

export default Carousel;