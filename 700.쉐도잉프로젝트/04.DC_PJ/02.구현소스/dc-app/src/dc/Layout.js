// 메인 레이아웃 컴포넌트
import Logo from "./Logo";
import "./css/layout.css";
import { Link, Outlet } from "react-router-dom";
// 폰트 어썸
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ban_data from "./data/banner";

/**************************************************************************
    [ 리액트 라우터와 연결하여 사용되는 라우터 컴포넌트 ]
    1. <Link to="/경로명"></Link>
       -> to 속성의 경로는 <Route>의 path속성과 일치

    2. <Outlet />
       -> 라우터 연결 컴포넌트 출력자리 컴포넌트(아울렛 자리에 출력됨!!)
**************************************************************************/

const Layout = () => {
    // GNB 메뉴 데이터 구성
    const gnb_data = [
        // {
        //     txt : "HOME",
        //     link : "/",
        // },
        {
            txt : "CHARACTERS",
            link : "/ct",
        },
        {
            txt : "COMICS",
            link : "/co1",
            sub : [
                {
                    txt : "LATEST COMICS",
                    link : "/co1",
                },
                {
                    txt : "DC UNIVERSE INFINITE",
                    link : "/co2",
                },
                {
                    txt : "ALL COMICS SERIES",
                    link : "/co3",
                },
            ],
        },
        {
            txt : "MOVIES & TV",
            link : "/mv",
            sub : [
                {
                    txt : "DC MOVIES",
                    link : "/mv",
                },
                {
                    txt : "DC SERIES",
                    link : "/mv",
                },
                {
                    txt : "DC ON HBO MAX",
                    link : "/mv",
                },
            ],
        },
        {
            txt : "GAMES",
            link : "/gm",
        },
        {
            txt : "NEWS",
            link : "/nw",
        },
        {
            txt : "VIDEO",
            link : "/vd",
        },
    ];

    // 하단링크 데이터 셋업
    const bmenu = [
        {
            txt:"Privacy Policy",
            link:"https://www.warnermediaprivacy.com/policycenter/b2c/WM/",
        },
        {
            txt:"Terms",
            link:"https://www.dcuniverseinfinite.com/terms?_gl=1*5nxhg2*_gcl_au*MTk3OTgxNzUwMi4xNjgzMTc3NDg3",
        },
        {
            txt:"Ad Choices",
            link:"https://www.warnermediaprivacy.com/policycenter/b2c/wm/",
        },
        {
            txt:"Accessibility",
            link:"https://policies.warnerbros.com/terms/en-us/#accessibility",
        },
        {
            txt:"Cookie Settings",
            link:"https://www.dc.com/#compliance-link",
        },

    ]
    return(
        <>
            {/* 1. 상단영역 */}
            <header className="top">
                {/* 네비게이션 파트 */}
                <nav className="gnb">
                    <ul>
                        <li>
                            <Link to="/main">
                                <Logo gb="top"/>
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
                            <FontAwesomeIcon icon={faSearch} />
                        </li>
                        <li>
                            <Link to="/signup">SIGN UP</Link>
                        </li>
                        <li>
                            <Link to="/login">LOG IN</Link>
                        </li>
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
                <Logo gb="bottom" />
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