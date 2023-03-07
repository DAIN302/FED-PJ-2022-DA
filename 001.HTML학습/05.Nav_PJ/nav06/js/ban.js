// 네비유형 6 : 배너세팅 JS - ban.js

window.addEventListener("DOMContentLoaded", setBan);

// 배너세팅함수
function setBan() {
    // 1.호출확인
    // console.log("배너얌");

    // 2. 대상선정 : .bancont
    const bancont = document.querySelector(".bancont");

    // 3. 태그 구성
    // 태그 변수
    let hcode = `<ul class="slide">`;
    for(let i = 1; i < 15; i++) {
        hcode += `
        <li>
            <img src="./nav06/img_nav06/ban/ban${i}.png" alt="배너이미지">
        </li>
        `;
    }
    hcode += `</ul>`;

    console.log(hcode);
    
    bancont.innerHTML = hcode;    
}