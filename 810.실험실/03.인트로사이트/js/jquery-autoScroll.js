// 제이쿼리로 구현한 자동페이지 휠 JS : jquery-autoScroll.js



/*******************************************************************
    [ 생성자 함수로 export 해준다]
    <생성자 함수로 변경할때 체크할점>
    1. 일반함수(funtion)는 할당형 함수로 변경 
    -> 함수명은 this 키워드로 등록
    예) function my() {} ->
        this.my = ()=>{}
    2. 변수는 외부에 공개할 것만 this 키워드로 등록
    -> 일반적으로 let, const 를 모두 변경할 필요 없이 내가 인스턴스 생성 시
    접근해야할 변수만 등록   
    3. 할당형 변수는 호출 호이스팅이 불가하므로 상단에서 바로 함수를 호출하거나
    이벤트 등록한 경우 이를 생성자 함수 하단으로 이동
    4. 생성자 함수 내부에서 this 키워드의 의미 :
    생성자 함수 자신 여기서는 AutoScroll 생성자 함수
    -> 할당형 함수 내부의 this 키워드는 생성자 함수 자신을 의미
    -> 이벤트에 속한 함수일 경우 이벤트 대상인 나 자신(this) 표현방법 : event.currentTarget


*******************************************************************/ 
function AutoScroll() {


/*******************************************************************
    대상 변수 할당
*******************************************************************/ 
// 전체 페이지번호
let pno = 0;
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

// 인스턴스 생성시 접근하여 변경가능한 속성2가지 선정
// 이동시간
this.sc_speed = 700;
// 이징값
this.easing = "easeInOutQuint";


/*******************************************************************
    함수명 : this.wheelFn
    기능 : 마우스휠 이벤트 발생시 호출됨
    -> 한페이지씩 자동 스크롤 기능
*******************************************************************/ 

this.wheelFn = () => {
    // 광휠금지
    if(prot[0]) return;
    this.chkCrazy(0)
    
    // 1. 휠 방향 알아내기
    let delta = event.wheelDelta;
    // console.log(delta);

    // 2. 방향에 따른 페이지번호 증감
    if(delta < 0) {
        pno++;
        if(pno===pgcnt) pno=pgcnt-1;
        // 마지막 페이지 번호에 고정
    }
    else {
        pno--;
        if(pno===-1) pno=0;
        //첫 페이지 번호에 고정
    }

    console.log(pno);
    // 3. 스크롤 이동하기 및 메뉴에 클래스 on 넣기
    // 대상 : html, body -> 두개를 모두 잡아야 공통적으로 적용
    this.movePg();

    
    
} /// this.wheelFn 함수

// 광클초기값
prot[1] = 0;

/*******************************************************************
    함수명 : this.chgMenu
    기능 : 메뉴 클릭 시 메뉴 변경과 페이지 이동
*******************************************************************/
this.chgMenu = () => {
    // 0. 광클금지
    if(prot[1]) return;
    this.chkCrazy(1);

    // 1.클릭된 a요소의 부모 li순번을 구함 === pno
    let idx = $(event.currentTarget).parent().index();
    console.log("ㅋㄹ", idx);
    // 2. 전역 페이지 번호에 순번 업데이트
    pno = idx;
    // 3. 스크롤 이동하기 및 메뉴에 클래스 on 넣기
    this.movePg();
} // this.chgMenu 함수

/*******************************************************************
    함수명 : chkCrazy
    기능 : 광적동작 체크하여 제어 리턴 
*******************************************************************/

this.chkCrazy = (seq) => { // 관리변수 순번
    prot[seq] = 1;
    setTimeout(()=>prot[seq]=0, this.sc_speed);
} // chkCrazy 함수

/*******************************************************************
    함수명 : movePg
    기능 : 페이지 이동 애니메이션
*******************************************************************/
this.movePg = () => {
    $("html,body").animate({
        scrollTop:$(window).height()*pno+"px"
    },this.sc_speed, // 생성시 세팅가능한 이동시간
    this.easing); // 생성시 셋팅가능한 이징

    // 대상 : gnb 메뉴, 인디케이터
    gnb.eq(pno).addClass("on").siblings().removeClass("on");
    indic.eq(pno).addClass("on").siblings().removeClass("on");
} /// this.this.movePg 

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
// this.showEle(){
//     // .minfo 페이지별 등장
//     pg.eq(pno).find(".minfo").css({
//         opacity : 1,
//         transform : "translate(-50%,0)",
//     }).parent(".page").siblings().find(".minfo").css({
//         opacity : 0,
//         transform : "translate(-50%, 50%)",
//         transition : ".6s ease-out"
//     });
// }

// 등장 액션 함수 최초호출
// setTimeout(showEle, 400);

/*******************************************************************
    이벤트 등록
*******************************************************************/ 
// 윈도우 휠 이벤트 발생 시
$(window).on("wheel", this.wheelFn);
// GNB메뉴 클릭 시 : 대상 - .gnb a
$(".gnb a").click(this.chgMenu);
// 인디케이터 클릭 시 : 대상 - .indic a
$(".indic a").click(this.chgMenu);
// 새로고침 시 스크롤 위치 캐싱 변경
$("html, body").animate({scrollTop : "0px"});

} // 생성자 함수


// 생성자 함수 내보내기
export default AutoScroll;