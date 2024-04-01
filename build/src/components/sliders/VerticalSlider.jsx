import React from "react";


import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/pagination';

// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';

const VerticalSlider = () => {



  return (

    <>

      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        pagination={{
          clickable: true,
          // renderBullet: function (index, className) {
          //   return '<span class="' + className + '" style="background-color: var(--theme-color);"></span>';
          // },
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><div className="swiper-slide">
        <img src="./assets/images/banner-1.webp" alt="" />
      </div></SwiperSlide>
      <SwiperSlide><div className="swiper-slide">
        <img src="./assets/images/banner-2.webp" alt="" />
      </div></SwiperSlide>
      <SwiperSlide><div className="swiper-slide">
        <img src="./assets/images/banner-3.webp" alt="" />
      </div></SwiperSlide>
      <SwiperSlide><div className="swiper-slide">
        <img src="./assets/images/banner-4.webp" alt="" />
      </div></SwiperSlide>
      <SwiperSlide><div className="swiper-slide">
        <img src="./assets/images/banner-5.webp" alt="" />
      </div></SwiperSlide>
      </Swiper>
    </>
  );
};

export default VerticalSlider;
