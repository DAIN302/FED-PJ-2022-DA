// 도깨비 PJ 메인페이지 JS - main.js

window.addEventListener("DOMContentLoaded", loadFn);

function loadFn() {
    // 구현내용 : 내부링크 클릭하여 index 페이지 이동 시 파라미터로 구분하여
    // 메인페이지 애니메이션 중지

    // 1. 파라미터 읽어오기
    let pm = location.href


    // 2. 파라미터 유무로 분기
    // 물음표 존재 여부로 애니메이션 실행가부 결정
    if(pm.indexOf("?")!==-1) {
        // 파라미터 잘라서 값만 추출
        pm = pm.split("?")[1].split("=")[1];
        console.log("파라미터값",pm);

        // pm값이 "m"이면 애니메이션 중지
        if(pm==="m") {
            // body 의 클래스를 제거
            document.body.classList.remove("on");
        }

    } ////////// if문

    
} // 로드구역