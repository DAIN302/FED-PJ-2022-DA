// DC 코믹스 페이지 컴포넌트
import React from "react";
import Ban from "./modules/Ban";
import VidIntro from "./modules/VidIntro";

const Comics = (props) => {
    console.log(props.sub)

    // 타이틀 데이터 선택
    const tit_data = [
        "LATEST COMICS & GRAPHIC NOVELS",
        "DC UNIVERSE INFINITE",
        "ALL COMICS SERIES"
    ]
    return(
        <>
            <h1>{tit_data[props.sub]}</h1>
            <VidIntro cat="COMICS"/>
        </>
    )
} //// Main 컴포넌트

export default Comics;