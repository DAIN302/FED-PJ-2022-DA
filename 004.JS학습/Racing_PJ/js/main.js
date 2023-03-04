// Racing PJ 메인 JS - main.js

// 요소선택함수
const qs = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);
// 메세지 함수
const cg = x => console.log(x);

//////////////// 로드구역 /////////////////////////
window.addEventListener("DOMContentLoaded", ()=>{
    // console.log("로딩완료!");

    /*******************************************************************
        [ 게임 기능 정의 ]
        1. 게임룰 : 거북버튼 클릭하여 거북을 왼쪽에서 오른쪽으로 이동시킴
           이때 토끼는 자동으로 이동
           결승선에 먼저 도달하는 레이서가 승리함
        2. 토끼의 이동 속도는 레벨로 설정
        3. 결승선 도착은 둘 중 하나가 먼저 도착할 경우 판별함수에서 정하고
           결과를 화면에 출력
        4. 포커스가 버튼에 갈 경우 마우스가 아닌 키보드 버튼으로 조작할 수 없게함
           (마우스만 사용하도록 함)
        5. 기본적으로 거북 이동버튼 클릭 시 토끼는 자동으로 작동됨
        6. 토끼 이동버튼은 토끼만 미리 작동 가능
        7. 처음으로 버튼은 전체를 리셋         
    *******************************************************************/

    // 1. 대상선정
    // (1) 거북 : #t1
    const t1 = qs("#t1");
    // (2) 토끼 : #r1
    const r1 = qs("#r1");
    // (3) 버튼 : #btns a
    const btns = qsa("#btns a");
    // (4) 레벨 : #level
    const level = qs("#level");
    // (5) 메세지창 : #msg
    const msg = qs("#msg");
    // (6) 토끼, 거북 위치값 변수
    let r1pos = 0, t1pos = 0;
    // 토끼위치  r1pos 거북위치 t1pos

    // 2. 이벤트 설정
    // 대상 : btns
    btns.forEach((ele)=>{
        // 1. 이벤트 설정
        ele.onclick = () => {
            // (0) a태그 기본 기능 막기
             event.preventDefault();
            // (1) 버튼 종류 확인
            let btxt = ele.innerText;
            cg(btxt);

            // (2) 버튼별 기능 분기
            // (2-1) 토끼 이동
            if(btxt==="토끼출발") {
                // 토끼 자동 이동 함수 호출
                goR1();
            } // if문 토끼출발
            // (2-2) 거북 이동
            else if(btxt==="거북출발") {
                // 거북멈춤 상태값이(t1Stop) 1이면 돌아가
                if(t1Stop) return;
                // 위치이동값 세팅
                t1pos += 16;
                // 위치이동
                t1.style.left = t1pos + "px"; 
                // 거북버튼 클릭시 포커스가 들어가므로 엔터키보드 작동으로 클릭이 가능해짐
                // 이것을 방지하기 위해서 매번 포커스를 빼기
                ele.blur();
                // blur() 메서드 - 포커스가 사라짐
                // focus() 메서드 - 포커스가 들어감
                
                // 토끼자동이동함수 호출
                goR1();
            }
            // (2-3) 처음으로 버튼 클릭 시
            else if(btxt==="처음으로") {
                // 브라우저 캐싱을 지우고 다시 부르기
                // location.replace("index.html");
                // 현재페이지 리로딩
                location.reload();
            }
        }
    }); ////// forEach메서드

    /***************************************************************
        함수명 : goR1
        기능 : 토끼 자동 이동(인터벌함수)
    ***************************************************************/
   
   let autoI; // 인터발용함수
   function goR1() {
    // 할당안된 변수값은 undefined 이고 if문에서 false처리되므로
    // 할당전 상태일때만 if문에 들어가게 하기 위해 !(NOT연산자)를 사용
    if(!autoI) { // 할당전에 1번만 허용
        autoI = setInterval(()=>{
            // 토끼 위치 이동
            r1.style.left = (++r1pos) + "px";
            // 토끼 & 거북 위치값체크 후 승자판별 함수 호출
            whoWinner();
        }, level.value); 
        // 인터발 시간은 선택박스의 옵션값을 읽어서 사용
    } /// if
   } /// goR1

    /***************************************************************
        함수명 : whoWinner
        기능 : 기준값 보다 레이서 위치값이 큰 경우 승자를 판별하여 메시지 보여줌
    ***************************************************************/   
   let t1Stop = 0; // 거북멈춤값(1이면 멈춤, 0은 허용)
   function whoWinner() {
    // cg("토끼"+r1pos)
    // cg("거북"+t1pos)

    // 1. 토끼 또는 거북의 위치값이 기준값 이상일 때 
    // 기준값 : 650px
    if(r1pos >= 650 || t1pos >= 650) {
        // (1) 토끼 멈춤 -> 인터벌함수 지우기
        clearInterval(autoI);
        // (2) 거북 멈춤 - 거북멈춤 상태값 1로 변경
        t1Stop = 1;

        // 메세지 랜덤을 위한 랜덤수 만들기
        // 0~2 사이의 랜덤수 
        let rnum = Math.floor(Math.random()*3);
        cg("랜덤수"+rnum);
        // (3) 승자 판별 후 메시지 보여주기
        if(r1pos > t1pos) msg.innerText = msgtxt["토끼"][rnum]
        else if(r1pos < t1pos) msg.innerText = msgtxt["거북"][rnum]
        else msg.innerText = "비겼당!!"

        // (4) 메시지 보이기
        msg.style.display = "block";
        msg.style.zIndex = "101";

        // (5) 전체 반투명 암전주기
        qs(".cover").innerHTML += "<div style='position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:black;opacity:0.5;z-index:100'></div>";
        // 주의사항 : body하위에 새로운 요소를 추가하면 body 직꼐 하위에 있는 요소들에
        // 세팅된 이벤트가 소실됨
        // 이유는 DOM이 재구조화되어서 
        // 처음부터 편성된 박스에 넣어주면 이런 문제 해결됨
        // 여기서도 .cover 요소 안에 새로운 요소를 넣어준 이유(버튼 기능이 소실되서)

        // (6) 버튼위로 올리기
        qs("#btns").style.zIndex = "200";

    } //// if
   } /// whoWinner

   // 메시지 변수
   const msgtxt = {
    "토끼":[
        "역시, 토끼가 이겼군! 아자!",
        "넌 안돼!! 오~ 노노노!!! 토끼승!",
        "토끼는 잠자고 가도 이경~!!!"
    ],
    "거북":[
        "넌 뭐니? 토끼야? 내가 승!",
        "대대로 거북이 이겼단다!!!",
        "이제 넌 어쩌니? 토끼퇴출!!!"
    ]
   }; // 메시지 객체



}); /////////// 로드구역 ///////////////////////////
