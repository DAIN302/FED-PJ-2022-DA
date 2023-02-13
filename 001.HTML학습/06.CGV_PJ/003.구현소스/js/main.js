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
    // 1. 대상선정
    // 1-1. 이벤트 대상 : .anibx -> 애니메이션 버튼 박스
    const anibx = qs(".anibx");
    // 1-2. 이벤트 대상 : .cbtn -> 닫기 버튼
    const cbtn = qs(".cbtn");
    // 1-3. 변경 대상 : .gmap -> 구글맵박스
    const gmap = qs(".gmap");
    
    // console.log(anibx, gmap);
    
    // 2. 클릭이벤트 설정 
    // -> 클릭 시 anibx 및 구글맵박스에 "on" 클래스 추가
    anibx.onclick = () => {
        anibx.classList.add("on");
        gmap.classList.add("on");
    };

    // 3. 닫기 버튼 클릭 시 anibx 및 구글맵박스에 "on" 클래스 제거    
    cbtn.onclick = () => {
        anibx.classList.remove("on");
        gmap.classList.remove("on");
    }


    /*
        [ SNS 버튼 링크 연결 ]
    */
   // 1. 대상선정 : .sns a
   const sns = qsa(".sns a");
   // 2. 클릭이벤트 설정
   // forEach((요소, 순번, 객체)=>{코드})
   sns.forEach((ele) => {
    ele.onclick = () => {
        // 1. 내부텍스트 읽어오기
        let btxt = ele.innerText;
        // console.log(btxt);

        // 이동주소 변수
        let url="";

        // 2. 분기문 url 할당
        switch(btxt) {
            case "페이스북 바로가기": url="https://www.facebook.com/CJCGV";break;
            case "트위터 바로가기": url="https://twitter.com/CGV_ID";break;
            case "인스타그램 바로가기": url="https://www.instagram.com/cgv_korea/";break;
        } // switch case

        // 3. 페이지 이동하기
        // 새창 -> window.open()
        // 페이지 이동 -> location.href = url값
        window.open().location.href = url;

    };
   });//////////// forEach /////////////
    

}); //// 로드 구역