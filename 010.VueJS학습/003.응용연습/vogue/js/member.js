// 보그PJ 회원가입 페이지 JS - member.js

// 제이쿼리 코드블록 /////////////
$(()=>{
    // 약관동의 html 코드 넣기
    $("#conf").html(mcode.conf);

    /*********************************************
        약관동의 전체 체크시 모든 체크박스 변경
     *********************************************/     
    // 1. 대상선정
    // 대상 : 모두 동의 체크박스 -> #chk_all
    const chkall = $("#chk_all");
    // 대상 : 개별 체크 박스 -> .chk
    const chkeach = $(".chk");

    // 2. 체크박스 변경이벤트 함수만들기
    chkall.change(function(){
        //1. 체크박스 체크 여부 확인
        let chk = $(this).prop("checked");
        // console.log("체크임", chk)

        // 2. 전체 체크박스가 체크 상태(true)이면 개별 체크 박스도 모두 true 로 체크상태 변경
        // 미체크상태(false)면 개별 체크 박스도 모두 false로 체크 상태 변경
        // chkeach.attr("checked", chk); -> 세팅할떄는 사용가능 
        chkeach.prop("checked", chk); 
        // for문 없이 자동으로 개수만큼 속성 모두 변경


        /*
            [ 속성값을 읽어오는 2가지 메서드 ]
            1. attribute 단어의 메서드 : attr(속성명)
            2. property 단어의 메서드 : prop(속성명)
            -> 둘의 차이는 일반 속성값을 읽어올때는 차이 X
            체크박스의 checked 속성인 경우 true/false를 리턴해주는 것은 prop() 메서드

            [ 속성값을 세팅하는 2가지 메서드 ]
            1. attr(속성명, 값)
            2. prop(속성명, 값)
        */

    }); //// change

    /*********************************************
        개별체크박스 체크시 전체 체크박스 변경
    *********************************************/   
   // 원리 : 개별체크박스가 모두 체크되면 전체 체크
   // 대상 : .chk -> chkeach 변수
   chkeach.change(function(){
        // 1. 체크갯수 알아오기 : length - 개수리턴속성
        let num = $(".chk:checked").length;
        // console.log("개별체크", num)

        // 2. 체크개수가 3개일때 전체 체크박스 체크
        if(num===3) chkall.prop("checked", true);
        else chkall.prop("checked", false);
        
   }); ////// change
    
   /*********************************************
    동의 / 비동의 버튼 클릭시 처리  
    *********************************************/   
   // 대상 : .YNbox button
   // 통과조건 #termsService, #termsPrivacy 모두 체크
   $(".YNbox button").click(function(){
        // 1. 버튼 종류 구분 : is("#btnY") 동의 버튼?
        let isB = $(this).is("#btnY");
        // console.log("버튼", isB);
        // 2. 동의 버튼 클릭일 경우 : 필수체크확인후 회원가입허가
        if(isB) {
            // (1) 필수 항목이 모두 체크된 경우
            if($("#termsService").prop("checked")&&$("#termsPrivacy").prop("checked")){
                // 약관 동의 박스 숨기고 회원가입박스 보이기
                $("#conf").fadeOut(200, ()=>{
                    $(".scont").fadeIn(300);
                });

            } ///// if
            // (2) 필수 항목이 안된 경우
            else {
                alert("필수항목을 모두 체크하셔야 합니다.")
            }
        } ////// if
        // 3. 비동의 버튼 클릭 시
        else {
            alert("메인페이지로 이동합니다.");
            location.href = "index.html";
        } ///// else

   }); ///// click


    /********************************************* 
        [ 사용자 입력폼 유효성 검사 ]
        - 이벤트종류 : blur(포커스가 빠질때 발생)
        - 제이쿼리 이벤트 메서드 : blur()
        - 이벤트 대상:
        -> id가 'email2'가 아니고 class가 'search'가 
        아닌 type이 'text'인 입력요소 input
        과 함께 type이 'password'인 입력요소 input
        'email2' : 이메일 뒷주소

        ->>>> 제이쿼리 선택표현법:
        input[type=text][id!=email2][class!=search],
        input[type=password]
        >>> 대괄호는 속성선택자(CSS원래문법) 
        != 같지않다(제이쿼리전용)

    *********************************************/    
   $(`input[type=text][id!=email2][class!=search],input[type=password]`)
   .blur(function(){
        // 0. 공백 제거 처리함수
        // get rid of space -> 공백 제거
        const groSpace = cv => cv.replace(/\s/g, "")
        // 원형 : (cv) => {return cv.replace(/\s/g, "")}
        // 정규식 : 슬래쉬(/) 사이에 표현, \s 스페이스 문자
        // 정규식 참고 -> https://www.w3schools.com/jsref/jsref_obj_regexp.asp 
        // 해석 :  공백문자를 모두(g:global-전역) 찾아서 없애시오(빈공백으로 변경)
        
        // 1. 방금 블러가 발생한 요소의 id 알아내기
        let cid = $(this).attr("id");
        // 2. 블러가 발생한 요소의 입력된 값
        // let cv = $(this).val().trim();
        let cv = cid==="mnm"?$(this).val().trim():groSpace($(this).val())
        // 삼항연산자 cid가 mnm이냐?응:아니
        // val() 메서드 - input요소의 값(value) 읽기/쓰기용
        // trim() 메서드 - 앞뒤 공백 제거(공백만 있으면 공백제거)
        // groSpace() -> 공백 제거해주는 함수

        // 서비스 차원으로 공백 제거된 데이터를 다시 입력창에 넣어줌
        $(this).val(cv); // val(값)
        /************************************************
           3. 빈값 여부 검사
        ************************************************/ 
       if(cv==="") {
            // 메세지 출력
            $(this).siblings(".msg").text("필수입력").removeClass("on")

            // 불통과
            pass=false;
       } // if문
        /************************************************
           4. 아이디일 경우 유효성 검사
              - 검사기준 : 영문자로 시작하는 6~20글자 영문자/숫자
        ************************************************/ 
       else if(cid==="mid") {
            //console.log("아이디검사결과", vReg(cv, cid))
            if(!vReg(cv, cid)) { // false 일때 !(NOT연산자)로 true 변경
                /// 불통과일때 메세지
                $(this).siblings(".msg").text("영문자로 시작하는 6~20글자 영문자/숫자").removeClass("on")
                // 불통과
                pass=false;
            }
            else {
                // 1. DB에 아이디가 있는지 조회후 결과로 처리해야함(보류)
                // 만약 아이디가 이미 있으면 "이미 사용중이거나 탈퇴한 아이디입니다."
                // 만약 아이디가 없으면 "멋진 아이디네요!"
                // 2. 메시지뿌리기
                $(this).siblings(".msg").text("멋진 아이디네요!").addClass("on")
            }
       } // else if : 아이디검사 시
        /************************************************
           5. 비밀번호일 경우 유효성 검사
              - 검사기준 : 특수문자,문자,숫자포함 형태의 5~15자리
        ************************************************/ 
       else if(cid==="mpw") {
            //console.log("아이디검사결과", vReg(cv, cid))
            if(!vReg(cv, cid)) { // false 일때 !(NOT연산자)로 true 변경
                /// 불통과일때 메세지
                $(this).siblings(".msg").text("특수문자,문자,숫자포함 형태의 5~15자리")
                // 불통과
                pass=false;
            }
            else {
                $(this).siblings(".msg").empty()
            }
       } // else if : 비밀번호검사 시
        /************************************************
           6. 비밀번호확인일 경우 유효성 검사
              - 검사기준 : 특수문자,문자,숫자포함 형태의 5~15자리
        ************************************************/ 
       else if(cid==="mpw2") {
            if(cv!==$("#mpw").val()) { // false 일때 !(NOT연산자)로 true 변경
                /// 불통과일때 메세지
                $(this).siblings(".msg").text("비밀번호가 일치하지 않습니다.")
                // 불통과
                pass=false;
            }
            else {
                $(this).siblings(".msg").empty()
            }
       } // else if : 비밀번호확인 검사 시
        /************************************************
           7. 이메일 유효성 검사
              - 검사기준 : 이메일 형식에 맞는지 검사 
        ************************************************/ 
       else if(cid==="email1") {
            // 1. 이메일 주소만들기 : 앞주소@뒷주소
            let comp = eml1.val() + "@" + (seleml.val() ==="free"?eml2.val():seleml.val())

            // 2. 이메일 주소 호출
            resEml(comp);
       } // else if : 비밀번호확인 검사 시
       //모두 통과일 경우 메시지 지우기       
       else{
            // 메세지 출력
            $(this).siblings(".msg").empty()
       } // else        
       
        console.log(cv);
   }); ///// blur

   // 이메일 관련 대상 선정
   // 이메일 앞주소
   const eml1 = $("#email1");
   // 이메일 뒷주소
   const eml2 = $("#email2");
   // 이메일 선택박스
   const seleml = $("#seleml");

   /**************************************************
    선택박스 변경 시 이메일 검사하기
    _______________________________
    검사시점 : 선택박스 변경할 때 
    이벤트 : change -> 제이쿼리 change() 메서드
    이벤트 대상 : #seleml -> seleml 변수
   **************************************************/
  seleml.change(function(){
    // 1. 선택박스 변경된 값 읽어오기
    let cv = $(this).val()
    console.log("선택값", cv)
    //2. 선택옵션별 분기문
    if(cv==="init") {
        // "선택해주세요"
        // 1. 메시지 출력
        eml1.siblings(".msg").text("이메일 옵션 선택 필수").removeClass("on")
        // 2. 직접 입력창 숨기기
        eml2.fadeOut(200);
    } //// if "선택해주세요"
    else if(cv==="free") {
        // "직접입력"
        // 1. 직접입력창 보이기
        eml2.fadeIn(200).val("").focus();
        // val(값) -> 입력창에 값 넣기(빈문자값은 기존값을 지워줌)
        // focus() -> 입력창에 포커스(커서깜박임)

        // 2. 기존 메세지 지우기
        eml1.siblings(".msg").empty();

        
    } // else if "직접입력"
    else {
        // 1. 직접 입력창 숨기기
        eml2.fadeOut(200);

        // 2. 이메일 전체 주소 조합
        let comp = eml1.val() + "@" + cv;
        // cv는 select의 option의 value

        // 3. 이메일 유효성 검사함수 호출
        resEml(comp);
    }
  }) //// change

  /*************************************************
    키보드 입력 시 이메일 체크
    _____________________________________________

    - 키보드 관련 이벤트 : keypress, keyup, keydown
    1. keypress : 키가 눌려졌을 때
    2. keyup : 키가 눌렸다가 올라올때
    3. keydown : 키가 눌려져서 내려가있을때
    -> 과연 글자가 입력되는 순간은 어떤 키보드 이벤트를 적용해야할까?
    ->>> keyup 실시간으로 적용됨 나머지는 한템포씩 느리당

    - 이벤트 대상 : #email1, #email2
    -> 모든 이벤트와 함수와 연결하는 jQuery 메서드?
    on(이벤트명, 함수)
  *************************************************/
 $("#email1,#email2").on("keyup", function(){
    // 1. 현재 이벤트 대상 아이디 읽어오기
    let cid = $(this).attr("id");
    // 2. 현재 입력된 값 읽어오기
    let cv = $(this).val();
    // 3. 이메일 뒷주소 세팅하기
    let backeml = cid==="email1"?seleml.val():eml2.val();
    // 현재 아이디가 email1인가? 맞으면 선택박스 
    // 아니면 두번째 이메일 뒷주소를 입력하는 중이므로 그것을 선택
    // 변수 = 조건연산자(조건식?값1:값2)
    
    // 4. 만약 선택박스값이 free(직접입력)이면 이메일 뒷주소 변경
    if(seleml.val()==="free") backeml = eml2.val();
    
    // 5. 이메일 전체 주소 조합
    let comp = eml1.val()+"@"+backeml;

    // 6. 이메일 유효성 검사함수 호출
    resEml(comp);
 });
  /*************************************************
    함수명 : resEml (result Email)
    기능 : 이메일 검사결과 처리
  *************************************************/
 const resEml = (comp) => {
    // comp - 완성된 이메일 주소
    // console.log("이메일 주소", comp)
    // console.log("이메일 검사결과", vReg(comp, "eml"))

    // 이메일 정규식 검사에 따른 메세지 보이기
    if(vReg(comp, "eml")) {
        eml1.siblings(".msg").text("적합한 이메일 형식입니다.").addClass("on");
    } /// if 통과시
    else {
        eml1.siblings(".msg").text("잘못된 이메일 형식입니다.").removeClass("on");
        // 불통과
        pass=false;
    } // else 불통과시
 }; ////// resEml 함수

 /******************************************************************************
    가입하기(submit) 버튼 클릭 시 처리
    ________________________________________________________________________

    전체 검사의 원리 : 
    전역변수 pass를 설정하여 true 를 할당하고 검사 중간에 불통과 사유 발생 시 false로 변경
    유효성 검사 통과 여부 판단

    검사방법 :  
    기존 이벤트 blur 이벤트를 강제로 발생시킴
    이벤트를 강제 발생시키는 메서드 -> trigger(이벤트명)


 ******************************************************************************/

// 검사용 변수
let pass = true;

// 이벤트 대상 : #btnj
// 원래 submit 버튼은 클릭 시 싸고 있는 form태그의 action 설정 페이지로 
// 모든 입력창의 값을 전송하도록 설계되어 있음
// 기본 서브밋 이동을 막고 우리가 검사 후 전송
$("#btnj").click(e=>{
    // 0. 호출확인
    // console.log("가입");
    // 1. 기본 이동 막기
    e.preventDefault();
    // 2. pass 통과 여부 변수에 true 를 할당
    // 처음에 true로 시작하여 검사 중간에 한번이라도 
    // false로 할당되면 결과는 false
    pass = true;

    // 3. 입력창 blur 이벤트 강제 발생
    // 대상 : blur 이벤트 발생했던 요소들
    $(`input[type=text][id!=email2][class!=search],input[type=password]`).trigger("blur")

    // 최종통과 여부
    console.log("통과여부", pass);

    // 4. 검사결과에 따른 메세지 보이기
    if(pass) {
        // 원래는 post 방시으로 DB에 회원가입 정보를 전송하여 입력 후 DB처리 완료시
        // 성공 메세지나 로그인 페이지로 넘겨줌
        alert("회원가입을 축하드립니다!")
        // 로그인 페이지로 리디렉션
        // location.href = "login.html"
        // 브라우저 캐싱 히스토리를 지우려면 -> 뒤로가기 버튼 비활성화됨
        // location.replace(url)사용
        location.replace("login.html")
    } /// if : 통과 시
    else {
        alert("입력 내용을 확인해주세요")
    }

}) // click


});/// jQB

/*////////////////////////////////////////////////////////
    함수명: vReg (validation with Regular Expression)
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)
    -> w3c 참조 : 
    https://www.w3schools.com/jsref/jsref_obj_regexp.asp
*/ ////////////////////////////////////////////////////////
function vReg(val, cid) {
    // val - 검사할값, cid - 처리구분아이디
    // //console.log("검사:"+val+"/"+cid);

    // 정규식 변수
    let reg;

    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            // 영문자로 시작하는 6~20글자 영문자/숫자
            // /^[a-z]{1} 첫글자는 영문자로 체크!
            // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "eml": // 이메일
            reg =
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
    } //////////// switch case문 //////////////////

    // //console.log("정규식:"+reg);

    // 정규식 검사를 위한 JS메서드
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!
} //////////// vReg 함수 //////////////////////////////////
///////////////////////////////////////////////////////////