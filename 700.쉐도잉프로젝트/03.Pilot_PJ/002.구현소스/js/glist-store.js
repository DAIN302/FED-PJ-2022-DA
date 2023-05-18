// 전체 리스트 페이지 뷰엑스 스토어 JS - glist-store.js
// 전체 상품 정보
import gdata from "./gdsdata/glist-items.js";

const store = new Vuex.Store({
    state : {
        // 서브데이터 셋업
        // 전체 상품정보 전역화
        gdata : gdata,
        // 필터 데이터용 배열 변수
        chkarr : [true, true, true],
        // 필터 데이터용 배열입력값 변수
        selnm : ["","",""],
        // 페이징용 변수
        pnum : 0,
        // 모어버튼용 변수
        mnum : 0,
        // 모어버튼 표시변수
        mbtn : true,
    }, // state
    // state 변경 메서드 구역
    mutations : {
         // 체크박스 체크시 처리메서드
         resCheck(dt){
            // 3개의 체크박스 상태 배열 변수 값에 따라 실제 조건에 들어갈 cat명 넣어주기
            // v : 배열값인 true/false 값
            dt.chkarr.forEach((v,i) => {
                if(v){
                    dt.selnm[i] = i==0?"men":i==1?"women":"style";
                    // 조건1?값1:조건2?값2:최종값;
                    // 중첩3항연산자
                }// if 체크박스 체크시
                else {
                    // 무조건 빈값 할당
                    dt.selnm[i] = "";
                } // else 체크박스 체크없을 시   
            });
         }, // resCheck
         // 페이징 변수 업데이트 메서드
         updatePaging(dt, pm){
            dt.pnum = pm;
         }, // updatePaging
         // 모어 변수 업데이트 메서드
         updateMore(dt, pm){
            // mnum 은 모어 범위수 : += 로 여러번 모어진행
            dt.mnum += pm;
            // 업데이트 후 모어 버튼 없애기
            if(dt.mnum>=25) dt.mbtn = false;
         }// updateMore

    } // mutations
})

export default store;