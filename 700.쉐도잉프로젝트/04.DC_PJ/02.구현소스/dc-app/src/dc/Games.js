// DC 게임 페이지 컴포넌트
import React from "react";
import Ban from "./modules/Ban";
import VidIntro from "./modules/VidIntro";

const Games = () => {
    return(
        <>
            <Ban cat="GAMES"/>
            <VidIntro cat="GAMES" />
        </>
    )
} //// Games 컴포넌트

export default Games;