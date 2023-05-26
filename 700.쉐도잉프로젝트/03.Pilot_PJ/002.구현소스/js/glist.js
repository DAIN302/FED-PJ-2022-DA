// 전체 리스트 페이지 JS

// 메뉴 기능 함수 가져오기
import menuFn from "./mainjs/menu.js";
// 공통데이터
import comData from "./tempData/data-glist.js";
// 전체 리스트용 뷰엑스 스토어 JS 가져오기
import store from "./glist-store.js";
// 전체 리스트용 뷰라우터 JS 가져오기
import router from "./glist-router.js";

// 1. 뷰템플릿
//########## 상단영역 메뉴 뷰 템플릿 세팅
// Vue.component(내가지은요소명, {옵션})  
Vue.component("top-comp", {
    template : comData.tarea,
})  ///// 상단영역 Vue component

//########## 하단영역 메뉴 뷰 템플릿 세팅
Vue.component("foot-comp", {
    template : comData.barea,
})  ///// 하단영역 Vue component


// 2. 뷰인스턴스 생성
new Vue({
    el : ".wrap",
    store, 
    router,
    data : {},
    // 뷰인스턴스 생성 직후 세팅구역
    created(){ // 뷰 데이터 프리세팅
        // 첫번째 라우터 강제실행
        this.$router.push('/glist');
        // push(실행할 뷰라우터 경로)
        // $router 전체 라우터 객체
        // $route 개별 경로 정보 객체
    
        // 최초 체크박스 체크 메서드 실행해야 리스트 나옴
        store.commit('resCheck');
    },
    mounted(){
        menuFn();

        $("#logo").click(() => (location.href = "index.html"));

        // 페이지 로딩 시 로컬스 데이터 cart에 데이터가 있으면 카트 이미지 버튼 출력
        if(localStorage.getItem("cart")!=null){
            let org = localStorage.getItem("cart")
            org = JSON.parse(org)

            // 카트버튼 애니메서드 호출
            store.commit('cartAni', {cnt : org.length, opt : 0})
            // 애니메서드 파라미터
            // cnt - 카트아이템 개수, opt - 세팅옵션번호(초기CSS값 선택옵션)
            // opt : 0 - 오른쪽위 작은것 / 1 - 정중앙 큰것
        }
    }
}) // 뷰 인스턴스

