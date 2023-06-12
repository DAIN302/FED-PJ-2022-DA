import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import $ from "jquery";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

/* 폰트어썸 임포트 */
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./swipervid.css";

// import required modules
import { Navigation } from "swiper";

import swipervid_data from "../data/swipevid";

export default function SwiperVid(props) {   
  // 데이터 세팅
  const sdt = swipervid_data[props.pg];

  // 하나당 슬라이드 수 : Hook 변수
  // const [변수, set변수] = useState(초기값)
  const [perSld, setPerSld] = useState(4);
  // 값의 사용은 Hook 변수를 쓰고 값의 변경은 set변수(값) 형식으로 사용

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
  } /// showVid

  // 이벤트 함수 ////////////////
  const evtFn = () => {
    $(()=>{
      // 화면크기별 슬라이드 수 변경함수
      const chgSwp = () => {
        // 윈도우 사이즈 체크
        let nowW = $(window).width();
        // console.log(nowW)
        // 화면 사이즈별 슬라이드 수 변경
        if(nowW <= 1000 && nowW > 700) setPerSld(3);
        else if(nowW <= 700) setPerSld(2);
        else setPerSld(4);
      } /// chgSwp
      // 윈도우 리사이즈 이벤트
      $(window).resize(chgSwp);

      // 로딩 시 최초호출
      chgSwp();
    })
  } // evtFn

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

