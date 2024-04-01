import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

SwiperCore.use([Autoplay, Pagination, Navigation]);


const HorizontalSlider = () => {


  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          // renderBullet: function (index, className) {
          //   return '<span class="' + className + '" style="background-color: var(--theme-color);"></span>';
          // },
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><div className="swiper-slide">
        <img src="./assets/images/banner-5.webp" alt="" />
      </div></SwiperSlide>
      <SwiperSlide><div className="swiper-slide">
        <img src="./assets/images/banner-4.webp" alt="" />
      </div></SwiperSlide>
      <SwiperSlide><div className="swiper-slide">
        <img src="./assets/images/banner-3.webp" alt="" />
      </div></SwiperSlide>
      <SwiperSlide><div className="swiper-slide">
        <img src="./assets/images/banner-2.webp" alt="" />
      </div></SwiperSlide>
      <SwiperSlide><div className="swiper-slide">
        <img src="./assets/images/banner-1.webp" alt="" />
      </div></SwiperSlide>
      </Swiper>
    </>
  );
};

export default HorizontalSlider;
