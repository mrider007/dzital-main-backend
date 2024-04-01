import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { EffectFade } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';



const CustomSlick = () => {
  return (
    <>
    {/* full size main slider start here */}
    <section className="fsMainSlider">
      <div className="container">
        <div className="row justify-content-center">
          
          {/* left part search work start here */}
          <div className="col-md-6 centerBx">
            <div className="">
              <h1>Find the right <i>freelance</i> service, right away</h1>
              <form class="input-group width100">
                  <input placeholder="Search..." type="text" class="form-control" />
                  <button type="button" id="button-addon2" class="btn btn-primary text-white">
                    <i class="fa fa-search text-white" aria-hidden="true"></i>
                  </button>
                </form>
                <div align="left">
                <ul className="bannerPopularList">
                  <li><b>Popular : </b></li>
                  <li>
                    <a href="/">Content Writer</a>
                  </li>
                  <li>
                    <a href="/">Photographer</a>
                  </li>
                  <li>
                    <a href="/">Web Developer</a>
                  </li>
                  <li>
                    <a href="/">UI/UX</a>
                  </li>
                </ul>
                </div>
            </div>
          </div>
          {/* left part search work end here */}

          {/* right part slider start here */}
          <div className="col-md-1" align='center'></div>
          <div className="col-md-5" align='center'>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[EffectFade,Autoplay]}effect="fade"
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide><img src="./assets/images/banner-M-1.webp" alt="" /></SwiperSlide>
            <SwiperSlide><img src="./assets/images/banner-M-2.webp" alt="" /></SwiperSlide>
            <SwiperSlide><img src="./assets/images/banner-M-3.webp" alt="" /></SwiperSlide>
            <SwiperSlide><img src="./assets/images/banner-M-4.webp" alt="" /></SwiperSlide>
          </Swiper>
          </div>
          {/* right part slider end here */}

        </div>
      </div>
    </section>
    {/* full size main slider end here */}
    </>
  );
};

export default CustomSlick;
