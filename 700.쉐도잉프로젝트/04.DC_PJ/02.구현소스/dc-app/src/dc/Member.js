// 어떤 모듈
import React, {useState} from "react";
import $ from "jquery";
import "./css/member.css"
import { Link, useNavigate } from "react-router-dom";
import initData from "./fsn/fnMem";


/* 
    [ 후크 : Hook - 왜 필요한가? ]
    1. 목적 - 어떤 특정 데이터가 변경될때
    다른 것을 매칭하여 실시간으로 변경할 필요가 있을 경우
    간단하고 효과적으로 이것을 구현해주는 방법이다!
    2. 구현방법
        1) 상단에 후크를 import 한다 -> useState
        2) useState() 메서드를 사용한다
        코드법: 
            배열변수 = useState(초기값)
        일반형:
            const [변수명,set변수명] = useState(초기값)
            -> set변수명 작성시 변수명 첫글자는 대문자로처리!
            -> set변수명(값) : 메서드 형태로 값을 셋팅한다!(셋터와 비슷함)
        3) 작동원리
            - useState에 쓴 초기값이 배열변수 첫번째에 할당된다
            - 코드에서 set변수명 에 값을 할당하면
            useState가 이것을 체크하여 다른 변경을 
            하도록 메서드를 실행한다!
        4) 사용결과
            - 별도의 메서드 호출없이 후크 상태변수를 사용한 곳이
            자동으로 변경될때마다 다시 갱신되는 것을 확인할 수 있다!
*/

