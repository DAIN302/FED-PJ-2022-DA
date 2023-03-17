// JS실험실 : 03.배너스타일2 JS - ban2.js

window.addEventListener("DOMContentLoaded", loadFn);

/***************************************************** 
    [ 슬라이드 이동 기능정의 ]
    1. 이벤트 종류: click
    2. 이벤트 대상: 이동버튼(.abtn)
    3. 변경 대상: 슬라이드 박스(#slide)
    4. 기능 설계:
        -> left 이동의 기준값이 -220% 인것이 포인트
        (이유 : 2장의 슬라이드가 앞에 나가있음, 잘라내는 것이 숨겨져야 하므로 세팅한 것)

        (1) 오른쪽 버튼 클릭시
            ※ 변경된부분!!!
            {   트랜지션 중앙 커지기를 적용한 경우이므로
                왼쪽버튼과 같이 잘라내기를 먼저하여
                슬라이드 주인공 순서를 일치 시킨다!!!! }
            -> 슬라이드 이동전!!! 
            바깥에 나가있는 첫번째 슬라이드
            li를 잘라서 맨뒤로 보낸다!
            동시에 left값을 -110%으로 변경한다!
        
            다음 슬라이드가
            나타나도록 슬라이드 박스의 left값을
            -220%로 변경시킨다.

        (2) 왼쪽버튼 클릭시 이전 슬라이드가
            나타나도록 하기위해 우선 맨뒤 li를
            맨앞으로 이동하고 동시에 left값을
            -330%로 변경한다.
            그 후 left값을 -220%으로 애니메이션하여
            슬라이드가 왼쪽에서 들어온다.

        (3) 공통기능: 슬라이드 위치표시 블릿
            - 블릿 대상: .indic li
            - 변경 내용: 슬라이드 순번과 같은 순번의
            li에 클래스 "on"주기(나머진 빼기->초기화!)

*****************************************************/

let goSlide;

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/

