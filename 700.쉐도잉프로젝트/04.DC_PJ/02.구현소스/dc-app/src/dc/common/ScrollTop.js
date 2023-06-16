import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// 스크롤 상단 이동 컴포넌트 모듈은 
// 라우터가 세팅된 <BrowserRouter> 안에 <Scrolltop />호출해야하 함(import는 당연)
// 현재 PJ에는 index.js에 위치함
export default function ScrollTop(props){
    // 현재 라우터의 매핑 페이지 위치 알아내기
    const { pathname } = useLocation();

    // 컴포넌트가 속해있는 컴포넌트에 변경이 있을 경우 부가적으로 함께 작동되도록 액션을 주고자 할때 사용하는 리액트 모듈 -> useEffect
    // useEffect(함수, [사용할라우터페이지]) -> 함수가 실행됨
    useEffect(()=>{
        // 윈도우객체 스크롤 최상위 이동 코드
        window.scrollTo(0,0)
        // 로그인 상태를 확인 : "minfo"
        console.log("useEffect",localStorage.getItem("minfo"))
        // 부모 컴포넌트(Layout) 로그인 세팅함수 호출
        props.sfn();
        // 만약 로컬스토리지 "minfo"가 null이 아닌 세팅값이 있다면 로그인 환영메시지 보여줌(+로그아웃버튼 출력)
        
    }, [pathname])

    // 이 컴포넌트 실행은 다른 부가적인 코드는 실행시키지 않는다는 의미의 null값을 리턴
    return null;

    
}