function Member(){
    // 요구사항 : 각 입력항목에 맞는 유효성 검사를 입력하는 순간 실시간으로 체크하여 결과를 화면에 리턴

    // [ 리액트 라우터 이동시 이동메서드 사용 : useNavigate ]
    // 1. Link 를 사용한 세팅으로 라우터를 이동
    // -> 코드적으로 이동할 때는? 바로 useNavigate
    // 2. import 하기 : import { Navigate } from "react-router-dom";
    // 3. 사용법 : 변수 = useNavigate()
    // -> 변수(라우터경로)

    // 라우터 이동 네베게이트 생성
    const goRoute = useNavigate();

    // [ 후크 useState 메서드 세팅 ]
    // [ 1. 입력요소 후크변수 ]
    // 1. 아이디변수
    const [userId, setUserId] = useState("");
    // 2. 비밀번호변수
    const [pwd, setPwd] = useState("");
    // 3. 비밀번호확인변수
    const [chkPwd, setChkPwd] = useState("");
    // 4. 사용자이름변수
    const [userName, setUserName] = useState("");
    // 5. 이메일변수
    const [email, setEmail] = useState("");

    // [ 2. 에러상태값 후크변수]
    // -> 에러상태값변수 : 초기값은 에러 아님 상태(false)
    // 1. 아이디에러변수 
    const [userIdError, setUserIdError] = useState(false);
    // 2. 비밀번호에러변수 
    const [pwdError, setPwdError] = useState(false);
    // 3. 비밀번호확인에러변수 
    const [chkPwdError, setChkPwdError] = useState(false);
    // 4. 사용자이름에러변수 
    const [userNameError, setUserNameError] = useState(false);
    // 5. 이메일에러변수 
    const [emailError, setEmailError] = useState(false);

    // [ 아이디 관련 메시지 프리셋 ]
    const msgId = [
        "User ID must contain a minimum 5 characters.",
        "This ID is already in use!",
        "That's a great ID!"
    ];

    // 후크 변수 메시지
    const [idMsg, setIdMsg] = useState(msgId[0]); 

    // [ 3. 유효성 검사 메서드 ]
    // 1. 아이디 유효성 검사
    const changeUserId = e => { // e - 이벤트 전달 변수
        // 1. 아이디 유효성 검사식(따옴표로 싸지 말것)
        const valid = /^[A-Za-z0-9+]{5,}$/;

        // 2. 입력값 확인 :  e.target -> 이벤트가 발생한 요소 
        console.log(e.target.value);        

        // 3. 에러아님 상태 if문
        // 조건 : 유효성 검사 결과가 true인가? 에러상태! false(에러아님)
        // 정규식.test() -> 정규식 검사 결과 리턴 메서드
        // 결과 : true 에러상태값 false / false면 에러상태값 true
        if(valid.test(e.target.value)) {
            initData();

            // 아이디 형식에는 맞지만 사용중인 아이디인지 검사(아이디 중복검사)
            let memData = localStorage.getItem("mem-data");
            // 로컬스토리지 데이터 null이 아닌 경우
            if(memData){
                // 로컬스토리지에 기존 아이디 있는지 확인
                // 문자형 데이터를 객체형 데이터로 변환(배열형)
                memData = JSON.parse(memData);
                // 검사하기(배열이니까 forEach사용)

                // 기존아이디가 있으면 상태값 false로 업데이트
                let isOK = true;

                memData.forEach(v => {
                    // 기존의 아이디와 같은 경우
                    if(v["uid"]===e.target.value) {
                        // 메시지 변경
                        setIdMsg(msgId[1])
                        // 아이디에러 상태값 업데이트
                        setUserIdError(true);

                        isOK = false;
                    }
                });

                 // 기존아이디가 없으면 들어감!
                 if(isOK){
                    console.log("바깥");
                    // 메시지변경(처음메시지로 변경)
                    setIdMsg(msgId[0]);              
                    // 아이디에러상태값 업데이트
                    setUserIdError(false);

                } /////////// if : isOK /////////
            }
            else {
                console.log("DB없음")
            }

            // setUserIdError(false)
        }
        else {
            setUserIdError(true)
        }

        // 4. 실제 userId 후크변수값이 업데이트 되어야 화면에 출력됨
        setUserId(e.target.value);
    }

    // 2. 비밀번호 유효성 검사
    const changePwd = e => {
        // 정규식
        const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        // if문
        if(valid.test(e.target.value)) {
            setPwdError(false)
        }
        else {
            setPwdError(true)
        }

        // 업데이트
        setPwd(e.target.value)
    }

    // 3. 비밀번호 확인 유효성 검사
    const changeChkPwd = e => {
        // 위에 입력한 비밀번호와 일치 여부 확인
        if(pwd === e.target.value) setChkPwdError(false);
        else setChkPwdError(true);

        // 입력값 반영
        setChkPwd(e.target.value);
    }

    // 4. 이름 유효성 검사
    const changeUserName = e => {
        // 1. 빈값 체크
        if(e.target.value !== "") setUserNameError(false);
        else setUserNameError(true);
 
        // 2. 입력값 반영
        setUserName(e.target.value);
    }

    // 5. 이메일 유효성 검사
    const changeEmail = e => {
        // 1. 정규식
        const valid = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

        // 2. 유효성 검사 체크
        if(valid.test(e.target.value)) setEmailError(false);
        else setEmailError(true);
 
        // 3. 입력값 반영
        setEmail(e.target.value);

    }

    // 6. 전체 유효성 검사 함수
    const totalValid = () => {
        // 모든 입력창 검사(빈 값일 경우 모두 에러를 후크변수에 전달)
        if(!userId) setUserIdError(true);
        if(!pwd) setPwdError(true);
        if(!chkPwd) setChkPwdError(true);
        if(!userName) setUserNameError(true);
        if(!email) setEmailError(true);

        // 통과조건:
        // 1. 빈값이 아님
        // 2. 에러 후크 변수가 모두 false
        // 위의 2가지 만족시 treu값 리턴
        if(userId && pwd && chkPwd && userName && email && !userIdError && !pwdError && !chkPwdError && !userNameError && !emailError) return true;
        else return false; // 하나라도 에러면 false 리턴
    }

    // 7. 서브밋 기능 함수
    const onSubmit = e => {
        // 기본 서브밋기능 막기!
        e.preventDefault();

        // 유효성 검사 전체 통과 시
        if(totalValid()) {
            // alert("처리페이지로 이동")
            
            // 로컬스 변수 할당
            let memData = localStorage.getItem("mem-data")
            // console.log(memData)

            // 로컬스토리지 데이터 객체로 변환하기
            memData = JSON.parse(memData)
            // console.log(memData)

            // 새로운 데이터 구성
            let newObj = {
                "idx" : memData.length+1,
                "uid" : userId,
                "pwd" : pwd,
                "unm" : userName,
                "eml" : email
            };

            // 데이터 추가하기 : 배열에 데이터 추가 -> push()
            memData.push(newObj);

            // 로컬스토리지에 반영
            localStorage.setItem("mem-data", JSON.stringify(memData))

            // 로그인 페이지로 이동(라우터 이동)
            // useNavigate 사용
            $(".sbtn").text("넌 이제 회원이닷");
            setTimeout(()=>{
                goRoute('/login')
            }, 1500)


        }
        // 불통과시
        else {
            // alert("입력을 수정하세요")
        }        
    }
    
    return(
        <div className="outbx">
            {/* 모듈코드 */}
            <section className="membx">
                <h2>Join Us</h2>
                <form method="post" action="process.php">
                    <ul>
                        <li>
                            {/* 1. 아이디 */}
                            <label>ID : </label>
                            <input type="text" maxLength="20" placeholder="Please Enter Your ID" value={userId} onChange={changeUserId}/>
                            {
                                // 에러일 경우 메시지 보여주기
                                // 조건문 && 요소 -> 조건이 true면 요소 출력
                                userIdError && (
                                <div className="msg">
                                    <small style={{color :"red", fontSize:"10px"}}>
                                        {idMsg}
                                    </small>
                                </div>
                                )
                                // value={userId} 값은 setUserId를 통해서만 업데이트되어 실제화면에 반영됨
                                // onChange={changeUserId} change이벤트 발생시 changeUserId 함수 호출
                            }     
                            {
                                // 아이디 통과
                                // 아이디에러가 false일때 출력
                                // 고정데이터 배열 msgId 세번째값 출력
                                !userIdError && userId &&
                                (
                                <div className="msg">
                                    <small style={{color :"green", fontSize:"10px"}}>
                                        {msgId[2]}
                                    </small>
                                </div>
                                )
                            }
                        </li>
                        <li>
                            {/* 2. 비밀번호 */}
                            <label>PASSWORD : </label>
                            <input type="password" maxLength="20" placeholder="Please Enter Your Password" value={pwd} onChange={changePwd}/>
                            {
                                pwdError &&
                                <div className="msg">
                                    <small style={{color :"red", fontSize:"10px"}}>
                                        Password must be at least 8 characters long and must contain at least one letter and one number each.
                                    </small>
                                </div>
                            }
                        </li>
                        <li>
                            {/* 3. 비밀번호 확인 */}
                            <label>CONFIRM PASSWORD : </label>
                            <input type="password" maxLength="20" placeholder="Please Enter Your Password" value={chkPwd} onChange={changeChkPwd}/>
                            {
                                chkPwdError &&
                                <div className="msg">
                                    <small style={{color :"red", fontSize:"10px"}}>
                                        Password verification does not match.
                                    </small>
                                </div>
                            }
                        </li>
                        <li>
                            {/* 4. 이름 */}
                            <label>NAME : </label>
                            <input type="text" maxLength="20" placeholder="Please Enter Your Name" value={userName} onChange={changeUserName}/>
                            {
                                // 에러일 경우 메시지 보여주기
                                // 조건문 && 요소 -> 조건이 true면 요소 출력
                                userNameError &&
                                <div className="msg">
                                    <small style={{color :"red", fontSize:"10px"}}>
                                        This is a required entry.
                                    </small>
                                </div>
                            }  
                        </li>
                        <li>
                            {/* 5. 이메일 */}
                            <label>E-MAIL : </label>
                            <input type="text" maxLength="50" placeholder="Please Enter Your Email" value={email} onChange={changeEmail}/>
                            {
                                // 에러일 경우 메시지 보여주기
                                // 조건문 && 요소 -> 조건이 true면 요소 출력
                                emailError &&
                                <div className="msg">
                                    <small style={{color :"red", fontSize:"10px"}}>
                                        Please enter a valid email format
                                    </small>
                                </div>
                            }  
                        </li>
                        <li style={{overflow : "hidden"}}>
                            {/* 6. 버튼 */}
                            <button className="sbtn" onClick={onSubmit}>SUBMIT</button>
                            {/* input submit버튼이 아니어도 form요소 내부의 button은 submit기능이 있다! */}
                        </li>
                        <li>
                            {/* 7. 로그인 페이지 링크 */}
                            Are you already a member?
                            <Link to="/login"> Log In </Link>
                        </li>
                    </ul>
                </form>
            </section>
        </div>
    )
}

export default Member;