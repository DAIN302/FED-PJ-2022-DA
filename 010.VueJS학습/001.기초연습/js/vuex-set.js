// 뷰엑스 스토어 구현 JS

import store from "./store.js"
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
    store, // 뷰엑스 스토어 등록
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
        // 스토어 호출 메서드가 따로 있음 -> store.commit("메서드명, 파라미터값")
        // 1. 메서드명 : 반드시 문자형으로 입력
        // 2. 파라미터 : 단일값 또는 객체형식을 보낼 수 있음
        // 인스턴스 내부구역에 코딩 시 store 앞에 $를 붙이지 않음
        // 단일 데이터일 경우
        // store.commit('initSet', "https://img.freepik.com/premium-vector/city-illustration_23-2147514701.jpg")
        // 전달값이 여러개일 경우
        store.commit('initSet',{
            url : "https://img.freepik.com/premium-vector/city-illustration_23-2147514701.jpg",
            txt : "도시소개에 어서오세요!"
        })
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