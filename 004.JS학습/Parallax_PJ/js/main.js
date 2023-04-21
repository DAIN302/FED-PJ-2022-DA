// 패럴렉스 PJ JS - main.js
/*
        패럴렉스 효과란?
        - 스크롤과 동시에 배경이미지나 어떤 특정 요소가 시차를 두고 이동함에
        따라 공간감이 느껴지게 하는 효과
        (원경은 천천히, 중경은 조금 빠르게, 근경 아주 빠르게 설정함)
*/

window.addEventListener("DOMContentLoaded", loadFn);

function loadFn(){
    // 1. 부드러운 스크롤 적용
    startSS(); 
    
    // 2. 공통함수
    const qs = x => document.querySelector(x);
    const qsa = x => document.querySelectorAll(x);
    // 3. 등장 위치 리턴함수
    const retVal = x => x.getBoundingClientRect().top;
    // getBoundingClientRect().top -> 화면에 등장 후 위로 올라가면 마이너스됨

    // 4. 화면높이값읽어오기 : 등장요소의 시작값이 이것
    const winH = window.innerHeight;
    
    // 5. 패럴렉스 수치 범위 : 움직일 값 설정(높이로 움직임)
    const setH1 = 100;
    const setH2 = 200;

    // 6.패럴렉스 대상선정
    // (1) 글자박스
    const tg1 = qsa(".txt");  
    // (2) 아이콘
    const tg2 = qsa(".icon"); 

    // 7. 패럴렉스 이동함수
    const moveEl = (elpos, ele, setH) => {
        // 전달값 : elpos - 위치값/ele-요소/setH-정한범위수
        // 패럴렉스 범위 : 윈도우 높이값 ~ 0까지
        // 화면에서 완전히 사라질때 범위 0이 아닌 -(요소의 높이값)
        if(elpos < winH && elpos > -200) { 
            // 1. 위치 이동값 계산
            let x = setH - (elpos * setH) / winH 
            // console.log(x);

            // 2. 해당요소에 위치이동 CSS 반영
            // cssText은 style 속성값을 직접 넣어줌
            ele.style.cssText = `transform : translateY(${-x}px)`

            // 대상요소의 트랜스폼 Y축 이동
            // 위치 이동의 계산원리
            // -> 윈도우화면 : 위치값 = 정한범위 : 실제이동값
            // -> 윈도우 1000px : 위치값 500px = 정한범위 200px : 실제이동값 x
            // -> 실제이동값 = 정한범위 - (위치값*정한범위)/ 윈도우화면
            // x = setH2 - (elpos*setH2) / winH
            // -> 이동범위는 0부터 서서히 증가해야 하므로 정한 범위수에서 빼줌
        } ////////////// if : 패럴렉스 범위 /////////
    }; ////// moveEl

    // 8. 스크롤 이벤트 함수 만들기
    window.addEventListener("scroll", ()=>{
        // moveEl(위치값, 요소, 정한범위)    
       // 대상 1 : 글자박스 패럴렉스 호출
       tg1.forEach(ele=>moveEl(retVal(ele),ele,setH2)) 
       // 대상 2 : 아이콘 패럴렉스 호출
       tg2.forEach(ele=>moveEl(retVal(ele),ele,setH1)) 

    }) //// 스크롤 /////////////////////////

    // 스크롤바를 직접 잡고 움직일 시 부드러운 스크롤 위치값 업데이트
    window.addEventListener("mouseup", ()=>{
       pos = window.scrollY; 
    })
    
    window.addEventListener("keyup", ()=>{
       pos = window.scrollY; 
    })
    
    // 로딩 시 맨위로 이동
     setTimeout(() => {
         window.scrollTo(0,0);
         // 부드러운 스크롤 위치값 반영
         pos = 0;
     }, 50);
    



} //// 로드함수