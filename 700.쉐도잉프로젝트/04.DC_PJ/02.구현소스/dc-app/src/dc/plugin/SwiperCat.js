import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import $ from "jquery";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./swipercat.css";

// import required modules
import { Navigation } from "swiper";

import cat_data from "../data/cat";

export default function SwiperCat(props) {   
  // 데이터 세팅
  const sdt = cat_data;

  return (
    <>
      <Swiper
        // 한 화면당 개수를 Hook 변수 사용  
        // slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          200: {
              slidesPerView: 2,
          },
          700: {
              slidesPerView: 2,
          },
          1000: {
              slidesPerView: 3,
          },
          1200: {
              slidesPerView: 4,
          },
        }}
        className="mySwiper"
      >
        {
            sdt.map((v,i)=>            
            <SwiperSlide key={i}>
              <section className="swinbx" onClick={()=>showVid(v.vsrc, v.tit)}>
                <figure>
                  <img src={v.isrc} alt={v.tit}/>
                  <FontAwesomeIcon
                      icon={faPlayCircle}
                      style={{
                          position: "absolute",
                          bottom: "55%",
                          left: "10%",
                          color: "#fff",
                          fontSize: "50px",
                      }}
                  />
                </figure>
                <div>
                  <h4 className="vcat">{v.cat}</h4>
                  <h3 className="vtit">{v.tit.toUpperCase()}</h3>
                </div>
              </section>
            </SwiperSlide>
            )
        }
      </Swiper>
      {/* 스와이퍼 모듈에 이벤트 입히기 */}
      {/* { evtFn() } */}
    </>
  );
}

