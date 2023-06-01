// 배너 컴포넌트 Ban.js
// 배너 css
import "./css/ban.css"
// 배너 data
import ban_data from "./data/banner";

// 반복리스트 코드 생성용 컴포넌트
function MakeList(props){ // rec - 개별레코드값(객체형식)
    return(
        <li>
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
                    sel_data.map((x,i)=><MakeList rec={x} key={i}/>)
                }   
            </ul>
        </div>
    )
} // Ban 컴포넌트

export default Ban;