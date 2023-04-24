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

// 자동스크롤 호출
autoScroll();

// 메인페이지 

// 햄버거 버튼 클릭 시 전체 메뉴 보이기
$(".ham").click(function(){
    // 햄버거 버튼 클래스 변경
    $(this).toggleClass("on");
    // 전체 메뉴 보이기
    $(".mbox").fadeToggle(400);

    // 햄버거 버튼에 클래스 on이 있으면 재생/없으면 정지
    let isOn = $(this).is(".on");

    // 배경동영상 재생/멈춤
    if(isOn) $(".bgm").get(0).play();
    else $(".bgm").get(0).pause();
    // audio, video 요소 선택 시 get(순번)을 사용하는 것은 
    // 같은 이름의 클래스를 사용할 경우 순서대로 요소를 담음
}) /// click


/*
    [ 터치 배너 기능 구현 ]
    1.원리 : 제이쿼리 UI를 이용하여 x축으로만 드래그가 되도록 설정 후 위치값을 
      체크하여 드래그가 끝난 시점에 자동 위치 이동 애니메이션 처리 
    2. 대상 : .slide
    3. 기준
    (1) 왼쪽방향이동 : 기준값(-100%) 보다 작은 -10% 작은 경우(-110%)
    (2) 오른쪽방향이동 : 기준값(-100%) 보다 작은 -10% 큰 경우(-90%)
    (3) 제자리 이동 : 양쪽 기준값 사이일때(-110% ~ -90%)
    4. 구현 시 주의사항
    -> %단위는 모두 px단위로 변환하여 구현
    -> 배너크기가 윈도우 가로 크기와 같은 것을 활용
*/

// 1. 대상선정
const slide = $(".slide");

// 2. 드래그 설정
slide.draggable({
    axis : "x" // x축 고정
}); /// 드래그설정

// 3. 드래그가 끝난 후 -> dragstop 이벤트 발생 후
// 기준 위치 체크 후 이동애니메이션
// 윈도우 크기 리턴 함수
const reWin = () => $(window).width();

// 리사이즈 업데이트
$(window).resize(()=> {
    winW = reWin()
})
// 윈도우 가로 크기 : left 기준위치 px 변환
let winW = reWin();

// 광드래그 방지 위해 커버셋팅
const cover = $(".cover");

// 드래그 끝난 후 이벤트 함수 
slide.on("dragstop", function(){
    cover.show();

    // 슬라이드 left 위치값
    let sleft = $(this).offset().left;

    // 1. 왼쪽으로 이동 : -110% 미만
    if(sleft < -winW*1.1) {
        slide.animate({
            left : -winW*2 + "px"
        }, 600, "easeOutQuint", ()=>{
            // 이동 후  맨앞 li 맨뒤로 이동
            slide.append(slide.find("li").first()).css({left : "-100%"})
            // 커버 제거
            cover.hide();
            // 배너타이틀 함수
            showTit();
        });

        // 블릿변경함수호출
        addOn(2);
    } // if
    // 2. 오른쪽 이동 : -90% 초과
    else if(sleft > -winW*0.9) {
        slide.animate({
            left : "0px"
        }, 600, "easeOutQuint", ()=>{
            // 이동 후 맨뒤 li 맨앞으로 이동
            slide.prepend(slide.find("li").last()).css({left : "-100%"})
            // 커버 제거
            cover.hide();
            // 배너타이틀 함수
            showTit();
        });

        // 블릿변경함수호출
        addOn(0);
    } // else if
    // 3. 제자리로 이동 : -110% ~ -90%
    else {
        slide.animate({
            left : -winW +"px"
        }, 200, "easeOutQuint", ()=>{
            // 커버 제거
            cover.hide();
        })
    } // else
}) ; ///////// slide

/***********************************************************************
    [ 터치 배너 이동 시 블릿 변경 ]
    - 방법 : 잘라서 이동되는 li에 고유 순번을 사용자 정의 속성으로 처음에 설정 후
      슬라이드 이동하면 그 속성값을 읽어서 블릿 순번에 반영
***********************************************************************/

// 사용자 정의 순번 속성 대상 : .slide li
// 제이쿼리 each() 메서드 사용 : each(순번, 요소)
// 배너 li
const blist = slide.find("li");
// 배너 갯수
const bcnt  = blist.length;
blist.each((idx, ele)=>{
    // 처음 것을 마지막 순번으로 넣기
    if(idx===0) $(ele).attr("data-seq", bcnt-1)
    // 두번째 부터 끝까지 0부터 적용(1작음)
    else $(ele).attr("data-seq", idx-1)
}); /// each

