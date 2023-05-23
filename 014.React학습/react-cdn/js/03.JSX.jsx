// 03.JSX 특성 알아보기

/*******************************************************************
    [ JSX란 무엇인가? ]
    - Javascript XML을 나타냄
    - 리액트에서 HTML을 쉽게 작성 가능
    - appendChild() 메서드 없이 DOM에 요소넣기 가능
*******************************************************************/

// 1. JSX를 사용한 것과 JSX를 사용하지 않은 것 비교
// (1) JSX를 사용한 예 //////////////////////////
// 넣을 요소
const myele1 = <h1>나는 JSX를 사용하고 있음</h1>;
// 리액트 루트 생성 : createRoot() 메서드 사용
const root1 = ReactDOM.createRoot(document.querySelectorAll("#root>div")[0]);
// 적용하기 : 생성된 루트에 render() 메서드를 붙여서 사용
root1.render(myele1)

// (2) JSX를 사용하지 않는 방법
// 넣을 요소를 createElement() 메서드로 생성해야함(JSX를 쓰지 않고)
const myele2 = React.createElement("h1",{}, "나는 JSX를 사용하지 않음")
// createElement(요소명,{JS코드작성},요소내용)

// 두번째 div요소에 출력
ReactDOM.render(myele2, document.querySelectorAll("#root>div")[1])

/*******************************************************************
    [ 출력방식 정리 ]
    1. 한꺼번에 쓰기
    ReactDOM.render(출력할요소, 출력대상요소)

    2. 따로 쓰기
       1) 생성변수 = ReactDOM.createRoot(출력대상요소) 
       2) 생성변수.render(출력할요소)
    ________________________________________________________________
    [ JSX를 사용하거나 사용하지 않는 경우 ]   
    -> 개발자의 선택사항
    -> JSX는 ES6 기반의 자바스크립트 언어의 확장이며, 
    런타임 시(실제로 실행할때) 일반 자바스크립트로 변환
    _______________________________________________________________
    [ JSX 표현식 ]
    JSX를 사용하면 중괄호의 표현식을 작성 가능
    {.....표현식.....}
    -> 표현식이란? React변수, 속성, JS문법 등의 내용

*******************************************************************/

let num1 = 1000;
let num2 = 7;

// 3. JSX 표현식 사용
const myele3 = <h1>리액트는 {num1*num2}번 사용해도 좋다</h1>;

// 세번째 div요소에 출력
ReactDOM.render(myele3, document.querySelectorAll("#root>div")[2])

/*******************************************************************
    [ JSX 태그요소 작성시 여러줄일 경우 ]
    1. 최상위를 하나 만들고 여러요소를 작성한다!
    2. 소괄호로 전체를 싸준다!(소괄호 생략 가능)

    - 지원되는 스타일:
    1) <>태그들</>
    2) <Fragment>태그들</Fragment>
    3) <기존태그>태그들</기존태그>

    -> 1),2)번은 CDN방식에서는 지원안함!(설치형SPA지원!)
    -> 2)번 CDN에서 사용하려면 아래와 같이 사용한다!
        <React.Fragment></React.Fragment>
    -> 1),2)번을 사용하는 이유는 쓸때 없는 태그삽입을 막는데있다!
    -> 기존태그는 <div>,<section> 등 원래있는 html태그를 말함
        (단점, 원하지 않는 태그가 삽입됨!!!)
*******************************************************************/
// 4. 다중 요소 html 블록 삽입 ///////////
const myele4 = 
    <React.Fragment>
        <h2>[ 다중요소 HTML 블록 출력 ]</h2>
        <ul>
            <li>프론트엔드개발</li>
            <li>리액트적용개발</li>
            <li>뷰JS적용개발</li>
        </ul>
    </React.Fragment>

// 네번째 div요소에 출력
ReactDOM.render(myele4, document.querySelectorAll("#root>div")[3])    

// 5번에는 내가 원하는 태그를 출력해봄
const myData = [
    {idx : "1", name : "달빛술사 쿠키", type :"마법형"},
    {idx : "2", name : "바다요정 쿠키", type :"폭발형"},
    {idx : "3", name : "홀리베리맛 쿠키", type :"방어형"},
    {idx : "4", name : "퓨어바닐라맛 쿠키", type :"치유형"},
    {idx : "5", name : "다크카카오맛 쿠키", type :"돌격형"},
]
// map(value, index, array)을 사용한 태그생성
// map(배열값, 순번, 배열객체전체자신)
// 파라미터 구성은 forEach 메서드와 유사
const clist = myData.map(val=>
        <li>{val.name}:{val.type}</li>
)


const myele5 = 
    <React.Fragment>
        <h1>쿠키리스트</h1>
        <div>
            <ul>{clist}</ul>
        </div>
    </React.Fragment>
// 다섯번째 div 요소에 출력
ReactDOM.render(myele5, document.querySelectorAll("#root>div")[4])    

/*******************************************************************
    [ JSX는 홀로태그라도 끝에 닫기를 해줘야함 ]
    예) <br> -> <br/>
    <input type="text"> -> <input type="text"/>
*******************************************************************/
const myele6 = <input type="text" value="홀로태그는 스스로 닫기" />

ReactDOM.render(myele6, document.querySelectorAll("#root>div")[5])    


/*******************************************************************
    [ JSX는 속성 클래스는 className으로 표기 ]
    <태그 class="클래스명">
    class는 JS에서 키워드이므로 사용못함 대신
    <태그 className="클래스명">
*******************************************************************/
const myele7 = <h1 className="myclass">className으로 class 세팅</h1>

ReactDOM.render(myele7, document.querySelectorAll("#root>div")[6])    


/*******************************************************************
    [ JSX에서 조건문 사용 - if문 ]
    리액트는 if명령문을 지원하지만 JSX 내부에서는 지원X

    JSX에서 조건문을 사용하려면?
    JSX외부에서 if문을 사용하거나 내부에서 삼항연산자를 사용
*******************************************************************/
// JSX외부에서 if문 사용
const x = 1000;
let txt = "이 돈으로 가능"
if(x<10000){
    txt = "돈이 부족해서 안됨"
}

const myele8 = 
<div>
    <h1>현재 내가 가진돈은 {x}원</h1>
    <h1>{txt}</h1>
</div>

ReactDOM.render(myele8, document.querySelectorAll("#root>div")[7])    

// JSX 표현식에 삼항연산자 사용
let time = 8;
const myele9 = (
    <React.Fragment>
        <h1>지금 몇시임? {time}시!</h1>
        <h1>{time>9? "집에 들어와":"더 놀다와"}</h1>
    </React.Fragment>
)

ReactDOM.render(myele9, document.querySelectorAll("#root>div")[8])    

/*******************************************************************

*******************************************************************/
