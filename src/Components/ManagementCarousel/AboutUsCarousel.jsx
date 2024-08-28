import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './AboutUsCarousel.css';
import { Pagination, Navigation,Autoplay } from 'swiper/modules';

const AboutUsCarousel = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
          delay: 4000,
          disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Pagination, Navigation , Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="imageContainer">
          <img src="/about/aboutOne.jpg" alt="" className="swiper-slide-img" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="imageContainer">
          <img src="/about/aboutTwo.jpg" alt="" className="swiper-slide-img" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="imageContainer">
          <img src="/about/aboutThree.jpg" alt="" className="swiper-slide-img" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="imageContainer">
          <img src="/about/aboutFour.jpg" alt="" className="swiper-slide-img" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default AboutUsCarousel;
