// 보그 PJ 메인페이지 JS - main.js

// 로딩구역
window.addEventListener("DOMContentLoaded", loadFn)

function loadFn() {
    /********************************************************************
         리턴함수 세팅구역     
     ********************************************************************/
    // 1. 요소선택함수 : querySelectorAll()함수
    const q = x => {
        // (1) 리턴할 요소 변수 : rv
        let rv = document.querySelectorAll(x);

        // (2) 요소개수체크
        let cnt = rv.length;
        cg(cnt+"개");

        // (3) 1개일 경우 첫번째만 선택해서 리턴
        if(cnt===1) rv = rv[0];

        // (4) 결과 리턴
        return rv;

    }; /////////// q함수

    // 2. 콘솔출력함수
    const cg = x => console.log(x);

    // 3. 등장액션 대상 위치값 리턴함수
    const retVal = ele => ele.getBoundingClientRect().top;

    /*********************************************
         스크롤 등장액션 기능 구현
     *********************************************/
    // 대상 .scAct
    const scAct = q(".scAct");

    // 스크롤 이벤트 세팅 /////
    window.addEventListener("scroll", ()=>{
        // 값 확인
        cg("박스1"+retVal(scAct[0]));
    }) ///////// 스크롤 이벤트 //////////


    


} //////// 로드구역