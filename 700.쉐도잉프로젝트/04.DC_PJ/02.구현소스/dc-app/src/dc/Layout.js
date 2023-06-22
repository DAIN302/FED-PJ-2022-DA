// 메인 레이아웃 컴포넌트
import Logo from "./Logo";
import "./css/layout.css";
import { Link, Outlet } from "react-router-dom";
import ScrollTop from "./common/ScrollTop";

import { gnb_data, bmenu } from "./data/common"

// 폰트 어썸
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


/**************************************************************************
    [ 리액트 라우터와 연결하여 사용되는 라우터 컴포넌트 ]
    1. <Link to="/경로명"></Link>
       -> to 속성의 경로는 <Route>의 path속성과 일치

    2. <Outlet />
       -> 라우터 연결 컴포넌트 출력자리 컴포넌트(아울렛 자리에 출력됨!!)
**************************************************************************/

const Layout = () => {
    // 자식컴포넌트 값 전달 테스트 함수
    const callMe = (x) => {
        console.log("누구?", x)
    }

    // 로그인 상태 Hook 변수 : 로컬스 "minfo" 초기 할당
    const [logSts, setLogSts] = useState(localStorage.getItem("minfo"));
    // 로그인 환영 메시지 Hook 변수
    const [logMsg, setLogMeg] = useState("");
    // 로그인 환영 메시지 스타일
    const logstyle = {
        position : "absolute",
        left : "50%",
        transform : "translateX(-50%)"
    }

    // 로그인 세팅 함수
    // -> ScrollTop.js 의 useEffect 함수구역에서 호출
    const setLogin = () => {
        // 1. 로그인 Hook변수 업데이트
        setLogSts(localStorage.getItem("minfo"));

        // 2. 로컬스토리지 값이 null이 아니면 메시지 뿌리기
        if(localStorage.getItem("minfo")){
            // 메시지 세팅 : 객체안의 "unm" 속성이 사용자 이름
            setLogMeg("Welcome "+JSON.parse(localStorage.getItem("minfo"))["unm"]);
        }
    }

    // 로그아웃 함수
    // LOGOUT 버튼에서 호출
    const logout = () => {
        // 1. 로컬스토리지 "minfo" 삭제
        localStorage.removeItem("minfo");
        // 2. 로그인 상태 Hoom 변수 업데이트
        setLogSts(null)
    }




    return(
        <>
            {/* 라우터 갱신될때 스크롤 상단이동 모듈작동함 + 로그인 세팅함수 호출 전달 
            자식에게 setLogin 함수 전달 */}
            <ScrollTop sfn={setLogin}/>
            {/* 1. 상단영역 */}
            <header className="top">
                {/* 로그인 환영 메시지 : 조건 logSts값이 null이 아니면 */}
                {
                    logSts !== null &&
                    <div className="logmsg" style={logstyle}>
                        {logMsg}
                    </div>

                }
                {/* 네비게이션 파트 */}
                <nav className="gnb">
                    <ul>
                        <li>
                            <Link to="/main">
                                <Logo gb="top" tt={callMe}/>
                            </Link>
                        </li>
                        {
                            gnb_data.map((v,i) => 
                                <li key={i}>
                                    <Link to={v.link}>{v.txt}</Link>
                                    {/* v.sub가 없으면 undefined */}
                                    { 
                                        // 조건식 && 출력코드
                                        // 조건 : sub데이터가 없지 않으면 (undefinde가 아니면)
                                        // undefined - 정의되지 않은 값
                                        // null - 빈값
                                        // 위의 두가지는 데이터가 없다는 값
                                        v.sub !== undefined && // undefinde대신 null 을 써도 됨!
                                        <div className="smenu">
                                            <ol>
                                                {
                                                    v.sub.map((v,i)=>
                                                        <li key={i}>
                                                            <Link to={v.link}>{v.txt}</Link>
                                                        </li>
                                                    )
                                                }
                                            </ol>
                                        </div>
                                    }
                                </li>
                            )
                        }
                        <li style={{marginLeft : "auto"}}>
                            <Link to ="/sch">
                                <FontAwesomeIcon icon={faSearch} />
                            </Link>
                        </li>
                        {
                            // 회원가입, 로그인은 로그인 아닌 상태일때만
                            logSts === null &&
                            <>
                                <li>
                                    <Link to="/signup">SIGN UP</Link>
                                </li>
                                <li>
                                    <Link to="/login">LOG IN</Link>
                                </li>
                            </>
                        }
                        {
                            // 로그아웃 버튼은 로그인 상태일때만 
                            logSts !== null &&
                            <>
                                <li>
                                    <a href="#" onClick={logout}>LOG OUT</a>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </header>
            {/* 2. 메인영역 */}
            <main className="cont">
                {/* 출력파트 : 각 페이지의 컴포넌트가 출력됨 */}
                <Outlet />
            </main>
            {/* 3. 하단영역 */}
            <footer className="info">
                <Logo gb="bottom" tt={callMe}/>
                <ul className="bmenu">
                {
                    bmenu.map((v,i)=>
                    <li key={i}>
                        <Link to={v.link}>{v.txt.toUpperCase()}</Link>
                    </li>
                    )    
                }
                </ul>
                © & ™ DC. ALL RIGHTS RESERVED 
            </footer>
        </>
    )
} /// Layout 컴포넌트

export default Layout;