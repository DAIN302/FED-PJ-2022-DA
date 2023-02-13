// CGV PJ 메인 페이지 JS - main.js

const qs = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);

// 로드 구역
window.addEventListener("DOMContentLoaded", () => {
    console.log("로딩완");

    /***************************************************************** 
        [ 포스터 메뉴 클릭 시 클래스 주기 ]
         - 포스터 메뉴 클릭 시 해당 li에 클래스 "on"을 주고 나머지 li는 
           "on"을 지워서 선택된 li만 일어서 있는 css가 적용되게 한다
    *****************************************************************/

    // 1. 대상 : .mlist 하위 li (이벤트 대상 = 변경 대상)
    let mlist = qsa(".mlist ul>li")
    // console.log(mlist);

    // 2. 클릭 이벤트 함수 설정 for of 사용 -> 배열/컬렉션에 사용
    for(let x of mlist) { // x는 각 요소
          x.onclick = () => {
            // 1. li에 클래스 초기화
            mlist.forEach(ele=>ele.classList.remove("on"));
            // forEach((요소, 순번, 객체)=>{코드})

            // 2. 클릭된 li에 클래스 "on" 넣기 -> ClassList 사용
            // add() 메서드 사용
            x.classList.add("on");
          } // 클릭이벤트함수
        } // for of문

    /**********************************************************************
        [ 극장가는 길 구글맵 보기 ]
          - 극장가는 길 박스 클릭 시 구글맵 등장  
          - 구글맵박스의 닫기버튼 클릭 시 구글맵 퇴장
          -> 방법 : .gmap에 "on" 클래스 추가/제거
    **********************************************************************/     


}); //// 로드 구역