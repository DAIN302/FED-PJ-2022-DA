// 패럴렉스 PJ JS - main.js
/*
        패럴렉스 효과란?
        - 스크롤과 동시에 배경이미지나 어떤 특정 요소가 시차를 두고 이동함에
        따라 공간감이 느껴지게 하는 효과
        (원경은 천천히, 중경은 조금 빠르게, 근경 아주 빠르게 설정함)
*/


$(window).on("DOMContentLoaded", loadFn);
// window.addEventListener("DOMContentLoaded", loadFn);

function loadFn(){
    // 1. 부드러운 스크롤 적용
    startSS(); 

    // 2. 화면높이값읽어오기 : 등장요소의 시작값이 이것
    const winH = $(window).height();
    
    // 3. 패럴렉스 수치 범위 : 움직일 값 설정(높이로 움직임)
    const setH1 = 100;
    const setH2 = 200;

    // 4.패럴렉스 대상선정
    // (1) 글자박스
    const tg1 = $(".txt");  
    // (2) 아이콘
    const tg2 = $(".icon"); 

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
            $(ele).css({
              transform : `translateY(${-x}px)`
            })

            // 대상요소의 트랜스폼 Y축 이동
            // 위치 이동의 계산원리
            // -> 윈도우화면 : 위치값 = 정한범위 : 실제이동값
            // -> 윈도우 1000px : 위치값 500px = 정한범위 200px : 실제이동값 x
            // -> 실제이동값 = 정한범위 - (위치값*정한범위)/ 윈도우화면
            // x = setH2 - (elpos*setH2) / winH
            // -> 이동범위는 0부터 서서히 증가해야 하므로 정한 범위수에서 빼줌
        } ////////////// if : 패럴렉스 범위 /////////
    }; ////// moveEl

    // 제이쿼리 getBoundingClientRect().top값 만들기
    // 요소위치값 - 현재스크롤위치값
    const retVal = (elpos, scTop) => elpos - scTop;

    // 8. 스크롤 이벤트 함수 만들기
    $(window).on("scroll", ()=>{
        // 현재 스크롤 위치값
        let scTop = $(this).scrollTop();

        // moveEl(위치값, 요소, 정한범위)    
       // 대상 1 : 글자박스 패럴렉스 호출
       tg1.each((idx, ele)=>moveEl(retVal($(ele).offset().top, scTop),ele,setH2)) 
       // 대상 2 : 아이콘 패럴렉스 호출
       tg2.each((idx, ele)=>moveEl(retVal($(ele).offset().top, scTop),ele,setH1)) 

    }) //// 스크롤 /////////////////////////

    // 스크롤바를 직접 잡고 움직일 시 부드러운 스크롤 위치값 업데이트
    $(window).on("mouseup keyup", ()=>{
       pos = $(window).scrollTop(); 
    })
    
    // 로딩 시 맨위로 이동
    // 전체 스크롤 이동대상은 html, body 최상위부모 2개다 잡기
     $("html, body").animate({scrollTop : "0"},200,()=>{
        pos = $(window).scrollTop(); 
     });
    



} //// 로드함수