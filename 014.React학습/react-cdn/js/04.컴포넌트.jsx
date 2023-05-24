// 04. 리액트 컴포넌트 JSX
import Avengers from "./Avengers"
// import시에 CDN에서도 js/jsx 확장자 생략 가능

/*******************************************************************
    [ 리액트 컴포넌트 ]
    - 컴포넌트는 HTML 요소를 반환하는 함수

    [ 특징 ]
    1. 컴포넌트는 독립적이고 재사용이 가능한 코드집합
    2. JS함수와 비슷하지만 HTML코드 반환이 필수라는 점이 다름
    3. 컴포넌트는 다음 2가지로 생성가능
       1) 클래스형 컴포넌트
       2) 함수형 컴포넌트(-> 여기에 집중할 예정)
    -> 클래스형 컴포넌트는 리액트 초중기에 주로 사용되었으나
    React 16.8버전에서 Hooks와 함께는 더 이상 사용되지 않음   
    Hooks는 함수형 컴포넌트에서만 사용 가능 
    _____________________________________________________________
    [ 첫번째 컴포넌트 생성 ]
    - 리액트 컴포넌트 이름은 반드시 첫글자가 대문자로 만들어야함
    (지키지 않으면 적용 X)

    [ 클래스 컴포넌트 ]
    클래스 컴포넌트에서는 extends React.Component 상속문이 포함되어야함
    -> 컴포넌트에서도 메서드 필요
    render() 메서드는 HTML 반환
    (함수형 컴포넌트의 return 키워드 역할)

*******************************************************************/

// [ 클래스형 컴포넌트 생성 ]
class Gogh extends React.Component{
    // render() 메서드 사용
    render(){
        // html 태그 리턴
        return(
            <React.Fragment>
                <h2>안녕! 나는 고흐 그림!</h2>
                <img src="./images/01.png" alt="고흐1"/>
                {/* 홀로태그는 반드시 끝에 닫아줌 */}
            </React.Fragment>
        )
    }
} /// Gogh 컴포넌트

// 렌더링 하기
const root1 = ReactDOM.createRoot(document.getElementById("root1"))
root1.render(<Gogh/>)
// render(출력할요소)
// 출력할요소 -> 클래스를 호출하면 구성된 태그가 들어옴
// 클래스호출법 : <클래스명/>


// [ 함수형 컴포넌트 생성 ]
// 첫글자는 대문자
function IronMan(){
    return(
        <div>
            <h2>Hi! I AM IRONMAN</h2>
            <img src="./images/ab1.jpg" alt="아이언맨" />
        </div>
    )
}

// 렌더링하기
ReactDOM.render(<IronMan/>, document.querySelector("#root2"))

/*******************************************************************
    [ Props 사용 ]
    Props -> Properties(속성들)
    변수에 값을 할당하여 전달하는 방법
    함수의 전달값과 같고 속성으로 컴포넌트에 보냄
    -> Props는 05번에서 자세히 다룰 예정
*******************************************************************/
// 내가 좋아하는 색 표시하기 컴포넌트
function Favorite(props){ // props 는 속성세팅 변수집합, 변수명 다르게 해도 됨
    return (
    <h2>
        내가 좋아하는 색은 {props.color} <br/>
        좋아하는 음식은 {props.food}<br/>
        취미는 {props.hobby}
    </h2>)
} // 컴포넌트

// 좋아하는 색 props 로 전달 가능
ReactDOM.render(<Favorite color="핑크" food="치킨" hobby="겜"/>, document.querySelector("#root3"));

// 컴포넌트 재활용
ReactDOM.render(<Favorite color="하늘색" food="아이스크림" hobby="웹소설읽기"/>, document.querySelector("#root4"));

// 함수 컴포넌트에서는 표현식안에서 {props.호출시사용한속성명}
// 여기서는 {props.color} 이런 형식으로 사용

/*******************************************************************
    컴포넌트 내부에서 다른 컴포넌트 호출 가능
*******************************************************************/
function Who(){
    return(
        <div>
            <h1>김똑팔이 누구임?</h1>
            {/* 다른 컴포넌트 넣기 */}
            <Ans />
        </div>
    )
}

// 컴포넌트 내부에서 호출할 컴포넌트
function Ans(){
    return(
        <h2>김씨가 똑하고 팔이 부러졌대</h2>
    )
}

ReactDOM.render(<Who/>, document.querySelector("#root5"));
/*******************************************************************
    [ 컴포넌트의 파일분리 ]
    리액트는 코드를 재사용하는 것이므로
    컴포넌트를 별도의 파일로 분할 하는것 일반적이다!

    {분할방법}
    1. jsx의 새파일을 생성한다.
    2. 대문자로 시작하는 컴포넌트를 구현한다.
    3. 분할구현된 jsx파일을 import하여 호출한다.

    -> 일반적으로 js파일 상단에 import 키워드로 불러오면
    되는데 지금 사용하는 CDN방식의 바벨모듈에서는
    주의 사항이 있으니 참고 바란다!(아래참고)

    [ 바벨을 사용할때 모듈로 파일 호출시 주의사항! ]
    ___________________________________________

    설치형이 아닌 CDN방식의 바벨은 호출셋업의 시차로
    바로 모듈을 호출하면 에러가 발생한다!
    따라서 모듈을 사용할 파일을 아래와 같은 형식으로
    메인 html 상단에 호출해 줘야만 한다!!!

    -> 상단에 모듈화한 JS를 먼저 불러준다!

    <script src="모듈화한js" 
    data-plugins="transform-es2015-modules-umd" 
    type="text/babel"></script>

    -> 아래쪽에 모듈을 호출하는 JS를 불러준다!

    <script src="모듈을 호출하는 JS" 
    data-plugins="transform-es2015-modules-umd" 
    type="text/babel"></script>

    ->>> 위의 호출 속성 중 기본적으로
    type="text/babel" 은 당연히 해야하고

    ->>> 여기에 더하여 하나의 속성을 추가한다!
    data-plugins="transform-es2015-modules-umd"

    이 속성과 값이 바벨에서 모듈을 사용하게 하는
    es2015 즉 ES6버전에서의 모듈문법을 사용하게끔 해준다!
*******************************************************************/


ReactDOM.render(<Avengers/>, document.querySelector("#root6"));