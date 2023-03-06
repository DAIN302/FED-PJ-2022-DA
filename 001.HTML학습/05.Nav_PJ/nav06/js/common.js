// 네비게이션 유형6 : 공통 JS - common.js

// 로드구역
window.addEventListener("DOMContentLoaded", loadFn);

function loadFn() {
    // console.log("ㅎㅇ");
    /********************************************************
        GNB메뉴 객체 데이터를 이용한 html 태그 만들어 넣기
    ********************************************************/
   // 대상 : .gnb
   const gnb = document.querySelector(".gnb");

   // 2. 변수세팅 html 코드 변수
   let hcode = "";
   // hcode 변수에 ""를 할당하여 변수를 문자형(string)으로 만들어준다

   // 3. 코드의 구조화
   hcode += `<ul>`;
   // 1. 상위메뉴 반복코드 생성
   // mdata 객체를 가져와서 반복시킴 -> for in문
   for (let tm in mdata) {
    // tm은 mdata의 속성명

    hcode += `
        <li>
            <a href="#">${tm}</a>
            <div class="smenu">
                <!-- 하위메뉴 구조랩핑박스 .smbx -->
                <aside class="smbx">
                    <h2>
                        <div class="stit">${tm}</div>
                        <a href="#">전체보기 ＞</a>
                    </h2>
                    <div class="swrap">
           `;

    // 2. 하위메뉴 반복코드
    // -> 객체데이터 이므로 for in문 사용!
    // -> mdata[tm] -> mdata[속성명] -> 속성값!
    // -> 속성값은 서브메뉴이고 객체로 구성됨!
    for (let sm in mdata[tm]) {
        // sm - 속성명(하위메뉴)
        hcode += `<dl>
                    <dt>
                        <a href="#">${sm}</a>
                    </dt>`;

        // 3. 서브메뉴(최하위메뉴) 반복코드
        // -> 서브메뉴는 배열이므로 for of사용!
        for (let sub of mdata[tm][sm]) {
            hcode += `<dd>
                        <a href="#">${sub}</a>
                    </dd>`;
        } ////////// for of ///////////

        hcode += `</dl>`;
    } //////////// for in문 /////////

    hcode += `
                    </div>
                </aside>
            </div>
        </li>
    `;
} ///////// for in문 //////////////////////

hcode += "</ul>";

   // gnb 박스에 출력
   gnb.innerHTML = hcode;


/********************************************************
    GNB메뉴 오버시 서브메뉴 보이기
    __________________________________________________
    [ 기능 정의 ]
    상위메뉴 li에 오버시 하위메뉴 .smenu박스의 내부 데이터만큼
    height값이 생기며 opacity투명도가 1로 변경되는 트랜지션 수행
    아웃시 원상복귀
********************************************************/

// 1. 대상선정
// 이벤트 대상 : .gnb>ul>li
const list = document.querySelectorAll(".gnb>ul>li");
// 이벤트 종류 : mouseenter / mouseleave
// 변경대상1 : .smenu
// 변경대상2 : .bgbx
const bgbx = document.querySelector(".bgbx");
// 변경내용 : height값, opacity값

// 2 하위메뉴 + 메뉴배경 style변경함수 만들기
// ele - 변경요소, hv - 높이값, opa - 투명도값
const stFn = (ele,hv,opa) => {
    ele.style.height = hv+"px";
    ele.style.opacity = opa;
};

// 3. 상위메뉴 li에 이벤트 설정
for(let x of list) {
    // 마우스 오버시 //////////
    x.onmouseenter = () => {
        // (1) 하위메뉴박스 .smenu 선택
        const tg = x.querySelector(".smenu");

        // (2) 하위메뉴박스 내부박스 높이값 구하기
        let hv = tg.querySelector(".smbx").clientHeight;
        // console.log(hv);

        // (3) 하위메뉴 + 메뉴배경 스타일 변경
        stFn(tg,hv,1);
        
    } // mouseenter
    x.onmouseleave = () => {
        // (1) 하위메뉴박스 .smenu 선택
        const tg = x.querySelector(".smenu");
        // (2) 하위메뉴 스타일 변경
        stFn(tg,"0",0);
    } // mouseenter
    
}


} // 로드구역