// 보그 PJ - 공통 JS : common.js

window.addEventListener("DOMContentLoaded", ()=>{
    console.log("공통로딩완")

    // 부드러운 스크롤 JS 호출
    startSS();

    // 만약 스크롤바를 직접 드래그할 경우 
    // mouseup(즉, 스크롤바를 놓는 경우)
    // 이벤트 발생 시 Y축 스크롤바 위치를 pos 전역변수에 업데이터

    window.addEventListener("mouseup", ()=>{
        pos = window.scrollY;
    }) // scroll


})// 로드구역