//////////////// loadFn 함수 ///////////////
function loadFn() {
    // console.log("로딩완");

    // 1. 대상선정
    // 1-1. 이벤트대상 : .abtn
    const abtn = document.querySelectorAll(".abtn");
    // 1-2. 변경대상 : #slide
    const slide = document.querySelector("#slide");
    // 1-3. 블릿 대상 : .indic
    const indic = document.querySelectorAll(".indic li");
    // 1-4. 슬라이드 리스트
    let slist = document.querySelectorAll("#slide>li");

    // [ 드래그 대상(#slide) 드래그 적용 함수 호출 ]
    goDrag(slide)

    // [ 초기화 1 : 순번붙이기 ] /////////////////
    // 잘라내기로 li 순번이 뒤섞이므로 블릿변경 매칭을 위한 고유 순번을
    // 사용자 정의 속성(data-)으로 만들어주기
    slist.forEach((ele, idx) => {
        // data-seq 라는 사용자 정의 속성넣기
        ele.setAttribute("data-seq", idx);
    }); ///// forEach

    // [ 초기화 2 : 맨 뒤 요소 맨 앞으로 이동 2번하기 - slide05.jpg를 맨앞에서 2번째로 이동 ]
    // 맨뒤 맨앞 이동 함수
    const chgSeq = () => {
        // 현재 슬라이드 li 새로읽기(2번 반복시 li순서가 달라지기 때문)
        slist = document.querySelectorAll("#slide>li");
        // 반복하기때문에 재할당을 해주는것임 반복할때 다시한번 얘를 읽으라고
        // 그러면 반복시 바뀐 리스트번호를 읽는것임
        // 맨뒤요소 맨앞으로 이동 -> 변경대상 #slide -> slide변수
        // slide.insertBefore(넣을놈, 넣을놈전놈)
        // slide.insertBefore(마지막요소, 첫요소)
        slide.insertBefore(slist[slist.length - 1], slist[0]);
    }; ////////chgSeq 함수

    // 2번 맨뒤 맨앞 이동함수 호출
    for (let i = 0; i < 2; i++) chgSeq();

    // 광클금지 변수 : 0은 허용, 1은 불허용
    let prot = 0;

    // 2. 슬라이드 변경 함수 만들기
    //호출 시 seq 에 들어오는 값 중 1은 오른쪽, 0은 왼쪽
    goSlide = (seq) => {
        // console.log("슬고", seq);

        // console.log("못들어갔어!");
        // 광클금지 설정 - 광클하면 슬라이드 액션이 망가짐
        if (prot) return;
        prot = 1; // 잠금
        setTimeout(() => {
            prot = 0; // 해제
        }, 400);
        // console.log("들아았어!");

        // 0. 현재의 슬라이드 li 수집
        let clist = slide.querySelectorAll("li");

        // 1. 방향에 따른 분기
        // 1-1. 오른쪽버튼 클릭시 : seq===1
        if (seq) {
            //  console.log("오른!");

            // 1. 슬라이드 이동전 먼저 잘라낸다!
            // 이유: 슬라이드 순서를 왼쪽이동과 동일하게 함!
            // 중앙확대 트랜지션 적용시 동작이 달라지므로!

            // (1-1) 바깥에 나가있는 첫번째 슬라이드
            //       li를 잘라서 맨뒤로 보낸다!
            slide.appendChild(clist[0]);
            // (1-2) 동시에 left값을 -110%으로 변경한다!
            slide.style.left = "-110%";
            // (1-3) 트랜지션 없애기!
            slide.style.transition = "none";

            // (2) 오른쪽 버튼 클릭시 다음 슬라이드가
            //     나타나도록 슬라이드 박스의 left값을
            //     -220%로 변경시킨다.

            // [코드분리하기!] //////////////////////////
            // -> 같은속성변경을 같은 메모리공간에서 수행하면
            // 변경효과가 없음!!!
            setTimeout(() => {
                slide.style.left = "-220%";
                slide.style.transition = "left .4s ease-out";
            }, 1); //// 타임아웃 //////
            // 시간에 0을 쓰면 인터발호출시 트랜지션이 안먹히는 에러가 있음

            // -> 타이밍함수는 기존 함수인 스택(Stack)메모리 공간이 아닌
            // 대기실행 공간인 큐(Queue)메모리공간에서 실행하므로
            // 코드가 동시에 바뀌는 것을 막아주고 의도한 대로
            // 시차실행을 가능하게 해준다!
        } // if문(오른쪽버튼클릭시)
        // 1-2. 왼쪽버튼 클릭시 : seq===0
        else {
            // console.log("난 왼", clist[clist.length-1]);
            // (1) 왼쪽버튼 클릭시 이전 슬라이드가
            // 나타나도록 하기위해 우선 맨뒤 li를
            // 맨앞으로 이동
            // slide.insertBefore(넣을놈, 넣을놈전놈)
            // slide.insertBefore(맨끝li, 맨앞li)
            slide.insertBefore(clist[clist.length - 1], clist[0]);
            // (2) 동시에 left값을 -330%로 변경한다.
            slide.style.left = "-330%";
            // 이때 트랜지션 없애기(한번실행후부터 생기므로)
            slide.style.transition = "none";

            // (3) 그 후 left값을 0으로 애니메이션하여
            // 슬라이드가 왼쪽에서 들어온다.
            // 동일 속성 left가 같은 코딩처리 공간에 동시에 있으므로 분리해야 효과 있음
            // setTimeout 사용
            setTimeout(() => {
                slide.style.left = "-220%";
                slide.style.transition = "left .4s ease-in-out";
            }, 0); ///// 타임아웃구간
        } // else문(왼쪽버튼클릭시)

        // 2. 현재 슬라이드 순번과 같은 블릿 표시하기
        // 대상 : indic 변수
        // indic[순번].classList.add("on");
        // 2-1. 현재 배너리스트 업데이트
        clist = slide.querySelectorAll("li");
        // 오른쪽 클릭 시(seq===1) 두번째 슬라이드[1]
        // 왼쪽 클릭 시(seq===0) 첫번째 슬라이드[0]
        // seq순번과 읽어올 슬라이드 순번이 일치
        // 2-2. 방향별 읽어올 슬라이드 순번으로 "data-seq" 값 읽어오기
        let cseq = clist[2].getAttribute("data-seq");
        // console.log("현재순번", cseq)
        // 2-3. 블릿 초기화
        for (let x of indic) {
            x.classList.remove("on");
        }
        // 2-4. 읽어온 슬라이드 순번의 블릿에 클래스 on 넣기
        indic[cseq].classList.add("on");
    }; // goSlide 함수

    // 3. 대상에 이벤트 설정
    abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            // 0. 기본이동막기
            event.preventDefault();
            // 1. 인터발 지우기 함수 호출
            // clearAuto();
            // 2. 슬라이드 함수 호출
            goSlide(idx);
        }; ///// click 이벤트 함수
    }); //// forEach  //////////

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
        // console.log("인터발ㅎㅇ");
        // 인터발함수로 슬라이드 함수 호출
        autoI = setInterval(() => goSlide(1), 3000);
    } /////// autoSlide 함수

    // 자동넘김 최초호출
    // autoSlide();

    /*****************************************************************
        함수명 : clearAuto
        기능 : 인터벌함수를 지우고 다시 세팅
     ***************************************************************** */
    function clearAuto() {
        // console.log("인터발 ㅂㅂ");
        // 1. 인터발 지우기
        clearInterval(autoI);

        // 2. 타임아웃도 지우지 않으면 쌓여서 타임아웃 쓰나미 실행이 발생
        clearTimeout(autoT);

        // . 잠시 후 다시 작동하도록 타임아웃으로 인터발함수 호출
        // 5초후(인터발은 3초후, 토탈 8초후 작동시작)
        autoT = setTimeout(autoSlide, 5000);
    } // clearAuto함수


    /*
        [ 슬라이드 드래그 적용 시 체크사항 ]
        1. 드래그 적용 시 X축, Y축 중 한쪽 방향만 적용시킴
           (가로슬라이드인 경우 X축만 적용 활성화) 
        2. 드래그 대상 슬라이드의 모든 하위요소는 선택이 되지 않도록
           아래와 같이 CSS속성 세팅
           -> user-select: none; : 선택 금지
              -webkit-user-drag: none; : 드래그 금지
              예) #slide * {선택/드래그 금지 속성 세팅}
        3. 마지막포인트 (lx)를 초기값과 같은 값으로 세팅    
           -> #slide 에는 left : -220%적용 
        4. 이동함수를 호출할 수 있게 전역함수화 함
           -> 함수 바깥쪽에 선언 
        5. 드래그 시 이동할 때 적용된 트랜지션 지워주기
           -> transition : none
           -> 드래그 함수 내 mousemove 이벤트 함수구역에 설정
        6. 드래그 마지막(mouseup) 처리 시 마지막 위치 업데이트는 할 필요 없음
           -> lastPoint() 함수 호출 주석 처리
        7. 슬라이드 이동 시 트랜지션에 이징설정이 ease-in... 이 들어가면 드래그 끝나고
           이동시 느리게 시작하므로 어색
           따라서 징은 ease-out 으로 주는것이 좀 더 자연스럽다      
        8. 마지막 위치 (lx)초기값 설정후 화면크기변경시 이 값이 업데이트 되지 않아서
           드래그 슬라이드가 오작동 되므로 goDrag() 함수내에 window의 resize이벤트 함수를
           등록하여 lx값이 슬라이드크기에 상대적인 위치로 변경된 값을 업데이트 하도록 하여
           오작동을 막아준다!   
    */

    /*****************************************************
            [ 드래그 다중 적용 함수 만들기 ]
            함수명 : goDrag
            기능 : 다중 드래그 기능 적용
    *****************************************************/
    function goDrag(obj) {
        
        // obj 드래그 대상(슬라이드 요소)
        // 변수만들기
        // (1) 드래그상태변수
        let drag = false; // ture-드래그중, false-드래그아님
        // (2) 첫번째 위치포인트 first x, first y
        let fx, fy;
        // (3) 마지막 위치포인트 last x, last y
        let lx = obj.offsetLeft, // -> 슬라이드 처음 left값 세팅
            ly = 0; // 마지막위치는 처음에 0할당
        // (4) 움직일때 위치포인트 move x, move y
        let mvx, mvy;
        // (5) 위치 이동 차이 결과 변수 result x, result y
        let rx, ry;

        // 함수 만들기
        // (1) 드래그상태 true
        const dTrue = () => (drag = true);
        // (2) 드래그상태 false
        const dFalse = () => (drag = false);
        // (3) 드래그 움직일 때 작동 함수
        const dMove = () => {
            // console.log("드래그상태", drag);
            // 드래그 상태일때만 실행
            if (drag) {
                // 트랜지션 없애기
                obj.style.transition = "none";
                // 드래그 상태에서 움직일 때 위치값 : mvx, mvy
                mvx = event.pageX;
                mvy = event.pageY;
                // 움직일때 위치값 - 처음 위치값 : rx, ry
                // x축은 left값, y축값은  top값 이동
                rx = mvx - fx;
                ry = mvy - fy;
                // 3. x,y 움직인 위치값을 타겟요소에 적용
                obj.style.left = rx + lx + "px";
                // obj.style.top = ry + ly + "px"; -> y축 이동 적용 X
                // 한번 드래그 후 다시 드래그 시 움직인 위치값이 필요
                // -> 마지막 위치값 저장 필요 -> lx, ly
                // -> 항상 최종위치에서 움직인 위치를 더한다

                // console.log(`fx:${fx}/fy:${fy}`);
                // console.log(`mvx:${mvx}/mvy:${mvy}`);
                // console.log(`rx:${rx}/ry:${ry}`);
                // console.log(`lx:${lx}/ly:${ly}`);
            } // if : 드래그일때
        };
        // (4) 첫번째 위치포인트 세팅함수
        const firstPoint = () => {
            fx = event.pageX;
            fy = event.pageY;
        };

        // (5) 첫번째 위치포인트 세팅함수
        const lastPoint = () => {
            lx += rx;
            ly += ry;
        };
        // 최종 이동결과 값인 rx, ry를 항상 대입연산하여 값을 업데이트

        // 이벤트 등록
        // (1) 마우스 내려갈 때 : 드래그 true+첫번째 위치값
        obj.addEventListener("mousedown", () => {
            dTrue();
            firstPoint();
        });
        // (2) 마우스 올라올 때
        obj.addEventListener("mouseup", () => {
            dFalse();
            // lastPoint();
            // -> 슬라이드 드래그는 마지막 위치 업데이트 불필요
            // 슬라이드 마지막위치는 항상 일정하므로
            goWhere(obj);
        });
        // (3) 마우스 움직일 때
        obj.addEventListener("mousemove", dMove);
        // (4) 마우스 벗어날 때
        obj.addEventListener("mouseleave", dFalse);


        // 화면크기를 변경할 경우 발생하는 이벤트 -> resize
        // 이 이벤트를 이용하여 필요한 경우 코드 실행
        // 대상 : window
        window.addEventListener("resize",()=>{
            // 화면 크기 변경시 lx값 업데이트
            lx = -obj.parentElement.clientWidth*2.2;
            // 마지막 위치값이 슬라이드 부모박스의 220% 이므로 이것을 업데이트 해줌
            console.log("업데이트lx", lx);
            // obj.offsetLeft
        })/// resize
    } //  goDrag함수 //////////

    /*****************************************************
            함수명 : goWhere
            기능 : 드래그 시 왼쪽/오른쪽 이동 판별
            호출 : 드래그 시 mouseup 이벤트 함수에서 호출
    *****************************************************/    
   function goWhere(obj) { // obj 드래그대상(슬라이드요소)
        // 1. 현재 드래그 대상 left위치값
        let tgLeft = obj.offsetLeft;

        // 2. 부모박스를 기준한 -220% left 위치값 구하기
        let tgPoint = obj.parentElement.clientWidth*2.2;
        console.log("현재left",tgLeft);
        console.log("기준left",-tgPoint);

        // 3. 방향 판별 : 기준값에 특정값을 더하고 뺌
        // 3-1 왼쪽방향이동(오른쪽 버튼 클릭과 동일)
        if(tgLeft < -tgPoint-50) {
            console.log("왼으로 이동");
            // 이동함수 호출(전달값1)
            goSlide(1);
        }
        // 3-2 오른쪽방향이동(왼쪽 버튼 클릭과 동일)
        else if(tgLeft > -tgPoint+50) {
            console.log("오른으로 이동");
            // 이동함수 호출(전달값0)
            goSlide(0);
        }
        // 3-3 제자리로 돌아옴
        else { 
            console.log("제자리");
            obj.style.left = -tgPoint+"px";
            obj.style.transition = "left .2s ease-in-out";
        }      

   } // goWhere 함수 ///////


}
/////////////////////////////////////////////
