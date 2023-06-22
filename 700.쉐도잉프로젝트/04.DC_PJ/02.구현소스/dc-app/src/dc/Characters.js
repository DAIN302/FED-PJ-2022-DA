// DC 캐릭터 페이지 컴포넌트
import React from "react";
import Ban from "./modules/Ban";
import CatSwipe from "./modules/CatSwipe";


const Characters = () => {
    return(
        <>
            <Ban cat="CHARACTERS"/>
            <CatSwipe />
        </>
    )
} //// Characters 컴포넌트

export default Characters;