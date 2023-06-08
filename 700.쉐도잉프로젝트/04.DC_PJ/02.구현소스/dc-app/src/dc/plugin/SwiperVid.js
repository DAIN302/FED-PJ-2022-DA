import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import $ from "jquery";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./swipervid.css";

// import required modules
import { Navigation } from "swiper";

import swipervid_data from "../data/swipevid";

export default function SwiperVid(props) {   
  const sdt = swipervid_data[props.pg];

  // 비디오 보이기 함수(할당형 함수)
  const showVid = (src,tit) =>{
    let vbx = $(".videobx");
    let ifr = $(".playvid iframe")
    // 1. 아이프레임 src 넣기
    // document.querySelector(".playvid iframe").setAttribute("src", src+"?autoplay=1")
    vbx.fadeIn(300);
    ifr.attr("src", src+"?autoplay=1")
    // 2. 타이틀 넣기
    $(".playvid h2").text(tit)
    // 3. 닫기 기능
    $(".cbtn").click(function(){
      vbx.fadeOut(300)
      ifr.attr("src", "")
    })
  }

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {
            sdt.map((v,i)=>            
            <SwiperSlide key={i}>
              <section className="swinbx" onClick={()=>showVid(v.vsrc, v.tit)}>
                <figure>
                  <img src={v.isrc} alt={v.tit}/>
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
    </>
  );
}

