// 큐브 애니 JS


/************************************************************* 
    [구현내용 ]
     - "빙글빙글" 버튼을 클릭하면 멈춰있던 큐브가 돌아감, 이 때 버튼은 "멈춰" 버튼으로 변경 
     - "멈춰" 버튼을 클릭하면 돌고있는 큐브가 멈춤, 이 때 버튼은 "빙글빙글" 버튼으로 변경
   
*************************************************************/

// 로드 구역
window.addEventListener("DOMContentLoaded",()=> {
    // console.log("안뇽!");
    // 1. 대상 선정
    // 1-1. 이벤트 대상 .btngo
    const btngo = document.querySelector(".btngo");
    // 1-2. 변경 대상 .cube
    const cube = document.querySelector(".cube");
    // console.log(btngo, cube);

    // 2. 버튼 클릭 이벤트 설정
    btngo.onclick = () => {
        // 큐브에 클래스 .on 넣기
        cube.classList.toggle("on");
        // 현재 큐브에 on 클래스 있는지 검사
        let isOn = cube.classList.contains("on");
        // console.log("on 있니?", isOn);

        // 버튼 텍스트 변경
        btngo.innerText = isOn?"멈춰!":"빙글빙글";
        btngo.style.backgroundImage = isOn?"linear-gradient(to top, lightskyblue, white)":"linear-gradient(to bottom, lightskyblue, white)";
        // 삼항연산자(조건연산자) 비?집:놀이동산;
        // if문 대신 짧게 쓸 수 있다!

        // if(isOn) {
        //     btngo.innerText = "멈춰!";
        //     btngo.style.backgroundImage = "linear-gradient(to top, lightskyblue, white)";
        // }
        // else {
        //     btngo.innerText = "빙글빙글";
        //     btngo.style.backgroundImage = "linear-gradient(to bottom, lightskyblue, white)";
        // }

        



    } ////////// 클릭 이벤트 함수

    /********************************************** 
        [ JS 클래스 컨트롤 내장객체 ]
        classList 객체

        -> 요소에 클래스를 넣거나 빼는 등 필요작업을
        하는 객체

        ((관련메서드))
        1. add(클래스명) : 클래스추가
        2. remove(클래스명) : 클래스제거
        3. toggle(클래스명) : 클래스추가/제거
        4. contains(클래스명) : 클래스있으면 true
        5. replace(이전클래스명,변경클래스명)
            : 특정클래스를 다른 클래스로 변경

        -> 클래스 추가/제거시 콤마로 구분하여
        여러개의 클래스를 추가하거나 제거할 수 있다!
        예) 요소.classList.add("tt","cc","dd")
        예) 요소.classList.remove("bb","ee")


    **********************************************/



}) // 로드 구역 끝!!!!!!!!!!!