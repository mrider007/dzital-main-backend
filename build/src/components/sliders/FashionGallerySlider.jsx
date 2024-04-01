import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const FashionGallerySlider = ({img}) => {
  return (
    <Carousel infiniteLoop={true}>
    {Array.isArray(img) && img.map((item, index)=>(
      <div className="swiper-slide" key={index}>
        <img src={item} alt="" />
      </div>
    ))}
  </Carousel>
  )
}

export default FashionGallerySlider