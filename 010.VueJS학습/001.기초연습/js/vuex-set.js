// 뷰엑스 스토어 구현 JS

import store from "./store.js"



/*************************************************************************
    [ 뷰 라우터 : Vue Router ]
    1. 단일 페이지 어플리케이션을 구축하기 위한 뷰JS 확장 라이브러리
    2. 컴포넌트와 url을 연결해주는 역할
    
    (참고: SPA란?) Single Page Application
    메인과 여러개의 서브 페이지로 구성된 사이트를 단 하나의 페이지에서 변경할 부분만
    업데이트 가능하도록 구현구조를 만들어서 렌더링 속도가 매우 빠르도록 설계된 어플리케이션

    3. 설치 
       (1) CDN 방식 : 상단 호출
       <!-- 뷰JS 라우터 CDN -->
       <script src="https://unpkg.com/vue-router@3.0.1/dist/vue-router.js"></script>

       (2) Vue CLI 방식 : npm 설치
       npm install --save vue-router@3
       -> 설치 후 import 로 사용할 페이지에 패키지 포함시킴(패키지 배포)
       import Vue from 'vue'
       import VueRouter from 'vue-router'
       Vue.use(VueRouter) -> 뷰JS에서 라우터사용 등록 필수

       (3) 뷰 인스턴스 객체 내부에 옵션으로 반드시 등록해줘야 사용 가능
       예) new Vue({
            el: "#app",
            router, -> 등록필수
       })

       참고) router 변수와 옵션 routes 변수명 변경 불가 
       이미 라이브러리에서 변수명 제한함

    4. 버전 : Vue 2.x 버전일 경우 Vue-Router 3.x 버전 사용
    
    5. 내장 컴포넌트 
       (1) <router-view> : 라우트와 일치하는 컴포넌트를 랜더링함
       (2) <router-link> : 라우트 링크를 생성

    6. 전용속성
       (1) $router : VueRouter 인스턴스 자체
           사용예) this.$router
       (2) $route : 매칭된 라우트 정보 객체
           사용예) this.$route

        - 정보종류
        1) fullPath : '/'로 시작하는 전체경로
        2) hash : URL의 '#' 뒤에 연결되는 문자열
        3) matched : 부모 라우트를 포함한 네스트된 모든 라우트 객체배열
        4) meta : 라우트 메타정보
        5) name : 라우트 이름
        6) params : 라우트 매개변수 객체
        7) path : 라우트 경로
        8) query : URL의 '?'에 이어지는 객체정보

    7. 라우터 정의와 옵션
       (1) 일반형
           const router = new VueRouter({
               routes: [
                   {
                       라우트 정의1
                   },
                   {
                       라우트 정의2
                   }
                ]
           })
       (2) 라우터 이름 붙이기
           const router = new VueRouter({
               routes: [
                   {
                       name: '내꺼얌', -> 라우트 이름
                       path: '/goods', -> 매칭 URL 
                       component: Goods -> 연결 컴포넌트
                   }
               ]
           })
                
*************************************************************************/
// 라우터 템플릿 만들기
let Trip = {
    template : `<div class="trip router">World Trip</div>`
}
let Foods = {
    template : `<div class="foods router">World Foods</div>`
}

// 라우터 옵션 값 넣기
// let routes = [{},{}]
let routes = [
    // 첫번째루트
    {
        path : '/trip',
        component : Trip
    },
    // 두번쨰루트
    {
        path : '/foods',
        component : Foods
}]

const router = new VueRouter({
    routes // 위의 라우트 세팅 배열 변수
})

// ******뷰 인스턴스에 스토어를 사용할 수 있게 등록해줘야 함
// 등록법 : new Vue({el:"", store, methods})
// 스토어 변수를 써주면 됨

