// 메뉴 버튼 모듈
import $ from "jquery";
import "./css/menubtn.css"
import menu_data from "./data/menubtn";
import { Link } from "react-router-dom";

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
        $(".btnbx").click(function(){
            
        })
    })// jQB
}// jqFn ////////

function MenuList(props){
    return(
        <>
            <div>
                <div className="imbx">
                    <img src={props.menu["isrc"]} alt="로고" />
                </div>
                <div className="titbx">
                    <h3>{props.menu["tit"].split("^")[0]}</h3>
                    <h2>{props.menu["tit"].split("^")[1].toUpperCase()}</h2>
                </div>
                <div className="btnbx">
                    <button>
                        <Link to={props.menu["link"]}>
                            {props.menu["btn"].toUpperCase()}
                        </Link>
                    </button>
                </div>
            </div>
        </>
    )
}

function MenuBtn(){
    const menubtn_data = menu_data
    return(
        <>
            <section className="menubtn">
                {
                    menubtn_data.map((x,i)=><MenuList menu={x} key={i}/>)
                }
                {/* <div>
                    <div className="imbx">
                        <img src={props.img} alt="로고" />
                    </div>
                    <div className="titbx">
                        <h3>{props.stit}</h3>
                        <h2>{props.btit}</h2>
                    </div>
                    <div className="btnbx">
                        <button>{props.btn}</button>
                    </div>
                </div> */}
            </section>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            { jqFn() }
        </>
    )
}

export default MenuBtn;