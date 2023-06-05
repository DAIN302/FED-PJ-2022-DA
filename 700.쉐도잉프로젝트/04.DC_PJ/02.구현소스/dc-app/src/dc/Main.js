// DC 메인 페이지 컴포넌트
import React from "react";
import Ban from "./Ban";
import MenuBtn from "./MenuBtn";

const Main = () => {
    return(
        <>
            <Ban cat="main"/>
            <MenuBtn />
        </>
    )
} //// Main 컴포넌트

export default Main;