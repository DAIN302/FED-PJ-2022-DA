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
    // 스크롤 등장 대상 .scAct
    const scAct = q(".scAct");

    // 상단메뉴 대상 : #top
    const topA = q("#top");
    // cg(topA);

    // 위로가기버튼 대상 : .tbtn
    const tbtn = q(".tbtn");

    // 화면높이값의 2/3구하기
    const hv = window.innerHeight/3*2;

    // 클래스 넣기 함수
    const showIt = x => { // x는 등장요소
        // 대상요소의 현재 스크롤 위치
        let xval = retVal(x)
        // 화면 높이값의 절반값에 왔을때 첫번째 박스 등장
        // hv변수 -> 화면 높이값의 절반값
        if(xval < hv && xval > 0) {
            x.classList.add("on");
        }
        // 되돌리기는 else문으로
        // else {
        //     x.classList.remove("on");
        // }
    };

    // 현재스크롤 위치변수
    let scTop;

    // 스크롤 이벤트 세팅 /////
    window.addEventListener("scroll", ()=>{
        // 현재 스크롤 위치
        scTop = window.scrollY;
        // cg(scTop);

        // 상단메뉴에 클래스 on 넣기
        if(scTop >= 100) topA.classList.add("on");
        else topA.classList.remove("on");
        
        // 상단 이동버튼에 클래스 on 넣기
        if(scTop >= 300) tbtn.classList.add("on");
        else tbtn.classList.remove("on");

        // 값 확인
        // cg("박스1"+retVal(scAct[0]));

        // 함수호출
        // 스크롤 등장 요소 개수만큼 for문 돌리기
        for(let x of scAct) showIt(x);        
    }) ///////// 스크롤 이벤트 //////////


    


} //////// 로드구역