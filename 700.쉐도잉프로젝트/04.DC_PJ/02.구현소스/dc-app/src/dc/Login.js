// 로그인 페이지 컴포넌트
import React, {useState} from "react";
import $ from "jquery";
import initData from "./fsn/fnMem";
import { useNavigate } from "react-router-dom";

// 회원가입과 디자인 동일
import "./css/member.css"

export default function LogIn(){
    // 라우트이동 메서드
    let goRoute = useNavigate();

    // [ 1. 입력요소 후크변수 ]
    // 1. 아이디변수
    const [userId, setUserId] = useState("");
    // 2. 비밀번호변수
    const [pwd, setPwd] = useState("");

    // [ 2. 에러상태값 후크변수]
    // -> 에러상태값변수 : 초기값은 에러 아님 상태(false)
    // 1. 아이디에러변수 
    const [userIdError, setUserIdError] = useState(false);
    // 2. 비밀번호에러변수 
    const [pwdError, setPwdError] = useState(false);

    // [ 아이디 관련 메시지 프리셋 ]
    const msgTxt = [
        "This is a required entry",
        "ID does not exist.",
        "Password doesn't match."
    ];

    // 후크 변수 메시지
    // 아이디 메시지
    const [idMsg, setIdMsg] = useState(msgTxt[0]); 
    // 비번 메시지
    const [pwdMsg, setPwdMsg] = useState(msgTxt[0]); 


    // [ 3. 유효성 검사 메서드 ]
    // 1. 아이디 유효성 검사
    const changeUserId = e => { // e - 이벤트 전달 변수
        // 1. 빈값 체크
        if(e.target.value !== "") setUserIdError(false);
        else {
            setIdMsg(msgTxt[0]);
            setUserIdError(true);
        }

        // 2. 입력값 반영
        setUserId(e.target.value);
    }

    // 2. 비밀번호 유효성 검사
    const changePwd = e => {
        if(e.target.value !== "") setPwdError(false);
        else {
            setPwdMsg(msgTxt[0]);
            setPwdError(true);
        }
        
        // 업데이트
        setPwd(e.target.value)
    }

    // 6. 전체 유효성 검사 함수
    const totalValid = () => {
        // 모든 입력창 검사(빈 값일 경우 모두 에러를 후크변수에 전달)
        if(!userId) setUserIdError(true);
        if(!pwd) setPwdError(true);

        // 통과조건:
        // 1. 빈값이 아님
        // 2. 에러 후크 변수가 모두 false
        // 위의 2가지 만족시 treu값 리턴
        if(userId && pwd && !userIdError && !pwdError) return true;
        else return false; // 하나라도 에러면 false 리턴
    }

    // 7. 서브밋 기능 함수
    const onSubmit = e => {
        // 기본 서브밋기능 막기!
        e.preventDefault();

        // 유효성 검사 전체 통과 시
        if(totalValid()) {
            console.log("성공")
            // 데이터 체크 초기화
            initData();

            // 로컬스토리지 "mem-data" 데이터 확인
            let memData = localStorage.getItem("mem-data");

            // 로컬스토리지 데이터 객체화
            memData = JSON.parse(memData);

            // 같은 아이디 검사 상태변수
            let isOK =  true;

            // 입력데이터중 아이디 비교
            memData.forEach(v => {
                // 같은 아이디가 있는가?
                if(v["uid"]===userId) {
                    console.log("아이디ㅇㅋㅇㅋ")
                    // 같은 아이디 검사 상태변수 변경
                    isOK = false;
                    // 비밀번호가 일치하는가?
                    if(v["pwd"]===pwd) {
                        // 비밀번호 에러 상태 업데이트
                        setPwdError(false);
                        $(".sbtn").text("로그인ㅇㅋㅇㅋ")
                        // [ 로그인 후 세팅작업 ]
                        // 1. 로그인한 회원정보를 로컬스토리지에 세팅(세션대신 사용)
                        // -> 실제 로그인을 하면 서버의 세션변수가 세팅됨
                        localStorage.setItem("minfo", JSON.stringify(v))
                        
                        // 2. 라우팅 페이지 이동(useNavigate)
                        goRoute('/'); // 첫페이지로 이동
                    }
                    else{
                        console.log("비번ㄴㄴ")
                        // 비번다를 때 메시지 변경
                        setPwdMsg(msgTxt[2])
                        // 비번에러상태 업데이트
                        setPwdError(true);
                    }
                }
            });

            // 아이디가 불일치 할 경우
            if(isOK){
                console.log("아이디ㄴㄴ")
                // 아이디가 다를 때 메시지 변경
                setIdMsg(msgTxt[1])
                // 아이디 에러 상태 업데이트
                setUserIdError(true);
            }
        }
        // 불통과시
        else {
            // alert("입력을 수정하세요")
            console.log("실패")
            setIdMsg(msgTxt[0])
            setPwdMsg(msgTxt[0])
        }        
    }


    return(
        <>
        <div className="outbx">
            {/* 모듈코드 */}
            <section className="membx" style={{minHeight:"300px"}}>
                <h2>LOG IN</h2>
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
                                        {pwdMsg}
                                    </small>
                                </div>
                            }
                        </li>
                        <li style={{overflow : "hidden"}}>
                            {/* 6. 버튼 */}
                            <button className="sbtn" onClick={onSubmit}>SUBMIT</button>
                            {/* input submit버튼이 아니어도 form요소 내부의 button은 submit기능이 있다! */}
                        </li>
                    </ul>
                </form>
            </section>
        </div>
        </>
    )
}