// [1] 컴포넌트 세팅
// 1. 상단영역 컴포넌트 세팅
Vue.component("top-area", {
    template : `
        <header>
            <ul class="gnb">
                <li><a href="#" v-on:click="chgData('서울')">서울</a></li>
                <li><a href="#" v-on:click="chgData('부산')">부산</a></li>
                <li><a href="#" v-on:click="chgData('제주')">제주</a></li>
            </ul>
        </header>`,
    data(){
        return {
            
        }
    },
    methods : {
        // 스토어 변수 업데이트 메서드
        chgData(pm){
            console.log("업뎃", pm)
            // 이자리에서 바로 스토어 변수 업데이트
            // 1. 이미지 변수 : imgsrc
            store.state.imgsrc = store.state.cityData[pm].이미지
            // 2. 도시 설명 변수 : desc
            store.state.desc = store.state.cityData[pm].설명
        }
    }
})
// 2. 메인영역 컴포넌트 세팅
// 뷰인스턴스 내부 속성에서 전역변수는 $를 붙인다
// 예) 뷰엑스스토어 전역변수는 $store
// 스토어 변수 내부접근은 영역까지 모두 써줌
// 예) $store.state.imgsrc
Vue.component("main-area", {
    // 컴포넌트 영역은 뷰JS에서 해석되는 부분이므로 
    // 뷰엑스 스토어의 변수 store를 전역표시 $store라고 표기해야 유효함
    // 더 정확한 문법은 this.$store라고 써야함
    // 이 파일은 일반 JS에서 실행되므로 변수 할당된 뷰JS 인스턴스가 영역안에서 실행되므로
    // 뷰인스턴스 자신인 this를 쓰지 않아도 자동적으로 this를 적용시켜줌
    template : `
    <main>
        <img v-bind:src="$store.state.imgsrc" alt="지역이미지">
        <p v-text="$store.state.desc"></p>
    </main>
    `,
    data(){
        return {
            
        }
    }
})
// 3. 하단영역 컴포넌트 세팅
Vue.component("info-area", {
    template : `
    <footer>
        <address>서울시 강남구 역삼동 119</address>
    </footer>
    `,
    data(){
        return {

        }
    }
})

// [2] 뷰 인스턴스 생성
// 대상요소 #app
new Vue({
    el : "#app",
    store, // **뷰엑스 스토어 등록
    router, // **라우터 등록
    data : {

    }, 
    methods : {

    },
    //데이터 세팅은 언제하면 좋나?
    // created?(DOM이 생성되기 전에) mounted?(DOM이 생성된 후에) 
    // DOM에 직접 관여하는 데이터가 아니고 순수 데이터일때는 처음 뷰인스턴스가 생성된 후인
    // created 메서드 구역에 세팅
    created(){
        // 스토어에 있는 initSet 메서드 호출 방법
        // 스토어 호출 메서드가 따로 있음 -> store.commit("메서드명", "파라미터값")
        // 1. 메서드명 : 반드시 문자형으로 입력
        // 2. 파라미터 : 단일값 또는 객체형식을 보낼 수 있음
        // 인스턴스 내부구역에 코딩 시 store 앞에 $를 붙이지 않음
        // 단일 데이터일 경우
        // store.commit('initSet', "https://img.freepik.com/premium-vector/city-illustration_23-2147514701.jpg")
        // 전달값이 여러개일 경우
        store.commit('initSet',{
            url : "https://img.freepik.com/premium-vector/city-illustration_23-2147514701.jpg",
            txt : "도시소개에 어서오세요!"
        });
        // actions 메서드 호출 : dispatch("메서드명", 전달값)
        store.dispatch('myAct', "나야나")

    }, //// created
    //제이쿼리는 DOM에 직접 작용하므로 mounted에 구현
    mounted(){
        // 링크 클릭 시 a에 클래스 on추가
        $(".gnb a").click(function(e){
            e.preventDefault();
            $(this).addClass("on").parent().siblings().find("a").removeClass("on");
            showBx();
        })////// click
        function showBx(){
            // 이미지와 설명박스 순서대로 나타나기
            $("main img").hide().delay(500).fadeIn(300);
            $("main p").hide().delay(1000).fadeIn(300);
        }

    } /// mounted
}) //// vue