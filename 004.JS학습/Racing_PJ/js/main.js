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
                r1.style.left = (++r1pos) + "px"; 
            } // if문 토끼출발
            else if(btxt==="거북출발") {
                // 위치이동값 세팅
                t1pos += 16;
                // 위치이동
                t1.style.left = t1pos + "px"; 
            }

            
        }
    }); ////// forEach메서드


}); /////////// 로드구역 ///////////////////////////
