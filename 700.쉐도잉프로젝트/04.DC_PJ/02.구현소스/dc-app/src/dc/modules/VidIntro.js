// VidIntro 컴포넌트 JS
import $ from "jquery";
import "../css/vidintro.css"
import vidintro_data from "../data/vidintro"

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
    })// jQB
}// jqFn ////////

function VidIntro(props){
    // 데이터 선택
    // props.cat 해당페이지 데이터 속성명
    const vidData = vidintro_data[props.cat]


    // 링크코드 생성 함수 : desc 데이터 / sum 데이터에서 처리
    const lcode = (data) =>{// data는 desc/sum
        return(
            <>
                {data.split('*')[0]}
                <a href={vidData.link[1]} target="_blank">{vidData.link[0]}</a>
                {data.split('*')[1]}
            </>
        )
    }
    return(
        <>
            <section className={props.cat==="main"?"vidbx":"vidbx subvidbx"}>
                {/* 나는 여기서 삼항연산자를 썼는데 그냥 props 써서 값을 전달하는 방법도 있당 */}
                {/* 썜이 쓴 방법 : className='vidbx'+{props.mm} 이렇게 쓰고 컴포넌트에서 mm="on" */}
                <div className="vid_wrap">
                    {/* 비디오파트 */}
                    <div className="vidbx_video">
                        <iframe src={vidData.vsrc} title={vidData.btit}></iframe>
                    </div>
                    {/* 설명파트 */}
                    <div className="vidbx_desc">
                        <h3>{vidData.stit}</h3>
                        <h2>{vidData.btit}</h2>
                        {
                            vidData.sum.length > 1 &&
                            <>
                                <p>
                                    {vidData.sum.indexOf('*')==-1 ? vidData.sum : lcode(vidData.sum)}
                                </p>
                            </>
                        }
                        <p className="desc">
                            {/* 특수문자(*)여부에 따라 처리 indexOf(문자열) 문자열이 없으면 -1*/}
                            {
                                vidData.desc.indexOf('*')==-1 ? vidData.desc : lcode(vidData.desc)
                            }
                        </p>
                        {/* 링크있을경우표시 */}
                        {
                            // vidData.link.length > 1 &&
                            // <>
                            //     <a href="#">{vidData.link}</a>
                            // </>
                        }
                    </div>
                </div>
            </section>
            {jqFn()}
        </>
    )
}

export default VidIntro;