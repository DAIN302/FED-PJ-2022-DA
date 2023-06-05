// 배너 컴포넌트 Ban.js
// 배너 css
import "./css/ban.css"
// 배너 data
import ban_data from "./data/banner";
// 제이쿼리 가져오기
import $ from "jquery";


/**************************************************************************
    [ JS혹은 jQuery 라우터 구현 시 로드 불일치 문제 ]
    JS기능이 들어간 페이지의 로드구역 설정 시 본 페이지가 index페이지에 바로
    불려질 경우 이 문제는 생기지 않음
    그러나 라우터로 서브 로딩 구현할 경우 이 구역은 모체가로 로딩되는 것으로 실행
    따라서 본 모듈에 적용하려고 한 의도와 달리 본 소스에는 적용 X -> 라우터로딩 불일치 문제

    [ 해결방법 : 로딩구역을 함수로 만들고 컴포넌트 소스 하단에서 호출 ]
    예) function jqFn(){로드구역 포함 소스}
        function Component(){
            return(
                <>
                    소스들
                    { jqFn() }
                </>

            )
        }
**************************************************************************/

// 로드구역 함수화
function jqFn(){
    $(()=>{
        // 광클금지
        let prot = 0;
    
        // 1. 버튼 클릭 시 이동기능 구현
        $(".abtn").click(function(){
            // 광클금지
            if(prot) return;
            prot = 1;
            setTimeout(() =>prot=0, 400);
    
            // 1. 버튼 구분
            let isB = $(this).is(".rb");
    
            // 슬라이드 타겟 설정 : 클릭된 버튼의 형제요소 슬라이더 
            // 상대적으로 잡기 -> 슬라이드 클래스네임 가지고 있는애들 다 잡으면 안되서
            const tg = $(this).siblings(".slider")
            // console.log(tg)
    
            // 2. 분기하여 기능구현
            // (1) 오른쪽 버튼 클릭 시 : 오른쪽에서 들어옴 (left: 0-> -100%)
            if(isB) {
                tg.animate({left : "-100%"}, 400, function(){
                    // 여기서 this는 tg
                    // 첫번째 li맨뒤로 보내기
                    $(this).append($(this).find("li").first()).css({left : "0"})
                })
            } // if
            // (2) 왼쪽 버튼 클릭 시 : 왼쪽에서 들어옴 (left : -100%->0)
            else {
                // 마지막 li 맨앞이동 + 동시에 left : -100% 후 left :0 애니
                tg.prepend(tg.find("li").last()).css({left : "-100%"})
                .animate({left : "0"}, 400);
            } // else
    
            // 3. 배너와 일치하는 블릿에 클래스 "on" 넣기(나머지는 "on" 제거)
            // 대상 : .indic li
            // eq(순번) -> 오른쪽이동 1, 왼쪽이동시 0
            // isB 값으로 오른쪽은 true->1, 왼쪽은 false->0
            // 순서가 바뀌는 슬라이드에 고유 순번속성 data-seq 값을 읽어옴
            $(".indic li").eq(tg.find("li").eq(isB).attr("data-seq")).addClass("on")
            .siblings().removeClass("on")
        }) // abtn click
    }); /////////// JQB
} /// jqFn

// 반복리스트 코드 생성용 컴포넌트
function MakeList(props){ // rec - 개별레코드값(객체형식)
    return(
        <li data-seq={props.idx}>
            <img className="banimg" src={props.rec["src"]} alt="배너"/>
            <section className="bantit">
                <h3>{props.rec["tit1"]}</h3>
                <h2>{props.rec["tit2"]}</h2>
                <p>{props.rec["cont"]}</p>
                <button>{props.rec["btn"]}</button>
            </section>
        </li>
    )
}

// 배너출력용 컴포넌트
function Ban(props){ 
    const sel_data = ban_data[props.cat]
    // sel_data에 담긴값은 data/banner.js의 객체의 배열값
    // props.cat 배너데이터 구분 속성
    return (
        <div className="banner">
            <ul className="slider">
                {
                    sel_data.map((x,i)=><MakeList rec={x} key={i} idx={i}/>)
                }   
            </ul>
            {/* 이동버튼 + 슬라이드 블릿 : 슬라이드가 한장이상일때 적용 */}
            {/* sel_data.length > 1 && 사용 -> sel_data 값이 1개 이상일때만 적용 */}
            {
                // 조건식 && 코드 : 조건식이 true일때 코드출력
                sel_data.length > 1 &&
                <>
                    {/* 양쪽이동버튼 */}
                    <button className="abtn lb">＜</button>
                    <button className="abtn rb">＞</button>
                    {/* 블릿 인디케이터 */}
                    <ol className="indic">
                        {
                            sel_data.map((v,i)=><li className={i==0?'on':''} key={i}></li>)
                        }
                    </ol>
                </>
            }
            {/* JS/jQuery 로드 구역 호출 */}
            { jqFn() }
        </div>
    )
} // Ban 컴포넌트

export default Ban;