// DC 영화 페이지 컴포넌트
import React from "react";
import Ban from "./modules/Ban";
import VidIntro from "./modules/VidIntro";

const Movies = () => {
    return(
        <>
            <Ban cat="MOVIES"/>
            <VidIntro cat="MOVIES" />
        </>
    )
} //// Movies 컴포넌트

export default Movies;