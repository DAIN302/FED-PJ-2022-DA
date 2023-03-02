// 보그 PJ 링크 시스템 JS - linksys.js

// 로딩구역
window.addEventListener("DOMContentLoaded", linkFn);

function linkFn(){
    // console.log("로딩완");

    // 1. 링크 대상 선정 
    //(1) GNB : .gnb a 
    const gnb = document.querySelectorAll(".gnb a");
    //(1) 로고 :  .logo a 
    const logo = document.querySelector(".logo a");

    // 2. 클릭 이벤트 설정하기
    // (1) GNB 클릭 설정 //////////////////////////
    for(let x of gnb) {
        x.onclick = () => {
            // 클릭 이동 기능 막기
            event.preventDefault();
            // (1) 클릭된 a요소 텍스트 읽기
            let atxt = x.innerText.toLowerCase().trim();
            // toLowerCase() -> 소문자 변환
            // toUpperCase() -> 대문자 변환
            // trim() -> 앞뒤 공백 제거

            console.log(atxt);

            // (2) 서브 페이지 이동
            if(atxt !== "search")
            location.href = "category.html?cat="+encodeURIComponent(atxt);
            // 특수문자 & 때문에 encodeURIComponent()사용



        } // 클릭 이벤트 함수
    } // for of 문

    // (2) 로고 클릭 설정
    logo.onclick = (e) => {
        // 기본기능 막기
        e.preventDefault();

        // 홈으로 이동
        location.href = "index.html";
    } // 로고 클릭 설정


} // 로드함수
