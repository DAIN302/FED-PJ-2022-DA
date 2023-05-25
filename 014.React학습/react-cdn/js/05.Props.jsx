// 05.Props JSX

/********************************************************** 
    [ 리액트 Props ]
    1. 리액트 구성요소에 전달되는 인수다!(전달변수)
    2. HTML 속성을 통해서 구성요소에 전달된다
    3. props는 속성이다.
    4. JS 함수에 셋팅되는 전달변수와 HTML속성과 동일함
    5. 컴포넌트로 보내기 위해서는 HTML속성과 동일한 구문사용
**********************************************************/
// 차 소개 컴포넌트1
function Car(props){
    // 일반함수에선 전달변수를 여러개 썼으나
    // 컴포넌트에선 전달하는 props는 하나로 여러개 사용 가능
    // 사용법 : props.속성명
    return (
        <React.Fragment>
            <h2>나의 차는 {props.brand}입니다</h2>
        </React.Fragment>
    )
} /// car 컴포넌트

// 차 소개 컴포넌트2
function Car2(props){
    return(
        <React.Fragment>
            <h2>모델명은 {props.brand.model}이고
                차 색은 {props.brand.color}입니다.</h2>
            <img src="./images/ray.png" alt="레이" style={props.brand.opt}/>
            {/* 인라인 스타일 시트 넣기 형식은 
                <태그 style={{객체형식CSS}} -> 값은 문자형으로 {속성 : 값}*/}
        </React.Fragment>
    )
} // car2

// 위의 두가지 차 소개 컴포넌트를 이용해서 하위 컴포넌트로 구성하여
// 새로운 자동차 브랜드 소개 질문 답변형 컴포넌트를 새롭게 구성

// 차 종류를 물어보고 답하는 컴포넌트 -> Car 컴포넌트 사용
function Brand(){
    return (
        <React.Fragment>
            <h1>당신의 차는 무슨 차입니까?</h1>
            <Car brand="기아레이"/>
            {/* 다른 컴포넌트를 삽입 */}
        </React.Fragment>
    )
} /// Brand

// 차 정보를 자세히 물어보는 컴포넌트 -> Car2 컴포넌트 사용
function Brand2(props){
    // 코드를 여러가지로 return 전에 만들어줌
    // 속성을 객체로 여러개 세팅
    const carInfo = [
        {
            color : "라이트블루", 
            model : "2023-RAY", 
            opt : {width:'500px'}
        },
        {
            color : "그린티라떼", 
            model : "2024-RAY", 
            opt : {filter:'hue-rotate(207deg)'}
        },
    ];
    return (
        
        <React.Fragment>
            <h1>더 자세히 말씀해주시겠어요?</h1>
            <Car2 brand={carInfo[props.num]}/>
        </React.Fragment>
    )
}


ReactDOM.render(
    <div>
        <Brand/>
        <Brand2 num="0"/>
        <Brand2 num="1"/>
    </div>,
 document.querySelector("#root1"));

 // 컴포넌트를 호출 시 속성값으로 객체를 사용하려면 중괄호안에 객체명을 써준다
 // 중괄호는 리액트의 표현식 구역