/*************************************************************************
    블릿 "on" 넣기 함수
    1) 오른쪽 이동일 경우
    -> 0번째 슬라이드의 data-seq값
    2) 왼쪽 이동일 경우
    -> 2번째 슬라이드의 data-seq값
    3) 위의 선택값으로 블릿의 li순번에 on넣고 나머지는 뺀다
*************************************************************************/
// 대상선정 : .bindic li
const bindic = $(".bindic li")
function addOn(seq) { // seq - 슬라이드 순번
    // seq : 0 오른쪽 / 2 왼쪽
    // 1. 해당 슬라이드 data-seq 읽어오기
    let dseq = slide.find("li").eq(seq).attr("data-seq")
    // console.log(dseq)

    // 2. 해당 슬라이드와 동일한 순번 블릿에 "on" 넣기
    bindic.eq(dseq).addClass("on").siblings().removeClass("on");

}////////addOn

///////////////////////////////////////
////// 각 배너 등장 타이틀 셋팅 /////////
///////////////////////////////////////
let bantxt = {
    "ban1": "Men's Season<br>Collection",
    "ban2": "2023 Special<br>Collection",
    "ban3": "GongYoo<br>Collection",
    "ban4": "T-Shirt<br>Collection",
    "ban5": "Shoes<br>Collection",
    "ban6": "Wind Jacket<br>Collection"
}; ///////////// bantxt객체 //////////////

/*
    함수명 : showTit
    기능 :각 배너 타이틀 보이기
    호출 : 배너 이동 후 콜백함수에서 호출
*/

function showTit() {
    // 배너 이동 후 호출하여 해당 배너의 순번에 맞는 타이틀을 동적으로 생성하여 애니메이션 함

    // 주인공 배너
    const mainBan = slide.find("li").eq(1);

    // 1. 항상 도착후엔 두번째 슬라이드가 주인공
    // 슬라이드 순번은 1번 
    // 슬라이드 클래스명 읽어오기(타이틀이 클래스명과 연관)
    let clsnm = mainBan.attr("class");
    
    // 2. 클래스명에 해당하는 객체값 읽어오기
    let bantit = bantxt[clsnm]
    // console.log(bantit);

    // 모든 추가 타이틀 지우기
    $(".btit").remove();

    // 3. 타이틀 넣을 요소를 배너에 추가
    mainBan.append(`<h2 class="btit"></h2>`);

    // 타이틀 left 위치 변수 처리
    // ban2, ban3 오른쪽 위치
    let lval = "30%";
    if(clsnm==="ban2"||clsnm==="ban3") lval = "70%" 


    // 4. h2태그에 배너타이틀 넣기
    mainBan.find(".btit").html(bantit).css({
        position : "absolute",
        top : "55%",
        left : lval,
        transform : "translate(-50%, -50%)",
        font : "bold 4.5vmax Verdana",
        color : "#fff",
        textShadow : "1px 1px 3px #777",
        whiteSpace : "nowrap",
        opacity : 0
    }).animate({
        top : "50%",
        opacity : 1
    }, 600, "easeInOutQuart")
    
} ////// showTit


// 첫번째 배너를 위한 타이틀 함수 최초호출
setTimeout(showTit, 10);

// 타임아웃 변수
let banAgain;


//자동넘김 지우기 함수
const clearAuto = () => {
    clearInterval(banAuto);
    clearTimeout(banAgain);
    banAgain = setTimeout(banAutoSlide, 5000);
}

// 배너 이동 시 자동넘김 지우기 세팅
slide.on("drag dragstart dragstop", clearAuto)

// 자동넘김 인터발 세팅
let banAuto;
const banAutoSlide = () => {
    banAuto = setInterval(()=>{
        slide.animate({
            left : -winW*2 + "px"
        }, 600, "easeOutQuint", ()=>{
            // 이동 후  맨앞 li 맨뒤로 이동
            slide.append(slide.find("li").first()).css({left : "-100%"})
            // 커버 제거
            cover.hide();
            // 배너타이틀 함수
            showTit();
        });
    
        // 블릿변경함수호출
        addOn(2);
    },3000)
}; 

banAutoSlide();






