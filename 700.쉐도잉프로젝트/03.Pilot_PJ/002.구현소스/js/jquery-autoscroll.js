// jquery로 구현한 자동 페이지 휠 JS 

// 로딩구역없이 함수로 구현

// export하기 위해 전체를 함수로 묶어주기 /////

function autoScroll() {

    // 현재 페이지 가로크기 기준 800px 이하일때 모바일로 변경
    // 모바일 상태변수 0-데스크탑 / 1-모바일
    let mob = 0;
    const updateW = () => {
        if($(window).width()<=800) mob = 1;
        else mob = 0;
        // console.log(mob);
    }/// updateW

    // 로딩 시 실행
    updateW();

    // 배너초기화 적용함수
    const callInit = () => {
        if(!mob) { 
            // 모바일 아니면 초기화
            initSet();
            // 중간페이지일 경우 초기화 제외(지우기)
            $(".page").eq(pno).find(".imgc", ".txtc a").attr("style", "");
        }
        else {
            $(".imgc", ".txtc a").attr("style", "");
        }
    };/// callInit

    // 윈도우 리사이즈 이벤트
    $(window).resize(()=>{
        updateW();
        callInit();
    }); /// resize

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
    $("html, body").animate({scrollTop : "0px"});


    /*******************************************************************
        함수명 : wheelFn
        기능 : 마우스휠 이벤트 발생시 호출됨
        -> 한페이지씩 자동 스크롤 기능
    *******************************************************************/ 

    function wheelFn() {
        // 모바일일때 작동 정지
        if(mob) return;
        // 광휠금지
        if(prot[0]) return;
        chkCrazy(0)
        
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
        $("html,body").animate({
            scrollTop:$(window).height()*pno+"px"
        }, 500, "easeInOutQuint", actPage);

        // 대상 : gnb 메뉴, 인디케이터
        gnb.eq(pno).addClass("on").siblings().removeClass("on");
        indic.eq(pno).addClass("on").siblings().removeClass("on");
    } /// movePg 

    /******************************************************************
        [ 페이지 등장 액션 요소 적용 ]
        1. 이벤트 적용 시점 - 페이지 도착 후(애니 후 콜백)
        2. 이벤트 대상 : 각 페이지 동일
        (1) 이미지 파트 : .page .imgc
        (2) 타이틀 파트 : .txtc h2 a
        3. 변경내용 :
        스타일시트 아래 항목 변경
        ((변경값))
        transform: rotate(45deg);
        opacity: 0;
        transition: 1s 1s; -> 타이틀만 지연시간
        ((고정값))
        transform-origin: left top;
        display: inline-block; -> a요소만
    ******************************************************************/

    /******************************************* 
        함수명: initSet
        기능: 등장요소 처음상태 셋팅
    *******************************************/

    function initSet() {
        // 1. 초기화
        // 대상 : .imgc
        $(".imgc").css({
            transform: "rotate(45deg)",
            opacity: 0,
            transformOrigin:"-10% -10%",
            transition: "1s"
        }) //// css

        // 대상 : .txtc h2 a
        $(".txtc a").css({
            transform: "rotate(45deg)",
            opacity: 0,
            transformOrigin: "-100% -100%",
            transition: "1s ease-in-out .5s",
            display: "inline-block"
        }) //// css
    }

    // 초기화 함수 호출 -> 모바일이 아닐때만 호출
    if(!mob) initSet();

    /*******************************************************************
        함수명 : actPage
        기능 : 페이지 도착 후 등장 애니메이션
    *******************************************************************/
    function actPage(){ //// ele - 해당 페이지 요소
        // pno가 0 또는 4가 아니면 액션 작동
        if(pno!==0 || pno!==4) {
            // 대상 : 해당순번의 .page 아래 .imgc dhk .txtc a
            $(`.page:eq(${pno}) .imgc, .page:eq(${pno}) .txtc a`).css({
                transform: "rotate(0deg)",
                opacity: 1
            }) //// css           
        } // if

        // 첫페이지 일때 초기화
        if(pno===0) initSet();
    } /////// actPage
} /// autoScroll



// 전체 함수 내보내기
export default autoScroll;