// CGV PJ 인트로 페이지 JS - intro.js

//로딩
window.addEventListener("DOMContentLoaded", loadFn);

// 로딩실행함수
function loadFn() {
    // console.log("로딩완");

    /* 
        기능 : 동영상이 끝나면 자동으로 main.html 로 이동
        방법
        1. setTimeout 를 이용해서 동영상 길이만큼 시간 설정해서 자동으로 넘어가게 하기
           동영상 시간을 체크하여 일정 시간 후 메인페이지로 넘길 수 있음
        setTimeout(()=>{
            location.href = "main.html";
        }, 동영상시간)
        -> 단점 : 동영상 길이가 바뀔때마다 수정해줘야함 
        2. 동영상 시간 이벤트 사용하여 넘기기
           timeupdate 사용
           1) 대상.addEventListener("timeupdate", 함수)
           2) 대상.ontimeupdate = 함수
    */

    // 동영상 재생 중 발생하는 이벤트
    // timeupdate -> 동영상 재생 시간이 계속 업데이트 시 발생
    
    // 대상 : #myvid
    const myvid = document.querySelector("#myvid");

    myvid.addEventListener("timeupdate", chkVid);

    function chkVid() {
        // console.log("멈춤", myvid.paused);
        // 비디오가 멈추면 재생끝이므로 비디오멈춤상태 체크
        // paused 속성은 멈추면 true, 재생중이면 false
        // 주의 : 비디오가 loop면 안됨(계속 플레이되므로)
        // 멈춤이 true 면 메인페이지로 이동
        if(myvid.paused) {
            location.href = "main.html";
        }
        
    }/// chkvid함수

}// 로딩실행함수