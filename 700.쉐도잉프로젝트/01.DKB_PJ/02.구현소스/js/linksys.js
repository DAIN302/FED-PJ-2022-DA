// 도깨비 PJ 링크 시스템 JS - linksys.js

// 로딩 구역
window.addEventListener("DOMContentLoaded", ()=>{
    // console.log("링크 로딩완료");

    // 링크 시스템 : 메뉴의 a요소 링크를 셋업

    // 대상 : .top a -> 상단영역의 모든 a요소
    const link = document.querySelectorAll(".top a");
    // console.log("a요소", link);

    // 클릭 이벤트 함수 세팅
    for(let x of link) { // x는 각 a요소
        x.onclick = () => {
            // 1. a요소의 글자데이터
            let atxt = x.innerText;

            // 만약 이미지만 있으면 img요소의 alt 읽어서
            // atxt 변수에 재할당하기
            // if(true) {
            // if(null) { ->>> 데이터가 null 인 경우 if문에서 false 취급
            // if(undefinde) { ->>> 데이터가 undefined 인 경우 if문에서 false 취급
            // 만약 요소가 없으면 null 이 리턴됨
            // undefined 는 변수의 값이나 함수가 생성되지 않은 경우 리턴되는 기본 할당값
            let chk = x.querySelector("img");
            // 클릭된 a요소 하위의 img 요소를 가져옴

            if(chk) { // 이미지 요소가 있으면 if문 안으로 들어간다는 얘기 없으면 null이므로 false취급이라 if문 안으로 들어가지 않음
                // atxt 변수에 img의 alt 속성값 넣기
                atxt = chk.alt;
                console.log("재할당", atxt);      
            } // if문
            console.log(atxt, chk);

            // 주소 할당 변수
            let url;

            // 2. 링크 분기하기 switch 사용
            switch(atxt) {
                case"인물관계도":url = "cat"; break;
                case"로그인":url = "login"; break;
                case"회원가입":url = "member"; break;
                case"tvn로고":url = "index"; break;
                case"페이스북 바로가기":url = "http://www.facebook.com/tvn.dokebi"; break;
                case"트위터 바로가기":url = "https://twitter.com/chtvn"; break;
                case"인스타그램 바로가기":url = "https://www.instagram.com/tvn_joy/"; break;
                default:url = "esc";
            } //// switch case 문

            // 3. 내용에 따른 처리
            if(url==="esc"){
                alert(`공사중`);
            } // if
            // sns일 경우 처리분기문
            else if(atxt==="페이스북 바로가기" || atxt==="트위터 바로가기" || atxt==="인스타그램 바로가기") {
                window.open().location.href = url;
                // 새창열기 window.open()
            }
            // 기타 내부시스템 페이지 이동
            else {
                // 메인페이지 이동일 경우
                // html?code=m 을 보내주자

                location.href = url+".html"+(atxt==="tvn로고"?"?code=m":"");
            } //else 
            // [ 페이지 이동 ]
            // 현재창 열기 window.location.href = 이동할주소 (window 생략 가능)
            // 새창 열기 window.open().location.href = 이동할주소
            // -> window.open() 은 원래 팝업창 띄우기


            // a요소의 기본 이동 기능을 막음
            return false;
            // 이 함수를 호출한 곳으로 돌아갈 때 false를 가지고 돌아가라
            // false -> 신호 없음
            // -> 브라우저는 기본 기능을 없애줌

            // (확인) 각 a요소의 href="#"으로 인한 상단이동이 안됨
            // tvN 로고 이동기능이 안됨


        }; ////// 클릭이벤트 함수

    } // for of 문




});//////// 로드구역