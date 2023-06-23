// 어떤 모듈
import $ from "jquery";
import { useState } from "react";
import "../css/search.css"
import cat_data from "../data/cat";
import CatList from "./CatList";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{

    })// jQB
}// jqFn ////////

function Search(){
    // 데이터 선택하기 : Hook 데이터 구성
    // -> 데이터 정렬을 반영하기 위해 정렬 상태값을 같이 설정
    // 데이터구성 : [배열데이터, 정렬상태값]
    // 정렬상태값: 0 - 오름차순, 1 - 내림차순, 2 - 정렬전
    // 설정이유 : 데이터 정렬만 변경될 경우 배열데이터가 변경되지 않을 것으로 Hook 상태관리에서 인식
    let [sdt, setSdt] = useState([cat_data, 2]);
    // sdt[0] -> 배열데이터만 가져갈 경우 0번째로 선택

    // 데이터 건수 : Hook 데이터 구성
    let [tot, setTot] = useState(cat_data.length);

    // 데이터 검색 함수
    const schList = () => {
        // 검색요소 대상 : #schin
        let inp  = document.querySelector("#schin")
        // 1. 검색어 읽기
        let keyword = inp.value
        // 2. 검색어 입력환인분기
        if(keyword.trim()==""){
            // 입력창으로 다시 보내기
            inp.focus();
            return;
        }
        // 3. 데이터 검색하기
        // 배열값 다중검색 메서드 -> filter()
        // 검색대상 : 전체 원본 데이터
        let newList = cat_data.filter(v=>{
            if(v.cname.toLowerCase().indexOf(keyword) !== -1) 
            return true;
        }); ////////// filter /////////////////

        console.log("검색결과:",newList);

        // 4. 검색결과 리스트 업데이트
        // Hook변수인 데이터 변수와 데이터 건수 변수를 업데이트
        setSdt([newList,2]);
        setTot(newList.length);

    }

    const enterKey = (e) => {
        if(e.key==="Enter") schList();
    }

    const sortList = (e) => {
        // 1. 선택옵션값 : 0-오름차순, 1-내림차순
        let opt = e.target.value;
        console.log(typeof(opt))
        
        // 임시변수 : 배열데이터만 가져옴
        let temp = sdt[0];

        // 2. 옵션에 따른 정렬 반영
        if(opt==1){ // 내림차순(1)
            temp.sort((x,y)=>
            x.cname==y.cname?0:x.cname>y.cname?-1:1);
        }
        else if(opt==0){ // 오름차순(0)
            temp.sort((x,y)=>
            x.cname==y.cname?0:x.cname>y.cname?1:-1);
        }

        // 3. 데이터 정렬
        // setSdt(배열데이터, 정렬상태)
        setSdt([temp, Number(opt)]);
        console.log("후",temp)
    }

    return(
        <>
            {/* 모듈코드 */}
            <section className="schbx">
                {/* 1. 옵션선택박스 */}
                <div className="schopt">
                    {/* 검색박스 */}
                    <div className="searching">
                        <FontAwesomeIcon icon={faSearch} className="schbtn" title="Open Search" onClick={schList}/>
                        {/* 입력창 */}
                        <input id="schin" type="text" placeholder="Filter by keyword" onKeyDown={enterKey} />
                    </div>
                </div>
                {/* 2. 결과리스트박스 */}
                <div className="listbx">
                    {/* 결과타이틀 */}
                    <h2 className="restit">BROWSE CHARACTERS<span>({tot})</span></h2>
                    {/* 정렬선택박스 */}
                    <aside className="sortbx">
                        <select className="sel" id="sel" name="sel" onChange={sortList}>
                            <option value="2">Sort</option>
                            <option value="0">A-Z</option>
                            <option value="1">Z-A</option>
                        </select>
                    </aside>
                    {/* 캐릭터 리스트 컴포넌트 
                        전달 속성 dt - 리스트 데이터 */}
                    <CatList dt={sdt[0]} />
                </div>
            </section>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            { jqFn() }
        </>
    )
}

export default Search;