// VidSwipe 모듈
import $ from "jquery";
import "../css/catswipe.css";
import SwiperCat from "../plugin/SwiperCat";


// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
    })// jQB
}// jqFn ////////

function CatSwipe(props){
    // props.tit 페이지별 데이터 구분
    return(
        <>
            {/* 모듈코드 */}
            <section className="catswbox">
                {/* 1.모듈타이틀 */}
                <h2 className="tit">{props.tit}</h2>
                {/* 2. 스와이퍼 컴포넌트 */}
                <SwiperCat />
            </section>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            { jqFn() }
        </>
    )
}

export default CatSwipe;