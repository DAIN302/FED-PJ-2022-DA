// 뷰 JS 데이터처리 뷰엑스스토어 JS - vuedata-store.js

// 제이슨 데이터 처리를 위한 파일 불러오기
import jsnData from "./goods.json" assert{type:"json"};
/*
    import jsnData from "./goods.json"
    일반 JS호출과 같은 방식으로 제이슨 파일을 호출하면
    아래와 같은 MIME 전송형식 type 에러 발생
    "Filed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "application/json". Strict MIME type checking is enforced for module scripts per HTML spec."
    ________________________________________________
    ((해결방법))
    import 변수 from 제이슨파일경로 assert{type:"json"}
    assert{type:"json"} -> import 시 형식을 지정해주는 객체
    이것으로 제이슨 형식을 맞춰서 전송타입 오류를 없앤다
*/

// 뷰엑스 스토어를 활용한 변수 세팅
// 1. 뷰엑스 스토어 인스턴스 생성
export default new Vuex.Store({
    // (1) 데이터 세팅구역
    state : {
        items : {}, // 제이슨 데이터 담을 변수
    }, /// state 구역
    // (2) 데이터 변경 메서드 구역 : 호출시 commit 사용
    mutations : {
        // 제이슨 데이터 속성 변수 업데이트
        setData(st, pm){ // st- state 변수, pm-전달변수
            // state구역의 items 변수에 제이슨 데이터 담기
            st.items = pm;
            console.log(pm)
        } ///// setData
    },
    // (3) 백엔드 관련 코딩 비동기처리 메서드 구역 : 호출시 dispatch 사용
    actions : {
        // 제이슨 데이터 로드 메서드
        // initData({commit}){ // 액션스 메서드 전달값으로 {commit}을 쓰면 
        initData(){ 
            // 뮤테이션 구역으로 바로 커밋 사용 가능
            // 제이슨 데이터 변수에 할당
            const result = jsnData;
            console.log(result);

            // state의 items변수 변경 메서드 호출
            // mutations의 메서드 호출: commit('메서드', 전달값)
            // commit('setData', result) 
            this.commit('setData', result) 
        }
    }
}) ///// 뷰엑스 인스턴스 /////// 

// export default store;