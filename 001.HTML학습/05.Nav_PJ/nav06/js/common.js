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
   for(let tm in mdata) { //tm은 mdata의 속성명
       hcode +=
            `
            <li>
                <a href="#">${tm}</a>
                <div class="smenu">
                    <h2>
                        <div class="stit">${tm}</div>
                        <a href="#">전체보기></a>
                    </h2>
                    <div class="swrap">
                        `
                        // 2. 하위메뉴 반복코드 생성
                        // -> 객체 데이터이므로 for in 사용
                        // -> mdata[tm] -> mdata[속성명] -> 속성값
                        // -> 속성값을 서브메뉴이고 객체로 구성됨
                        for(let sm in mdata[tm]) { // sm은 속성명(하위메뉴)
                            hcode += `
                            <dl>
                                <dt>
                                    <a href="#">${sm}</a>
                                </dt>`
                            // 3. 서브메뉴(최하위메뉴) 반복코드 생성
                            // -> 서브메뉴는 배열데이터이므로 for of 사용
                            for(let sub of mdata[tm][sm]) {
                                hcode += `
                                <dd>
                                    <a href="#">${sub}</a>
                                </dd>`;
                            }   
                             
                            hcode +=`</dl>`;
                        }
                        `
                    </div>
                </div>
            </li>`;
   }  /// for in문

   hcode += `</ul>`;

   // gnb 박스에 출력
   gnb.innerHTML = hcode;

} // 로드구역