// 카테고리 서브페이지 JS - sub.js

// 자동스크롤 기능 함수 가져오기
import menuFn from "./mainjs/menu.js";
import comData from "./tempData/data-common.js";

//########## 상단영역 메뉴 뷰 템플릿 세팅
// Vue.component(내가지은요소명, {옵션})  
Vue.component("top-comp", {
    template : comData.tareaSub,
})  ///// 상단영역 Vue component
Vue.component("foot-comp", {
    template : comData.barea,
})  ///// 하단영역 Vue component

// ####### 상단영역 뷰 인스턴스 생성
// new Vue({옵션})
new Vue({
    el : "#top",
    data : {},
    // created 실행 구역 : DOM 연결 전 (가상DOM-실제DOM 연결 전)
    created : function() {
        // DOM 연결 전 데이터 가공 작업
        console.log("created구역")
    },
    // mounted 실행구역 : DOM 연결 후 실행 (가상DOM-실제DOM 연결 후)
    mounted : function(){
        // 제이쿼리 코드 함수 호출
        console.log("mounted구역")
        
        // 메뉴 기능 함수 호출
        menuFn();   

        // 스와이퍼 함수 호출
        makeSwiper();

        // 부드러운 스크롤
        startSS();
    }
}) // 상단영역 뷰 인스턴스

// ####### 하단영역 뷰 인스턴스 생성
new Vue({
    el : "#info",
}) // 하단영역 뷰 인스턴스

// 스와이퍼 생성함수
// 스와이퍼 플러그인 인스턴스 생성
function makeSwiper(){
    let swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
            delay: 3000, 
            disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });
} //// makeSwiper
