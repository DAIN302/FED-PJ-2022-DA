// DC 메인 페이지 컴포넌트
import React from "react";
import Ban from "./modules/Ban";
import MenuBtn from "./modules/MenuBtn";
import VidIntro from "./modules/VidIntro";
import VidSwipe from "./modules/VidSwipe";
import SwiperVid from "./plugin/SwiperVid";

const Main = () => {
    return(
        <>
            {/* 1. 배너모듈 */}
            <Ban cat="main"/>
            {/* 2. 메뉴버튼모듈 */}
            <MenuBtn />
            {/* 3. 비디오모듈 */}
            <VidIntro cat="main"/>
            {/* 4. 비디오스와이프모듈 */}
            <VidSwipe pg="main" tit="LATEST TRAILERS, CLIPS & MORE" />
        </>
    )
} //// Main 컴포넌트

export default Main;