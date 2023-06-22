// 어떤 모듈
import $ from "jquery";
import { useState } from "react";
import "../css/search.css"
import cat_data from "../data/cat";
import CatList from "./CatList";

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{

    })// jQB
}// jqFn ////////

function Search(){
    // 데이터 선택하기 : Hook 데이터 구성
    let [sdt, setSdt] = useState(cat_data);

    return(
        <>
            {/* 모듈코드 */}
            <section className="schbx">
                {/* 1. 옵션선택박스 */}
                <div className="schopt">
                </div>
                {/* 2. 결과리스트박스 */}
                <div className="listbx">
                    {/* 결과타이틀 */}
                    <h2 className="restit">BROWSE CHARACTERS</h2>
                    {/* 정렬선택박스 */}
                    <aside className="sortbx"></aside>
                    {/* 캐릭터 리스트 컴포넌트 
                        전달 속성 dt - 리스트 데이터 */}
                    <CatList dt={sdt} />
                </div>
            </section>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            { jqFn() }
        </>
    )
}

export default Search;