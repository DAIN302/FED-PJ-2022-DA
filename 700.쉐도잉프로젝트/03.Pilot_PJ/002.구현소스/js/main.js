// 파일럿 PJ 메인페이지 JS - main.js

// 자동스크롤 기능 함수 가져오기
import autoScroll from "./jquery-autoscroll.js";

// 자동스크롤 호출
autoScroll();

// 메인페이지 

// 햄버거 버튼 클릭 시 전체 메뉴 보이기
$(".ham").click(function(){
    // 햄버거 버튼 클래스 변경
    $(this).toggleClass("on");
    // 전체 메뉴 보이기
    $(".mbox").fadeToggle(400);
})
