// jquery로 구현한 자동 페이지 휠 JS 

// 로딩구역없이 함수로 구현

/*******************************************************************
    대상 변수 할당
*******************************************************************/ 
// 전체 페이지번호
// let pno = 0;

// 1. 페이지번호 대신 스크롤 횟수
let cnt_sc = 0;

// 2. 이동 단위
const unit_sc = 200;

// 3. 스크롤 횟수 한계값 : 화면가로폭*페이지수
let limit_sc = $(window).width()*7;

// 페이지 요소 
const pg = $(".page");
// 전체 페이지개수
const pgcnt = $(".page").length;
// 광실행 금지변수
let prot = [];
// 광스크롤 금지
prot[0] = 0;
// GNB메뉴 li
const gnb = $(".gnb li");
// 인디케이터
const indic = $(".indic li")
// 각 페이지별 등장요소
const minfo = $(".minfo")

/*******************************************************************
    이벤트 등록
*******************************************************************/ 
// 윈도우 휠 이벤트 발생 시
$(window).on("wheel", wheelFn);
// GNB메뉴 클릭 시 : 대상 - .gnb a
$(".gnb a").click(chgMenu);
// 인디케이터 클릭 시 : 대상 - .indic a
$(".indic a").click(chgMenu);
// 새로고침 시 스크롤 위치 캐싱 변경
$("html, body").animate({scrollLeft : "0px"});

// 키보드 이벤트발생시 업데이트
// 1. Page Up(33) / Up Arrow (38) 
// 2. Page Down(34) / Down Arrow (40) 
$(document).keydown((e)=>{
    // 이전페이지이동
    if(e.keyCode===33 || e.keyCode===38){
        pno--;
        if (pno === -1) pno = 0;
        movePg();
    }
    // 다음페이지이동
    else if(e.keyCode===34 || e.keyCode===40){
        pno++;
        if (pno === pgcnt) pno = pgcnt - 1;
        movePg();
    }
}); ///////////// keydown ////////////////



/*******************************************************************
    함수명 : wheelFn
    기능 : 마우스휠 이벤트 발생시 호출됨
    -> 한페이지씩 자동 스크롤 기능
*******************************************************************/ 

function wheelFn() {
    // 광휠금지
    // if(prot[0]) return;
    // chkCrazy(0)
    
    // 1. 휠 방향 알아내기
    let delta = event.wheelDelta;
    // console.log(delta);

    // 2. 방향에 따른 페이지번호 증감
    if(delta < 0) {
        // 스크롤 횟수 * 단위이동값 크기가 전체크기보다 작을때만 ++처리
        if(cnt_sc*unit_sc < limit_sc) cnt_sc++;
    }
    else {
        // 스크롤 횟수 * 단위이동값 크기가 0보다 클때만 --처리
        if(cnt_sc*unit_sc > 0) cnt_sc--;
    }

    console.log(cnt_sc);
    // 3. 스크롤 이동하기 및 메뉴에 클래스 on 넣기
    // 대상 : html, body -> 두개를 모두 잡아야 공통적으로 적용
    movePg();

    
    
} /// wheelFn 함수

// 광클초기값
prot[1] = 0;

/*******************************************************************
    함수명 : chgMenu
    기능 : 메뉴 클릭 시 메뉴 변경과 페이지 이동
*******************************************************************/
function chgMenu() {
    // 0. 광클금지
    if(prot[1]) return;
    chkCrazy(1);

    // 1.클릭된 a요소의 부모 li순번을 구함 === pno
    let idx = $(this).parent().index();
    console.log("ㅋㄹ", idx);
    // 2. 전역 페이지 번호에 순번 업데이트
    pno = idx;
    // 3. 스크롤 이동하기 및 메뉴에 클래스 on 넣기
    movePg();
} // chgMenu 함수

/*******************************************************************
    함수명 : chkCrazy
    기능 : 광적동작 체크하여 제어 리턴 
*******************************************************************/

function chkCrazy(seq){ // 관리변수 순번
    prot[seq] = 1;
    setTimeout(()=>prot[seq]=0, 400);
} // chkCrazy 함수

/*******************************************************************
    함수명 : movePg
    기능 : 페이지 이동 애니메이션
*******************************************************************/
function movePg(){
    // 이동할 위치 -> 이동단위*스크롤횟수
    let mpos = unit_sc * cnt_sc;

    $("html,body").stop().animate({ // 가로스크롤 이동이므로 scrollLeft 적용
        // 가로스크롤 이동 기준은 윈도우 width
        scrollLeft : mpos+"px"
    }, 1000, "easeOutQuint");
    // , showEle);

    // 대상 : gnb 메뉴, 인디케이터
    // gnb.eq(pno).addClass("on").siblings().removeClass("on");
    // indic.eq(pno).addClass("on").siblings().removeClass("on");
} /// movePg 

// 등장할 요소 초기화
minfo.css({
    opacity : 0,
    transform : "translate(-50%, 50%)",
    transition : ".6s ease-out"
})

/*******************************************************************
    함수명 : showEle
    기능 : 페이지 이동 후 요소 등장
*******************************************************************/
function showEle(){
    // .minfo 페이지별 등장
    pg.eq(pno).find(".minfo").css({
        opacity : 1,
        transform : "translate(-50%,0)",
    }).parent(".page").siblings().find(".minfo").css({
        opacity : 0,
        transform : "translate(-50%, 50%)",
        transition : ".6s ease-out"
    });
}

// 등장 액션 함수 최초호출
// setTimeout(showEle, 400);


