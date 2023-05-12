// 뷰JS 데이터 처리 JS - vueData.js

import store from "./vuedata-store.js";

// 뷰 컴포넌트 생성
// 이미지 src 속성 바인드 시 (v.idx>50?1:v.idx) 해석 -> idx값이 50초과면 1, 아니면 idx 데이터
// 엑시오스로 가져온 데이터는 {data:{실제 데이터}} 형식으로 한번 더 랩핑하여 들어옴
// 따라서 이 데이터만 사용하려면 $store.state.items.data -> data 속성까지 써줘야 바로 사용 가능
// 반면 뷰엑스 스토어의 actions에서 받은 JSON 데이터는 원본 그대로 할당하여 들어오므로 
// $store.state.items -> 원본 변수를 바로 사용해야함
Vue.component("my-comp", {
    template : `
        <div class="grid">
            <div v-for="(v,i) in $store.state.items">
            <img v-bind:src="'./img_gallery/'+(v.idx>50?1:v.idx)+'.jpg'" alt="dress">
                <aside>
                    <h2>{{v.gname}}</h2>
                    <h3>{{v.gprice}}</h3>
                </aside>
            </div>            
        </div>    
    `,
    data(){
        return {
            myt : "크아아아아아아아"
        }
    }

})


// 뷰 인스턴스 생성
new Vue({
    el : "#app",
    store, // 뷰엑스 스토어 등록 필수
    data : {
        items : [], //json 데이터 담을 변수
        myt : "나야나"
    }, 
    // 뷰인스턴스 생성직후(가상돔/돔 생성전)
    created(){
        // 뷰엑스 스토어 액션스 구역 메서드 initData 호출
        store.dispatch('initData');

        // 엑시오스 사용하여 제이슨 데이터 가져오기
        // axios.get(제이슨파일).then(변수=>담을변수=데이터)
        // axios.get("./js/goods.json").then(x=>store.state.items=x)
        // 스토어의 items 전역변수에 세팅
        console.log(store.state.items)
    },
    mounted(){

    }
})