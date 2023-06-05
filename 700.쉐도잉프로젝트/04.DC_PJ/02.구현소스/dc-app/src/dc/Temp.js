// 어떤 모듈
import $ from "jquery";
import "./css/temp.css"

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{

    })// jQB
}// jqFn ////////

function 어떤(props){
    return(
        <>
            {/* 모듈코드 */}
            {/* 빈루트를 만들고 JS로드함수포함 */}
            { jqFn() }
        </>
    )
}

// export default MenuBtn;