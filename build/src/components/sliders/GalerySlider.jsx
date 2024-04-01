import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const GallerySlider = ({ img }) => {

  return (
    <Carousel infiniteLoop={true}>
      {Array.isArray(img) &&  img.map((img, index) => (
        <div className="swiper-slide" key={index}>
          <img src={img} alt="" />
        </div>
      ))}
    </Carousel>
  );
};

export default GallerySlider;
