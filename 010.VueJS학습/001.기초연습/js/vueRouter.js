// 뷰라우터를 위한 뷰인스턴스 생성 JS

// 라우터 세팅 가져오기
import router from "./router.js";

// 뷰라우터에서 사용할 링크 세팅 데이터
const linkData = {
    "세계여행사": { path: "/trip" },
    "세계먹거리": { path: "/foods" },
    "피자": { name: "umsik", params: { item: "피자", cls: "pizza" } },
    "파스타": { name: "umsik", params: { item: "파스타", cls: "pasta" } },
    "똠양꿍": { name: "umsik", params: { item: "똠양꿍", cls: "ddom" } },
};
// 하위 메뉴 구조화 데이터 객체
const linkData2 = {
    "세계여행사": {
        link:{path: "/trip"},
        menu:[]},
    "세계먹거리": {
        link:{path: "/foods"},
        menu : {
            "피자": { name: "umsik", params: { item: "피자", cls: "pizza" } },
            "파스타": { name: "umsik", params: { item: "파스타", cls: "pasta" } },
            "똠양꿍": { name: "umsik", params: { item: "똠양꿍", cls: "ddom" } },
        }
    },
};

// 뷰인스턴스 생성
new Vue({
    el : "#app",
    router,
    // 데이터 영역 
    data : {
        // 외부데이터를 뷰인스턴스 내부 데이터화함
        linkData : linkData2, // 하위 메뉴 데이터로 변경
    },
    // 마운트 구역 만들기
    mounted(){
        this.$router.push('/trip')
        // $router 라우터 전체 객체
        // push(경로) -> 강제로 경로 이동
    },
})