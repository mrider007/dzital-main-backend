import React from "react";
import VerticalSlider from "./VerticalSlider";
import HorizontalSlider from "./HorizontalSlider";

const CustomSlick = () => {
  return (
    <>
    <section className="container mt-4 mb-5" >
      <article className="row" >
        <div className="col-md-6">
          <div className="swiper mySwiperVertical" style={{minHeight:"215px"}}>
            <div className="swiper-wrapper">
              <VerticalSlider/>
            </div>
          </div>
        </div>

        <div className="col-md-6 ">
          <div className="swiper mainBannerSwiper">
            <div className="swiper-wrapper">
              <HorizontalSlider/>
            </div>
          </div>
        </div>

      </article>
    </section>
    </>
  );
};

export default CustomSlick;
