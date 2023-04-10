// 제이쿼리로 구현한 자동페이지 휠 JS : jquery-autoScroll-class.js

/*******************************************************************
    [ 클래스로 export 해준다 ]
     - 변경사항들 
     1. 공용 변수는 constructor에 this 키워드로 등록
     2. 모든 함수는 메서드 형태로 변경함
        function 이름(){}-> 이름(){}
     3. 서로 다른 메서드에서 클래스 내부 다른 메서드를 호출할 때
        this 키워드를 사용하여 호출
     4. 이벤트 등록 시 addEventListener(이벤트명, 함수)
        함수일때는 함수명만 쓰면 등록되었으나 클래스는 함수가 아닌
        메서드이므로 이것은 익명함수구역을 만들고 함수를 호출하는 방식으로
        this 키워드를 사용한 메서드 호출을 해야함        
*******************************************************************/ 

class AutoScroll {
    // 생성자 메서드 (최초실행구역)
    constructor() {
        /*******************************************************************
            대상 변수 할당
        *******************************************************************/ 
        // 전체 페이지번호
        this.pno = 0;
        // 페이지 요소 
        this.pg = $(".page");
        // 전체 페이지개수
        this.pgcnt = $(".page").length;
        // 광실행 금지변수
        this.prot = [];
        // 광스크롤 금지
        this.prot[0] = 0;
        // 광클 초기값
        this.prot[1] = 0;
        // this.gnb메뉴 li
        this.gnb = $(".gnb li");
        // 인디케이터
        this.indic = $(".indic li")
        // 각 페이지별 등장요소
        this.minfo = $(".minfo")

        // 인스턴스 생성시 접근하여 변경가능한 속성2가지 선정
        // 이동시간
        this.sc_speed = 700;
        // 이징값
        this.easing = "easeInOutQuint";

        // 최초로 호출할 메서드도 여기서 호출
        this.initPg();
} // constructor

/**********************************************************
    메서드명 : initPg
    기능 : 페이지 초기세팅

**********************************************************/
initPg() {
    /*******************************************************************
        이벤트 등록 
    *******************************************************************/ 
    // 윈도우 휠 이벤트 발생 시
    $(window).on("wheel", ()=>this.wheelFn());
    // this.gnb메뉴 클릭 시 : 대상 - .this.gnb a
    $(".gnb a").click(()=>this.chgMenu());
    // 인디케이터 클릭 시 : 대상 - .this.indic a
    $(".indic a").click(()=>this.chgMenu());
    // 새로고침 시 스크롤 위치 캐싱 변경
    $("html, body").animate({scrollTop : "0px"});
} // initPg 메서드

/*******************************************************************
    메서드명 : wheelFn
    기능 : 마우스휠 이벤트 발생시 호출됨
    -> 한페이지씩 자동 스크롤 기능
*******************************************************************/ 

wheelFn () {
    // 광휠금지
    if(this.prot[0]) return;
    this.chkCrazy(0)
    
    // 1. 휠 방향 알아내기
    let delta = event.wheelDelta;
    // console.log(delta);

    // 2. 방향에 따른 페이지번호 증감
    if(delta < 0) {
        this.pno++;
        if(this.pno===this.pgcnt) this.pno=this.pgcnt-1;
        // 마지막 페이지 번호에 고정
    }
    else {
        this.pno--;
        if(this.pno===-1) this.pno=0;
        //첫 페이지 번호에 고정
    }

    console.log(this.pno);
    // 3. 스크롤 이동하기 및 메뉴에 클래스 on 넣기
    // 대상 : html, body -> 두개를 모두 잡아야 공통적으로 적용
    this.movePg();  
    
} /// wheelFn 메서드

/*******************************************************************
    메서드명 : chgMenu
    기능 : 메뉴 클릭 시 메뉴 변경과 페이지 이동
*******************************************************************/
chgMenu (){
    // 0. 광클금지
    if(this.prot[1]) return;
    this.chkCrazy(1);

    // 1.클릭된 a요소의 부모 li순번을 구함 === this.pno
    let idx = $(event.currentTarget).parent().index();
    console.log("ㅋㄹ", idx);
    // 2. 전역 페이지 번호에 순번 업데이트
    this.pno = idx;
    // 3. 스크롤 이동하기 및 메뉴에 클래스 on 넣기
    this.movetPg();
} // this.chgMenu 메서드

/*******************************************************************
    메서드명 : chkCrazy
    기능 : 광적동작 체크하여 제어 리턴 
*******************************************************************/

chkCrazy (seq){ // 관리변수 순번
    this.prot[seq] = 1;
    setTimeout(()=>this.prot[seq]=0, this.sc_speed);
} // chkCrazy 메서드

/*******************************************************************
    메서드명 : movePg
    기능 : 페이지 이동 애니메이션
*******************************************************************/
movePg() {
    $("html,body").animate({
        scrollTop:$(window).height()*this.pno+"px"
    },this.sc_speed, // 생성시 세팅가능한 이동시간
    this.easing); // 생성시 셋팅가능한 이징

    // 대상 : this.gnb 메뉴, 인디케이터
    this.gnb.eq(this.pno).addClass("on").siblings().removeClass("on");
    this.indic.eq(this.pno).addClass("on").siblings().removeClass("on");
} ///  

// 등장할 요소 초기화
// this.minfo.css({
//     opacity : 0,
//     transform : "translate(-50%, 50%)",
//     transition : ".6s ease-out"
// })

/*******************************************************************
    메서드명 : showEle
    기능 : 페이지 이동 후 요소 등장
*******************************************************************/
// this.showEle(){
//     // .this.minfo 페이지별 등장
//     this.pg.eq(this.pno).find(".this.minfo").css({
//         opacity : 1,
//         transform : "translate(-50%,0)",
//     }).parent(".page").siblings().find(".this.minfo").css({
//         opacity : 0,
//         transform : "translate(-50%, 50%)",
//         transition : ".6s ease-out"
//     });
// }

// 등장 액션 메서드 최초호출
// setTimeout(showEle, 400);



} // 생성자 메서드


// 클래스 내보내기
export default AutoScroll;

