import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";

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
            slidesPerView: 3,
          },
          700: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 7,
          },
        }}
        className="mySwiper"
      >
        {
            sdt.map((v,i)=>            
            <SwiperSlide key={i}>
              {/* 
                  "/det" 라우터 컴포넌트 페이지 호출 시 state 속성값으로 객체를 보내어 값 전달
                  도착페이지인 Detail.js 컴포넌트에 페이지 나타내야할 데이터 항목을 
                  데이터 속성명과 같은 이름으로 세팅하여 라우터 전달 state객체에 담아서 보냄
                  cname은 캐릭터 이름, cdesc는 캐릭터 설명, facts는 캐릭터 상세설명 정보
              */}
              <Link to="/det" state={{
                cname:v.cname,
                cdesc:v.cdesc,
                facts:v.facts
                }}>
                <section className="swinbx">
                  {/* 캐릭터이미지영역 */}
                  <figure className="catimg">
                    <img src={v.tmsrc} alt={v.cname}/>
                  </figure>
                  <div className="cattit">
                    <h3 className="ctit">{v.cname}</h3>
                  </div>
                </section>
              </Link>
            </SwiperSlide>
            )
        }
      </Swiper>
      {/* 스와이퍼 모듈에 이벤트 입히기 */}
      {/* { evtFn() } */}
    </>
  );
}

