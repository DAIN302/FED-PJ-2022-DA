// JS로 구현한 자동 페이지 휠 JS 

// 새로고침할때 스크롤위치 캐싱 무시하고 맨위로 이동
// scrollTo(가로, 세로) -> 위치이동 메서드
setTimeout(()=>{
    window.scrollTo(0,0);
}, 100)


// 로딩함수 호출 ////
window.addEventListener("DOMContentLoaded", loadFn);


/*
    함수명 : loadFn
    기능 : 페이지 로딩 시 기능 수행
*/
function loadFn() {
    // console.log("로딩완");

    // [ 이벤트 연결 대상선정 ] /////
    // (1) GNB메뉴 
    const gnb = document.querySelectorAll(".gnb a");
    // (2) 인디케이터 메뉴 
    const indic = document.querySelectorAll(".indic a");

    // [ 이벤트 연결 함수등록 ] /////
    // (1) GNB메뉴 이벤트 연결
    gnb.forEach((ele,idx,obj)=> { // ele-요소, idx-순번, obj-전체객체
        ele.addEventListener("click", ()=>movePg(idx, obj));
        // 전체 객체(obj)를 함수에 전달하는 이유는?
        // -> 인디케이터도 GNB와 같은 기능을 수행하기 때문에
        // 호출 후 자기자신 전체를 보내야 각각에 맞게 기능 수행
    })
    // (2) 인디케이터 메뉴 이벤트 연결
    indic.forEach((ele,idx,obj)=> { // ele-요소, idx-순번, obj-전체객체
        ele.addEventListener("click", ()=>movePg(idx, obj));
    })


    /***************************************************************************
        [ 휠 이벤트를 이용한 페이지 이동 컨트롤 ]
        -> 휠 이벤트명 : wheel
        (예전엔 mousewheel 이벤트가 사용됨 - 공식적으로 폐기됨)

        1. 사용법
           (1) 이벤트속성에 함수를 할당
               요소.onwheel = 함수
           (2) 브라우저 이벤트에 등록
               요소.addEventListner("wheel", 함수, {옵션})
        2. 포인트
           (1) 기존 휠이동 기능 정지 -> event.preventDefault()
           (2) 휠 방향을 알아내어 기능과 매칭   
               -> event.wheelDelta(휠방향속성)   
           (3) 페이지번호를 전역적으로 사용
               -> let pgnum = 0    
        3. 휠 이벤트 대상 : 
           (1) 전체 스크롤바인 경우 : window
           (2) 개별박스인 경우 : 선택요소
        4. scroll 이벤트와 wheel 이벤트 비교
           (1) 공통점 : 스크롤된 페이지의 위치 이동
           (2) 차이점 : 
               wheel -> 마우스 휠의 동작에만 반응하는 이벤트 
               scroll -> 스크롤바의 이동에 반응하는 이벤트
        _____________________________________________________________________
        
        [ addEventListner 메서드의 옵션에 관하여 ]
        기존 addEventListener의 3번째 파라미터로 캡쳐링/버블링 여부를 
        제어할 수 있는 부분이 EventListenerOptions이라는 객체형태의 
        추가 옵션을 받을수 있음

        EventListenerOptions 사용 전
        document.addEventListener('touchstart', handler, false);

        EventListenerOptions 사용 후
        document.addEventListener("touchstart", handler, {
            capture: false,
            once: false,
            passive: false
        });

        ※ 현재 크롬에서 지원하는 EventListenerOptions 옵션은 다음과 같다.

        (1) capture: 이벤트 캡쳐링 적용 여부. 크롬 49부터 지원
        (2) once: 이벤트를 한번만 호출하고 해제되는 옵션. 크롬 55부터 지원
        (3) passive: 스크롤 성능 향상을 위한 옵션으로 true일 경우, 
                스크롤을 위해 블록되는 것을 방지함. 이 경우, 
                preventDefault를 사용할 수 없음. 크롬 51부터 지원
                이 중, passive 속성은 성능향상을 위해, 
                브라우저의 기능을 프로그래밍으로 제어할수 있음
                -> 최근 업데이트된 브라우저는 passive기본값이 true로 세팅됨으로
                window, document, body 이 세가지 객체에 대해 스크롤 막기 기능을
                비활성화함
                따라서 기본기능을 막고자하면 passive:false로 기능을 활성화해야함
    ***************************************************************************/

    // 0. 변수 설정
    // (1) 전체 페이지 변수
    let pgnum = 0; // 현재 페이지 번호(첫페이지 0)
    // (2) 전체 페이지 수
    const pgcnt = document.querySelectorAll(".page").length;
    // console.log(pgcnt);
    // (3) 광스크롤 금지변수 0-허용 1-불허용
    let prot_sc = 0;


    // 1. 전체 휠 이벤트 설정 /////
    window.addEventListener("wheel", wheelFn, {passive:false})

    // 2. 휠 이벤트 함수 만들기
    function wheelFn(e) { // e - 이벤트 전달 변수
        // (0) 기본기능 멈추기
        // addEventListener 옵션 passive:false 필수
        e.preventDefault();

        // 광스크롤막기
        if(prot_sc) return;
        prot_sc = 1; // 신호1개만 허용
        setTimeout(()=>prot_sc=0,800);
        // 0.8초 시간후 다시 허용상태전환

        // (1) 호출확인
        // console.log("휠");

        // (2) 휠 방향 알아내기
        // 이벤트객체.wheelDelta
        let dir = e.wheelDelta;
        // console.log(dir);
        // 휠내리면 마이너스 올리면 플러스
        
        // (3) 방향에 따른 페이지번호 증감
        // 스크롤 아랫방향 : 페이지번호 증가
        if(dir<0) {
            // 페이지번호 1씩 증가
            pgnum++;
            // 한계수 : 페이지 끝번호(페이지수-1)
            if(pgnum>pgcnt-1) pgnum = pgcnt-1;
        } // if
        // 스크롤 윗방향 : 페이지번호 감소
        else {
            // 페이지번호 1씩 감소
            pgnum--;
            // 한계수 : 페이지 첫번호(0)
            if(pgnum<0) pgnum = 0;
        } // else
        console.log(pgnum);

        // (4) 페이지 이동 + 메뉴변경 -> updatePg함수 호출
        updatePg(gnb);
        updatePg(indic);
        
    } ///// wheelFn

    /**************************************************
        함수명 : movePg
        기능 : 메뉴 클릭 시 해당 위치로 이동
    **************************************************/

    function movePg(seq,obj) { // seq-순번, obj-요소 전체
        // 1. 기본기능 막기
        event.preventDefault();
        // 2. 호출확인
        console.log("이동", seq, obj);
        // 3. 페이지번호(pgnum) 업데이트
        pgnum = seq;
        console.log("메뉴클릭페이지번호", pgnum);

        // 4. 업데이트 페이지 호출 -> 페이지이동, 메뉴변경
        // 개별객체를 업데이트 할때는 obj가 필요했으나
        // GNB메뉴와 인디케이터가 모두 업데이트 되어야하므로 
        // 개별 obj 가 필요없게됨
        updatePg(gnb);
        updatePg(indic);
 
    } // movePg ///////

    /**************************************************
        함수명 : updatePg
        기능 : 페이지 이동 시 설정값 업데이트
    **************************************************/
   function updatePg(obj) { // obj - 변경할 메뉴 전체 객체
        // 1. 함수호출확인
        console.log("업뎃");
        // 2. 페이지 이동
        window.scrollTo(0, window.innerHeight*pgnum);
        // scrollTo(가로, 세로)
        // 세로 이동위치 : 윈도우높이값*페이지번호
        // 3. 메뉴 초기화(클래스 on제거)
        for(let x of obj) {
            x.parentElement.classList.remove("on");
        }
        // 4. 해당 메뉴에 클래스 넣기
        obj[pgnum].parentElement.classList.add("on");

        // 5. 페이지 이동 후 해당 페이지 액션주기
        // pageAction 함수 호출 (페이지 이동 시차를 1초로 설정)
        setTimeout(()=>pageAction(pgnum),1000);
        
   } // updatePg 함수

    /**************************************************
        함수명 : initCSS
        기능 : 등장할 요소들의 초기값 세팅
    **************************************************/
   // 1. 대상선정 : .minfo
   const minfo = document.querySelectorAll(".minfo");
   // 2. 이벤트 설정
   minfo.forEach((ele, idx)=>{initCSS(ele,idx)});
   // 3. 함수만들기
   function initCSS(ele,seq) { //ele - 요소, seq - 순번
    // 1.호출확인
    console.log("초기화", seq);
    // 2. 해당요소 스타일속성 선택
    let sty = ele.style;
    // 3. 각 요소별 초기화
    if(seq===0){ // 1번 페이지

    }
    else if(seq===1){ // 2번 페이지
        // 투명하게
        sty.opacity = 0;
    }
   } /// initCSS 

    /**************************************************
        함수명 : pageAction
        기능 : 페이지별 액션 주기
    **************************************************/
   function pageAction(seq) { // seq - 변경순번
    // 1. 호출확인
    console.log("액션", seq);

    // 2. 변경대상 스타일 속성선택
    let sty = minfo[seq].style

    // 3. 전체 초기화
    minfo.forEach((ele, idx)=>{initCSS(ele,idx)});
    
    // 4. 해당페이지 액션주기
    if(seq===0){ // 1번 페이지

    }
    else if(seq===1){ // 2번 페이지
        // 투명도 복원
        sty.opacity = 1;
        // 트랜지션
        sty.transition = "1s ease-in";
    }
   } // pageAction

    
} // 로드 함수