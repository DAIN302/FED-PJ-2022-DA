// 쇼핑몰 배너 JS - 03.페이드효과 //

// 로딩후 loadFn함수 호출 //////////
window.addEventListener("DOMContentLoaded", loadFn);

/******************************************** 
 * 
    [ 페이드 효과 슬라이드 기능정의 ]
    -> 슬라이드 순번에 대한 전역변수를 사용한다!

    1. 오른쪽 버튼클릭시 다음 순번슬라이드에
    클래스 "on"을 줘서 opacity:1, z-index:1
    로 보이며 맨위로 설정해준다!(트랜지션적용)
    ->나머지 li는 모두 "on"을 지워서 초기화!

    2. 왼쪽버튼은 이전순번이 나오며 위와 동일

    3. 끝번호에 가서는 처음은 마지막으로 
    마지막은 처음으로 슬라이드가 다시 반복된다.

    4. 블릿은 현재 슬라이드와 일치된 순번표시

********************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩후 이벤트설정 및 슬라이드 기능
******************************************/
function loadFn() {
    // console.log("로딩완");

    // 슬라이드 번호 변수
    let snum = 0;

    // 1. 대상선정
    // 1-1. 이벤트대상 : .abtn
    const abtn = document.querySelectorAll(".abtn");
    // 1-2. 변경대상 : #slide
    const slide = document.querySelectorAll("#slide>li");
    // 슬라이드 개수 변수
    let scnt = slide.length;
    // 1-3. 블릿 대상 : .indic
    const indic = document.querySelectorAll(".indic li");
    console.log(scnt);

    // 광클금지변수 : 0 - 허용, 1 - 불허용
    let prot = 0;
    

    // 2. 슬라이드 변경 함수 만들기
    const goSlide = (seq) => {
        console.log("슬고", seq);
        // 광클금지 설정하기 //////
        if (prot) return;
        prot = 1; // 잠금!
        setTimeout(() => {
            prot = 0; // 해제!
        }, 400); /// 0.4초후 해제! ///

        // 1. 방향에 따른 분기
        // 1-1. 오른쪽버튼 클릭시 : seq===1
        if(seq) {
            snum++;
            console.log("난 오", snum);
            // 슬라이드 번호 증가
        }
        // 1-2. 왼쪽버튼 클릭시 : seq===0
        else {
            snum--;
            console.log("난 왼", snum);
            // 슬라이드 번호 감소
        }

        // 2. 한계값 체크 : 
        // 처음이전-> 끝, 끝다음 ->처음
        if(snum===-1) snum = scnt - 1;
        else if(snum === scnt) snum = 0;

        // 3. 이동 : 해당순번 슬라이드 li에 클래스 "on" 넣기
        // 변경대상 :  slide 변수
        // 전체초기화
        chgSlide(slide);

        // 4. 블릿연결 : 해당순번 블릿 li에 클래스 "on" 넣기
        // 변경대상 :  indic 변수
        // 전체초기화
        chgSlide(indic);


    };// goSlide 함수

    // 3. 대상에 이벤트 설정
     abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            clearAuto();
            goSlide(idx);
        } ///// click 이벤트 함수
     }) //// forEach  //////////

    // 인터벌 함수 지우기 위한 변수
     let autoI;
     // 타임아웃 함수 지우기 위한 변수
     let autoT;

     /*****************************************************************
        함수명 : autoslide
        기능 : 인터벌함수로 슬라이드 함수 호출 
     ***************************************************************** */
    function autoSlide() {
        console.log("인터발ㅎㅇ");
        // 인터발함수로 슬라이드 함수 호출
        autoI = setInterval(()=>goSlide(1), 3000);
    }/////// autoSlide 함수

    // 자동넘김 최초호출
    autoSlide();

    /*****************************************************************
        함수명 : clearAuto
        기능 : 인터벌함수를 지우고 다시 세팅
     ***************************************************************** */    
    function clearAuto() {
        console.log("인터발 ㅂㅂ");
        // 1. 인터발 지우기
        clearInterval(autoI);

        // 2. 타임아웃도 지우지 않으면 쌓여서 타임아웃 쓰나미 실행이 발생
        clearTimeout(autoT);

        // . 잠시 후 다시 작동하도록 타임아웃으로 인터발함수 호출
        // 5초후(인터발은 3초후, 토탈 8초후 작동시작)
        autoT = setTimeout(autoSlide, 5000);
    }

    /***************************************************
        블릿 클릭 시 슬라이드 이동
    ***************************************************/ 
   // 이벤트 대상 : indic 변수
   // 이벤트 종류 : click
   indic.forEach((ele, idx)=>{
    ele.onclick = () => {
        // 전역변수 snum 업데이트
        // 블릿순번===슬라이드순번
        snum = idx;
        // 전체블릿초기화
        chgSlide(indic)

        // 3. 이동 : 해당순번 슬라이드 li에 클래스 "on" 넣기
        // 변경대상 :  slide 변수
        // 전체초기화
        chgSlide(slide);

        clearAuto();
    }
})

/* 
    슬라이드, 블릿 변경기능 공통함수 
    함수명 : chgSlide
*/

    function chgSlide(obj) {
        // 전체초기화
        obj.forEach((ele)=>{
            ele.classList.remove("on");
        })

        // 해당순번 li에 클래스 넣기
        obj[snum].classList.add("on");
        
    }
 }
/////////////////////////////////////////////