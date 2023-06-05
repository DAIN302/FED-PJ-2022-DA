// index.js는 public/index.html에 적용되는 컴포넌트
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Layout from './dc/Layout';
import "./index.css"
import Characters from './dc/Characters';
import Main from './dc/Main';
import Comics from './dc/Comics';
import Movies from './dc/Movies';
import Games from './dc/Games';
import News from './dc/News';
import Video from './dc/Video';

/*******************************************************************
  [ 리액트 라우터 ]
  -> 컴포넌트를 연결하여 특정 이벤트에 모듈을 변경해주는 중계 역할
  1. <BrowserRouter> - 라우터 Root
  2. <Routes> - 개별 라우터를 묶어주는 역할
  3. <Route> - 개별 라우터
     (속성)
     (1) path : 경로를 지정함(Link의 to속성 경로와 일치)
     (2) element : 연결할 컴포넌트 지정
     (하위라우트 만들기)
     <Route path="/">
      <Route />
      <Route />
      <Route />
     </Route>
  4. 라우터를 구성하는 컴포넌트는 자체적으로 내보내기 세팅을 해야함
  -> export default 라우터 컴포넌트    
*******************************************************************/

// 라우터 구성 컴포넌트 : 스스로 내보내기세팅 필수
// 레이아웃 컴포넌트를 라우터에 입혀서 화면에 출력해야하기 떄문에
// 스스로 내보내기를 세팅하는 것
export default function App(){
  return(
      <BrowserRouter>
        <Routes>
          {/* 죵요!!! : 레이아웃 컴포넌트를 루트로 잡아준다!!!!!  */}
          <Route path="/" element={<Layout/>}>
            {/* 하위라우트 세팅 */}
            {/* path대신 index만 쓰면 첫페이지 */}
            <Route index element={<Main/>} />
            <Route path="ct" element={<Characters/>} />
            <Route path="co" element={<Comics/>} />
            <Route path="mv" element={<Movies/>} />
            <Route path="gm" element={<Games/>} />
            <Route path="nw" element={<News/>} />
            <Route path="vd" element={<Video/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
} /// App 컴포넌트


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
