// 모듈 연습 메인 JS - main.js
// 로딩구역없이 => script태그에 defer 속성을 사용하거나 
// type="module" 사용할 경우 로딩구역 없어도 요소 등 가져올 수 있음

// 모듈화 JS파일 import 하기
// import { mTitle, sTitle } from "./textData.js";

// 별칭사용하기
//import { mTitle as mTit, sTitle as sTit } from "./textData.js";
import { mTitle as mTit, sTitle as sTit, personInfo as pInfo, mvData as mv } from "./textData.js";

// 메세지내용 구성함수 import
import{ message as msg } from "./msgFormat.js";

/***************************************************************
    [ import 형식 ]
    import 전달변수 from 파일경로;
    -> 반드시 가져올 모듈 JS에서 export 해줘야함
    -> from뒤에 경로는 반드시 상대경로로 사용!
       같은 위치일지라도 ./ 표시를 꼭 해야함(없으면 안나옴)
       (./ ../ 표시 필수)
    -> 모듈 구성은 반드시 서버형식으로 열어야 작동
       (http://...)Live Server 로 열기때문에 보는 것 가능
    -> 로컬파일로 열면 작동안됨   

    [ import 시 변수명 변경하기 : 별칭 사용하기 ]
    import { 전달변수 as 별칭 } from 파일경로;
    -> 별칭 사용 이유 : 단순변경요구, 같은 이름 변수 피하기


 ______________________________________________________________
    [ 모듈화를 위한 구성 ]
    1. 데이터 처리하기 위한 JS
    -> textData.js
    2. 구체적인 데이터 구성 처리를 위한 JS
    -> msgFormat.js
***************************************************************/

// 1. 출력박스
// (1) 타이틀 출력 박스
const tpart = document.querySelector(".tpart");

// (2) 내용 출력 박스
const demo = document.querySelector("#demo");

// (3) 영화 정보 출력 박스
const mvpart = document.querySelector(".mvpart");
console.log(mvpart);

// 2. 제목 넣기
tpart.innerHTML = `
    <h2>${mTit}</h2>
    <h3>${sTit}</h3>`

// 3. 내용 넣기

demo.innerHTML = msg("공유","43")
demo.innerHTML += msg("톰행크스","60")
demo.innerHTML += msg("졸리","48")

pInfo.forEach((val)=>{
    // val[0] 이름, val[1] 나이
    // console.log(val[0])
    demo.innerHTML += msg(val[0], val[1])
});

// 4. 영화 정보 뿌리기 
// ol>li 형식으로 .mvpart 박스에 영화정보로 클래스를 생성하여
// JS 클래스를 생성하여 화면에 뿌리기

