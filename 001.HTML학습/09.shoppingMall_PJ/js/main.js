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

        // 3. 블릿 클릭시 이동 현재 순번 변수(iseq)에 순번 일치하기
        iseq = Number(cseq);

    

    };// goSlide 함수

    // 3. 대상에 이벤트 설정
     abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            // 1. 인터발 지우기 함수 호출
            // clearAuto();
            // 2. 슬라이드 함수 호출
            goSlide(idx);
        } ///// click 이벤트 함수
     }) //// forEach  //////////

     // 자동넘김 설정 ///////
     // 일정 시간 간격 넘어가기
     // setInterval(함수, 시간)
     // setInterval(()=>goSlide(1), 3000);
     // setInterval(goSlide(1), 3000); 잘못된 예
     // 보낼값이 있으면 익명함수를 통해 함수를 호출한다
     // 익명함수를 통하지 않으면 제대로 작동하지 않는다
     
     // [ 인터발 함수의 함수전달값 사용 예 ]
     // 1. 함수에 전달값이 없으면 함수명만 사용가능
     // setInterval(goSlide, 3000);
     // 2. 전달값이 있으면 익명함수구역에 코딩
     // setInterval(function(){goSlide(1)}, 3000);
     // 3. 화살표함수사용가능
     // setInterval(()=>{goSlide(1)}, 3000);
     // 4. 화살표함수에서 중괄호 생략가능
     // setInterval(()=>goSlide(1), 3000);

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
    //autoSlide();

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

     /*****************************************************************
        [ 블릿 클릭 이동 구현]
        1. 오른쪽 이동 시 : 현재 블릿보다 오른쪽 클릭 시
           1) 기본형 : 오른쪽 버튼 클릭 구현
           2) 유형 : 먼저 이동 후 맨앞요소 맨뒤로 이동
           3) 원리 : 차이수 만큼 %이동 후 for문으로 순서대로 맨뒤 이동
        2. 왼쪽 이동 시 : 현재 블릿보다 왼쪽 클릭 시
           1) 기본형 : 왼쪽 버튼 클릭 구현
           2) 유형 : 먼저 이동 후 맨뒤요소 맨앞으로 이동 후 들어오기
           3) 원리 : 차이수 만큼 앞에 for문으로 쌓은 후 이동
        3. 방향 구분의 기준 : 클릭된 블릿 순번 - 현재 블릿 순번
           1) 양수면 오른쪽 이동
           2) 음수면 왼쪽 이동
     ***************************************************************** */  

     // 대상 : .indic li -> indic 변수
     // 이벤트 : click
     // 순번변수 - 블릿 순번 블릿 li클릭 함수에서 공유
     let iseq = 0;

     indic.forEach((ele, idx)=>{
        ele.onclick = () => {
            // 1. 클릭된 순번
            let cseq = idx;
            // 2. 현재 순번 iseq
            // 3. 순번차 : 클릭된 순번 - 현재순번
            let diff = cseq - iseq;
            // 순수값 차리 -> 절대값 : Math.abs()
            let pure = Math.abs(diff);
            
            console.log("클릭된 순번", cseq);
            console.log("현재 순번", iseq);
            console.log("순번차", diff);

            // 4. 방향별 슬라이드 이동
            // 4-1. 양수면 오른쪽
            if(diff>0) {
                console.log("난 오");
                // (1) 오른쪽 버튼 클릭시 다음 슬라이드가
                // 나타나도록 슬라이드 박스의 left값을
                // (-100%*순수차)로 변경시킨다.

                // 이동대상 :  slide 변수
                slide.style.left = (-100*pure)+"%"; 
                slide.style.transition = "left .4s ease-in-out";         
            
                // (2) 슬라이드 이동후!!! (0.4초후) 
                setTimeout(()=>{
                    // for문으로 자를수(순수값)만큼 순서대로 처리
                    // 계산되는 차이수(1씩 감소하여 left 값에 계산시킴)
                    let temp = pure;

                    for(let i=0;i<pure;i++) {
                        // temp 1씩 감소
                        temp--;
                        // (2-1) 바깥에 나가있는 첫번째 슬라이드 li를 잘라서 맨뒤로 보낸다!
                        // 슬라이드 li가 잘라내면 매번 변경되므로 새로 읽어서 맨뒤로 이동
                        slide.appendChild(slide.querySelectorAll("li")[0]);
                        // (2-2) 동시에 left값을 0으로 변경한다!
                        slide.style.left = (-100*temp)+"%";
                        // (2-3) 트랜지션 없애기
                        slide.style.transition = "none";         
                    } // for
                },400);// 타임아웃구간
            }
            // 4-2. 음수면 오른쪽
            else if(diff<0){
                console.log("난 왼");

                
                // (1) 왼쪽버튼 클릭시 이전 슬라이드가 나타나도록 하기위해
                // 우선 맨뒤 li를 맨앞으로 이동 -> 개수만큼 처리(pure 순수차이값)
                // slide.insertBefore(넣을놈, 넣을놈전놈)
                // slide.insertBefore(맨끝li, 맨앞li)

                // left값 계산용 변수
                let temp = 0;

                for(let i = 0; i<pure; i++) {
                    // 이동할 리스트
                    let clist = slide.querySelectorAll("li");
                    slide.insertBefore(clist[clist.length-1], clist[0])
                    // (2) 동시에 left값을 -100% 단위로 개수 변경한다.
                    // i값이 0부터 반복회수만큼 증가하므로 이것을 이용함
                    slide.style.left = ((i+1)*-100)+"%";
                    // 이때 트랜지션 없애기(한번실행후부터 생기므로)
                    slide.style.transition = "none"; 
                }
    
                // (3) 그 후 left값을 0으로 애니메이션하여
                // 슬라이드가 왼쪽에서 들어온다.            
                // 동일 속성 left가 같은 코딩처리 공간에 동시에 있으므로 분리해야 효과 있음
                // setTimeout 사용
                setTimeout(()=>{
                    slide.style.left = "0";
                    slide.style.transition = "left .4s ease-in-out"; 
                },0); ///// 타임아웃구간
            }
            // 4-3. 0이면 나가
            else {
                return;
            }

            // 5. 현재 블릿 초기화 
            indic[iseq].classList.remove("on");
            // 6. 클릭된 순번으로 현재 순번 변경
            iseq = cseq;
            // 7. 실제 변경 블릿에 on 넣기
            indic[iseq].classList.add("on");
        }
     })      


  

    
 }
/////////////////////////////////////////////