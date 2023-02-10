// 큐브트립 메인 JS ///////////////////////

/*
    [ 구현 요구사항 ]    
      - 도시별 메뉴 클릭 시 해당 도시의 데이터를 큐브 회전 후 도시와 매칭하여
        정보를 화면에 출력
*/

// 로드구역

window.addEventListener("DOMContentLoaded", loadFn)
    
function loadFn() {
    // console.log("안뇽!");

    // 1. 대상선정
    // 1-1. 이벤트 대상 : .city a 
    // 클릭 시 해당되는 도시의 데이터 큐브 회전 후 도시와 매칭해서 정보 화면 출력
    const menu = document.querySelectorAll(".city a");
    // 1-2. 변경 대상1 : .cube
    // 해당되는 이미지로 큐브 회전
    const cube = document.querySelector(".cube");
    // 1-3. 변경 대상2 : .cname
    // 도시와 매칭되는 정보 화면 출력
    const cname = document.querySelector(".cname");
    // 1-4. 변경 대상3 : .cinfo
    // 도시와 매칭되는 정보 화면 출력
    const cinfo = document.querySelector(".cinfo");
    // 1-5. 변경 대상4 : .cbx
    // 도시와 매칭되는 정보 화면 출력
    const cbx = document.querySelector(".cbx");


    // 2. 메뉴에 클릭 이벤트 설정
    // for of 문
    for(let x of menu) { // x는 는 각각의 a 요소
        // 1. 클릭 이벤트 설정
        x.onclick =()=>{
            // 0. 도시정보박스 숨기기
            // 다른 정보로 넘어갈 때나 출발면에서 컨텐츠 보이기 방지
            cbx.style.opacity = "0";
            cbx.style.transition = "none";

            // 도시 정보 스크롤 생길 경우
            // 내려놓고 다른 도시가면 스크롤 위치가 내려가 있기 때문에
            // 스크롤 위치 맨위로 세팅하기
            cinfo.scrollTo(0,0);
            
            // 1. 메뉴 텍스트 읽기
            let mtxt = x.innerText;
            // console.log(mtxt);

            // 2. 버튼별 회전각도값 분기세팅
            // 회전값 세팅 변수
            let setval;

            switch(mtxt) {
                case "출발":setval= "rotateX(0deg) rotateY(0deg)";break;
                case "서울":setval= "rotateX(-90deg) rotateY(-360deg)";break;
                case "런던":setval= "rotateX(360deg) rotateY(-90deg)";break;
                case "베를린":setval= "rotateX(-360deg) rotateY(90deg)";break;
                case "파리":setval= "rotateX(720deg) rotateY(-180deg)";break;
                case "뉴욕":setval= "rotateX(450deg) rotateY(360deg)";break;
                default: setval ="rotateX(0deg) rotateY(0deg)";
            } ////// switch case 끝

            // 3. 회전값 적용(transform에 setval 변수값 할당)
            cube.style.transform = setval;
            cube.style.transition = "transform 1.5s ease-in-out";

            // 만약 "출발"을 클릭한 경우 아래코드 실행안하기
            if(mtxt==="출발") return;
            // return 키워드는 함수를 빠져나간다.
            // 뒤에 값이 있을 경우 전달값을 가지고 불러온 곳으로 돌아감
            // 뒤에 값이 없을 경우 그냥 빠져나간다.

            // 4. 도시 정보 세팅
            // data.js에 세팅된 객체의 속성값이 메뉴의 도시명과 같다
            // 따라서 이 속성명으로 속성값을 가져와서 도시 정보를 아래 요소에 세팅
            // 변경 대상1  : .cname - 도시명 -> mtxt변수에 있음
            // 변경 대상2  : .cinfo - 도시정보 -> ciry[mtxt]에 있음
            // innerText로 할당

            console.log(mtxt, city[mtxt]);

            // 도시명 넣기
            cname.innerText = mtxt;

            // 도시정보 넣기
            cinfo.innerText = city[mtxt];

            // 도시정보박스 보이게 하기
            // 내용 : 큐브 1.5초간 회전 후 도시정보박스 보이기
            // 1.5초 후 코드 실행
            setTimeout(()=>{
                cbx.style.opacity = 1;
                cbx.style.transition = "opacity .5s ease-in-out";
            }, 1500);


        }; /////// 클릭 이벤트 함수
    } ////// for of문 끝


}// 로드구역 끝