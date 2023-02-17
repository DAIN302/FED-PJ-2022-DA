// 3D 태양계 JS -  solar3d.js

const qs = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);

window.addEventListener("DOMContentLoaded", () => {
    /* 
        [ 구현내용 ]
          - 축소/확대 버튼 클릭 시 표기된 배율만큼 태양계 전체를 축소/확대 적용
          - 이때 클릭된 메뉴는 오버시 변경색 유지
    */

    // 1. 대상선정
    // 이벤트 대상 : 축소확대메뉴 a요소들 .tit a
    const menu = qsa(".tit a");
    // 변경대상 : 태양계를 싸고 있는 부모요소 .scbx
    const scbx = qs(".scbx");

    // console.log(menu, scbx)

    // 2. 이벤트함수 세팅
    for(let x of menu) {
        x.onclick = () => {
            // 1. 버튼텍스트 읽어오기
            let btxt = x.innerText;
            
            // 2. 문자데이터 가공
            // 가공내용 : "X 배율" -> "X " 부분 없애기
            // 문자 대체 내장함수 -> replace(바꿀문자, 바뀔문자)
            btxt = btxt.replace("X ", "");
            console.log(btxt);

            // 3. 배율적용
            // 변경대상 : scbx변수
            scbx.style.transform = `scale(${btxt})`;

            // 4. 클릭한 a요소 class "on"넣기
            // 4-1. 모두 초기화
            menu.forEach((ele)=>{ele.classList.remove("on")});
            // 4-2. 해당메뉴 클래스넣기
            x.classList.add("on"); 
        }
    }
            
   



})// 로드구역