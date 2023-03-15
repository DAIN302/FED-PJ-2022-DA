// 옷소매 갤러리 JS - main.js

///////////////// 로딩구역 ///////////////////////
window.addEventListener("DOMContentLoaded",()=>{

    console.log("로딩완료!");

    // 광클금지 변수 : 0은 허용, 1은 불허용
    let prot = 0;

    // 대상 : .gbx
    const gbx = document.querySelector(".gbx");

    /**************************************************
        함수명 : goSlide
        기능 : 이동방향에 따른 요소 이동
    **************************************************/

    const goSlide = (dir) => { // dir 버튼 구분 (1-오른쪽 0-왼쪽)
        console.log(dir);

        // 광클금지 설정 - 광클하면 슬라이드 액션이 망가짐
        if(prot) return;
        prot = 1; // 잠금
        setTimeout(()=>{
            prot=0;// 해제
        },400)

        // 대상선정
        // 이동대상 : .gbx>div
        let tg = gbx.querySelectorAll("div");

        // 분기
        // 오른쪽 버튼 클릭 시
        if(dir) {
            // 첫번째 자식 요소 div 맨 뒤로 이동
            // appendChild(첫번째요소)
            gbx.appendChild(tg[0]);
        } // if
        // 왼쪽 버튼 클릭 시
        else {
            // 마지막 자식 요소 div 맨앞 이동
            // insertBefore(마지막요소, 첫번째요소)
            gbx.insertBefore(tg[tg.length-1], tg[0]);

        }// else

    } /// goSlide 함수


    // 오른쪽 버튼 클릭
    document.querySelector(".rb").onclick = () =>{
        goSlide(1) 
        clearAuto()
    } // 오른쪽 버튼 클릭

    // 왼쪽 버튼 클릭
    document.querySelector(".lb").onclick = () =>{
        goSlide(0) 
        clearAuto()
    } // 왼쪽 버튼 클릭

    // 인터발함수 지우기위한 변수
    let autoI;
    // 타임아웃함수 지우기위한 변수
    let autoT;

    /************************************ 
        함수명: autoSlide
        기능: 인터발함수로 슬라이드함수 호출
    ************************************/
   function autoSlide(){
        console.log("인터발시작!");
        // 인터발함수로 슬라이드함수 호출하기
        autoI = setInterval(()=>goSlide(1),3000);
   } ////////////// autoSlide함수 //////////

   // 자동넘김 최초호출!
   autoSlide();

   /************************************ 
        함수명: clearAuto
        기능: 인터발함수를 지우고 다시셋팅
   ************************************/
   function clearAuto(){
    console.log("인터발멈춤!");
    // 1. 인터발 지우기
    clearInterval(autoI);

    // 2. 타임아웃도 지우지 않으면
    // 쌓여서 타임아웃 쓰나미실행이 발생한다!
    clearTimeout(autoT);

    // 3. 잠시후 다시 작동하도록 타임아웃으로
    // 인터발함수를 호출한다! 
    // 5초후(인터발은 3초후, 토탈 8초후 작동시작)
    autoT = setTimeout(autoSlide,5000);

   } ///////// clearAuto 함수 /////////////
}); ///////////// 로딩구역 //////////////////////
/////////////////////////////////////////////////