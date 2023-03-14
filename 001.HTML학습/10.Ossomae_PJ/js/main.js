// 옷소매 갤러리 JS - main.js

///////////////// 로딩구역 ///////////////////////
window.addEventListener("DOMContentLoaded",()=>{

    console.log("로딩완료!");

    // 대상 : .gbx
    const gbx = document.querySelector(".gbx");


    // 오른쪽 버튼 클릭
    document.querySelector(".rb").onclick = () =>{
        // 이동대상 : .gbx>div
        let tg = gbx.querySelectorAll("div");

        // 첫번째 자식 요소 div 맨 뒤로 이동
        // appendChild(첫번째요소)
        gbx.appendChild(tg[0]);
        
    } // 오른쪽 버튼 클릭

    // 왼쪽 버튼 클릭
    document.querySelector(".lb").onclick = () =>{
        // 이동대상 : .gbx>div
        let tg = gbx.querySelectorAll("div");

        // 마지막 자식 요소 div 맨앞 이동
        // insertBefore(마지막요소, 첫번째요소)
        gbx.insertBefore(tg[tg.length-1], tg[0]);
        
    } // 왼쪽 버튼 클릭

}); ///////////// 로딩구역 //////////////////////
/////////////////////////////////////////////////