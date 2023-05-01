// 파일럿 PJ 메인페이지 JS - main.js

/*
    [ 메인 페이지 주요 기능]
    1. 자동스크롤 기능 구현
    + 페이지 도착 후 등장액션 구현
    2. 햄버거버튼 전체메뉴 보이기/숨기기
    + 전체메뉴 배경동영상 보일때만 재생(숨길때는 멈춤)
    3. 배너 터치 기능 넘기기(제이쿼리 UI 이용)
    + 배너별 타이틀 등장
    + 양쪽 이동버튼 플러그인 적용
*/

// 자동스크롤 기능 함수 가져오기
import autoScroll from "./jquery-autoscroll.js";
import menuFn from "./mainjs/menu.js";
import banFn from "./mainjs/ban.js";
import comData from "./tempData/data-common.js";

//########## 상단영역 메뉴 뷰 템플릿 세팅
// Vue.component(내가지은요소명, {옵션})  
Vue.component("top-comp", {
    template : comData.tarea,
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
        // 자동스크롤 호출
        autoScroll();
        
        // 메뉴 기능 함수 호출
        menuFn();
        
        // 배너 기능 함수 호출
        banFn();
    }
}) // 상단영역 뷰 인스턴스

// ####### 하단영역 뷰 인스턴스 생성
new Vue({
    el : "#info",
}) // 하단영역 뷰 인스턴스




