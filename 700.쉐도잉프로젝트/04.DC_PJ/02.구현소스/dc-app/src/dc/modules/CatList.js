// 어떤 모듈
import $ from "jquery";
import "../css/catlist.css"

import { Link } from "react-router-dom";

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{

    })// jQB
}// jqFn ////////

function CatList(props){
    // 선택데이터
    let sdt = props.dt;
    return(
        <>
            {/* 모듈코드 */}
            <ul className="clist">
            {
                    sdt.map((v,i)=>
                        <li key={i}>
                            <Link to="/det" state={{
                            cname:v.cname,
                            cdesc:v.cdesc,
                            facts:v.facts
                            }}>
                                <img src={v.tmsrc} alt={v.cname}/>
                                <h3>{v.cname}</h3>
                            </Link>
                        </li>
                    )
            }
            </ul>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            { jqFn() }
        </>
    )
}

export default CatList;