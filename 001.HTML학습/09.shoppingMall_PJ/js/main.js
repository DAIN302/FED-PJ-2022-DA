// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

// HTML태그 로딩후 loadFn함수 호출! ///
window.addEventListener("DOMContentLoaded", loadFn);

/***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:

        (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -100%로 변경시킨다.
            -> 슬라이드 이동후!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 left값을 0으로 변경한다!

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 left값을
            -100%로 변경한다.
            그 후 left값을 0으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/

 //////////////// loadFn 함수 ///////////////
 function loadFn() {
    // console.log("로딩완");

    // 슬라이드 리스트 
    let slist = document.querySelectorAll("#slide>li");

    // 잘라내기로 li 순번이 뒤섞이므로 블릿변경 매칭을 위한 고유 순번을 
    // 사용자 정의 속성(data-)으로 만들어주기
    slist.forEach((ele,idx)=> {
        // data-seq 라는 사용자 정의 속성넣기
        ele.setAttribute("data-seq", idx);
    }); ///// forEach

    // 1. 대상선정
    // 1-1. 이벤트대상 : .abtn
    const abtn = document.querySelectorAll(".abtn");
    // 1-2. 변경대상 : #slide
    const slide = document.querySelector("#slide");
    // 1-3. 블릿 대상 : .indic
    const indic = document.querySelectorAll(".indic li");
    // console.log(indic);

    // 광클금지 변수 : 0은 허용, 1은 불허용
    let prot = 0;

    // 2. 슬라이드 변경 함수 만들기
    //호출 시 seq 에 들어오는 값 중 1은 오른쪽, 0은 왼쪽
    const goSlide = (seq) => {
        console.log("슬고", seq);
        
        console.log("못들어갔어!");
        // 광클금지 설정 - 광클하면 슬라이드 액션이 망가짐
        if(prot) return;
        prot = 1; // 잠금
        setTimeout(()=>{
            prot=0;// 해제
        },400)
        console.log("들아았어!");

        // 0. 현재의 슬라이드 li 수집
        let clist = slide.querySelectorAll("li");

        // 1. 방향에 따른 분기
        // 1-1. 오른쪽버튼 클릭시 : seq===1
        if(seq) {
            console.log("난 오");
            // (1) 오른쪽 버튼 클릭시 다음 슬라이드가
            // 나타나도록 슬라이드 박스의 left값을
            // -100%로 변경시킨다.

            // 이동대상 :  slide 변수
            slide.style.left = "-100%"; 
            slide.style.transition = "left .4s ease-in-out";         
            
            // (2) 슬라이드 이동후!!! (0.4초후) 
            setTimeout(()=>{
                // (2-1) 바깥에 나가있는 첫번째 슬라이드 li를 잘라서 맨뒤로 보낸다!
                slide.appendChild(clist[0]);
                    // (2-2) 동시에 left값을 0으로 변경한다!
                    slide.style.left = "0";
                    // (2-3) 트랜지션 없애기
                    slide.style.transition = "none";         
        },400);// 타임아웃구간
        } // if문(오른쪽버튼클릭시)
        // 1-2. 왼쪽버튼 클릭시 : seq===0
        else {
            console.log("난 왼");
            // (1) 왼쪽버튼 클릭시 이전 슬라이드가
            // 나타나도록 하기위해 우선 맨뒤 li를
            // 맨앞으로 이동
            // slide.insertBefore(넣을놈, 넣을놈전놈)
            // slide.insertBefore(맨끝li, 맨앞li)
            slide.insertBefore(clist[clist.length-1], clist[0])
            // (2) 동시에 left값을 -100%로 변경한다.
            slide.style.left = "-100%";
            // 이때 트랜지션 없애기(한번실행후부터 생기므로)
            slide.style.transition = "none"; 

            // (3) 그 후 left값을 0으로 애니메이션하여
            // 슬라이드가 왼쪽에서 들어온다.            
            // 동일 속성 left가 같은 코딩처리 공간에 동시에 있으므로 분리해야 효과 있음
            // setTimeout 사용
            setTimeout(()=>{
                slide.style.left = "0";
                slide.style.transition = "left .4s ease-in-out"; 
            },0); ///// 타임아웃구간

        }// else문(왼쪽버튼클릭시)

        // 2. 현재 슬라이드 순번과 같은 블릿 표시하기
        // 대상 : indic 변수
        // indic[순번].classList.add("on");
        // 2-1. 현재 배너리스트 업데이트
        clist = slide.querySelectorAll("li"); 
        // 오른쪽 클릭 시(seq===1) 두번째 슬라이드[1]
        // 왼쪽 클릭 시(seq===0) 첫번째 슬라이드[0]
        // seq순번과 읽어올 슬라이드 순번이 일치
        // 2-2. 방향별 읽어올 슬라이드 순번으로 "data-seq" 값 읽어오기
        let cseq = clist[seq].getAttribute("data-seq")
        console.log("현재순번", cseq)
        // 2-3. 블릿 초기화
        for(let x of indic) {
            x.classList.remove("on");
        }
        // 2-4. 읽어온 슬라이드 순번의 블릿에 클래스 on 넣기
        indic[cseq].classList.add("on");
        



    };// goSlide 함수

    // 3. 대상에 이벤트 설정
     abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            goSlide(idx);
        } ///// click 이벤트 함수
     }) //// forEach  //////////


 }
/////////////////////////////////////////////