// 2023캘린더

// 모듈 불러오기 : import
import MakeDallyeok from "./calendar.js";
// 현재 같은 위치일지라도 ./를 반드시 써야 불러옴

// 생성자 함수를 인스턴스로 호출
// 인스턴스 생성이란 특정메모리 구역에 모듈을 로딩시켜서 개별화 기능이 적용되게 하는 것

// 우리가 만든 달력 생성자 함수에서 전달값을 받는 것은?
// 달력을 넣을 요소의 선택자 정보
// 달력 넣을 요소 : .calbx
let calbx = new MakeDallyeok(".calbx");
// 초기화 함수 호출
calbx.initDallyeok();
// 다음달 달력 호출
// calbx.nextCal();

// 다른 요소에 달력 추가 생성
let calbx2 = new MakeDallyeok(".calbx2");
// 초기화 함수 호출
calbx2.initDallyeok();

// 제이쿼리 라이브러리를 html페이지 상단에 호출 후 사용
$(".myipt").click(function(){
    // 해당박스 달력 보이기
    $(this).next().find(".calender").show();
})


// on(이벤트명, 함수) -> 이벤트명을 띄어쓰기로 여러개 세팅 가능
// -> addEventListener에서는 원래 하나씩 세팅해야하는데 제이쿼리가 해줌
$(".calender").on("click mouseenter", function(){
    console.log("이벤트");
    // 하위 날짜 박스인 .date를 클릭이벤트 걸어줌
    $(this).find(".date").click(()=>{
        // 일반 익명함수일때 this -> .date
        // 이벤트를 싸고 있는 이벤트 대상을 this로 만들고 싶을 때
        // -> 화살표 함수 사용 -> 
        // this -> 싸고있는 .calendar
        let val = $(this).find(".dinfo").val();
        // val() 메서드 - input의 value값을 읽어옴
        $(this).parent().prev().val(val);
        // val(값) -> input에 내용넣기
        $(this).parent().hide();
        // 두번째 캘린더에서 날짜를 선택하면 
        // 첫번째와 두번째 선택날짜 차이를 계산하여 .res에 표시
        // 두번째 캘린더인지 구분하기 : 캘린더 부모박스가 .calbx2인지 
        // $(선택자).is(요소) -> 클래스등 요소인지 여부 판별
        // console.log("두번째임?",($(this).parent().is(".calbx2")));
        // 조건 : 첫번째 입력창이 비어있는가? (비어있지 않아야함)
        // console.log("첫번째 비어있음?", $("#myinput").val()==="");

        // 두번째 캘린더이고 첫번째 입력창이 비어있지 않으면 실행
        if($(this).parent().is(".calbx2") && $("#myinput").val()!=="") {
            // 날짜 차이 계산하기 함수 호출
            // 대상 : #myinput, #myinput2
            let val1 = $("#myinput").val()
            let val2 = $("#myinput2").val()
            // 함수는 생성자 함수 안에 있음
            // new 키워드로 인스턴스를 생성한 변수하위로 접근가능
            let res = calbx2.getDateDiff(val1, val2);
            
            // 원하는 곳에 출력
            $(".res").text(res);
        } // if 
        


    })/// click
})//// click

