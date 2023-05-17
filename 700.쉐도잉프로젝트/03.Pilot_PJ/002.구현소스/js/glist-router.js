// 라우터 인스턴스 설정파일 - glist-router.js

// 라우터 템플릿 만들기
let Glist = {
    template : `
    <section>
        <!-- 필터 옵션 체크 박스구역 -->
        <div id="optbx">
            <label for="men">남성</label>
            <input type="checkbox" id="men" v-model="$store.state.chkarr[0]" @change="$store.commit('resCheck')">
            <label for="women">여성</label>
            <input type="checkbox" id="women" v-model="$store.state.chkarr[1]" @change="$store.commit('resCheck')">
            <label for="style">스타일</label>
            <input type="checkbox" id="style" v-model="$store.state.chkarr[2]" @change="$store.commit('resCheck')">
        </div>
        <!-- 상품 리스트 박스 -->
        <div class="grid">
            <div v-for="(v,i) in $store.state.gdata" v-if="v.cat==$store.state.selnm[0]||v.cat==$store.state.selnm[1]||v.cat==$store.state.selnm[2]">
                <img v-bind:src="'./images/goods/'+v.cat+'/'+v.ginfo[0]+'.png'" alt="dress" />
                <aside>
                    <h2>{{v.ginfo[1]}}</h2>
                    <h3>{{v.ginfo[3]}}</h3>
                </aside>
            </div>
        </div>
    </section>
    `
}

/*
    v-model 디렉티브 속성은 요소 자신의 값이
    타겟 값으로 반영되게해준다!
    변경 데이터의 뷰JS의 동기화기능을 확인!
*/

// v-for 에 기술된 v-if 조건에 사이범위를 넣고 store변수로 컨트롤
// 조건 : 인덱스 번호가 1이상 10이하 출력 -> 여기에 일정수를 더함
// 10씩 더하면 다음 범위가 리스트로 정해져서 출력
// v.idx>=1+$store.state.pnum && v.idx<=10+$store.state.pnum
let Paging = {
    template : `    
    <section>
        <!-- 상품 리스트 박스 -->
        <div class="grid">
            <div v-for="(v,i) in $store.state.gdata" v-if="v.idx>=1+$store.state.pnum && v.idx<=10+$store.state.pnum">
                [{{v.idx}}]
                <img v-bind:src="'./images/goods/'+v.cat+'/'+v.ginfo[0]+'.png'" alt="dress" />
                <aside>
                    <h2>{{v.ginfo[1]}}</h2>
                    <h3>{{v.ginfo[3]}}</h3>
                </aside>
            </div>
        </div>
        <!-- 필터 옵션 체크 박스구역 -->
        <div id="paging">
            <a href="#" @click.prevent="$store.commit('updatePaging', 0)">
                1
            </a>|
            <a href="#" @click.prevent="$store.commit('updatePaging', 10)">
                2
            </a>|
            <a href="#" @click.prevent="$store.commit('updatePaging', 20)">
                3
            </a>
        </div>
    </section>
    
    `
}
let More = {
    template : `    
    <section>
        <!-- 상품 리스트 박스 -->
        <div class="grid">
            <div v-for="(v,i) in $store.state.gdata" v-if="v.idx>=1 && v.idx<=10+$store.state.mnum">
                [{{v.idx}}]
                <img v-bind:src="'./images/goods/'+v.cat+'/'+v.ginfo[0]+'.png'" alt="dress" />
                <aside>
                    <h2>{{v.ginfo[1]}}</h2>
                    <h3>{{v.ginfo[3]}}</h3>
                </aside>
            </div>
        </div>
        <!-- 모어 버튼 표시 구역 -->
        <div id="more" v-if="$store.state.mbtn">
            <button class="more" @click.prevent="$store.commit('updateMore', 20)">
             MORE
            </button>
        </div>
    </section>
    `
}
// this.$route.params.cls 
// this : 현재 라우터를 사용하는 뷰인스턴스 자신
// $route : 현재 연결된 라우트 정보 객체
// params : 파라미터 전달 속성
// cls : 내가 만든 파라미터 전달 속성 변수

// 뷰라우터 인스턴스 생성
const router = new VueRouter({
    routes : [
        // 첫번째루트 - 필터 리스트
        {
            path : '/glist',
            component : Glist
        },
        // 두번쨰루트
        {
            path : '/paging',
            component : Paging
        },
        // 두번쨰루트
        {
            path : '/more',
            component : More
        },
    ]

});

export default router;