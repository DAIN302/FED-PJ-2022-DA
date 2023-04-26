// 무한이동 드래그&클릭형&멀티 배너 JS - multi.js

// 공통 슬라이드 함수 import
import mySlider from "./mySlider.js";

// 함수 호출
// 현재 슬라이드 3가지 모두 적용
const slider = $(".slider");

slider.each(idx=>{
    mySlider(slider[idx]);
})
