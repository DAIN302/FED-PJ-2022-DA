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
         },// updateMore
         ///// [ 장바구니 데이터 업데이트 메서드 ] //////
         setData(dt, pm){ // pm 배열데이터 순번
            console.log("구니셋", pm)
            console.log("선택gdata", dt.gdata[pm])
            console.log(localStorage.getItem("cart"));
            // 1. 로컬스데이터 cart가 없으면 [] 배열형식으로 문자넣기
            if(localStorage.getItem("cart")==null){
                localStorage.setItem("cart", "[]")
            }
            console.log(localStorage.getItem("cart"));

            // 2. 로컬스토리지 데이터 가져오기
            // 파싱하여 원래 객체로 복원
            let org = localStorage.getItem("cart");
            org = JSON.parse(org);
            console.log(org)
            
            // 3. 배열뒤에 밀어넣기 
            org.push(dt.gdata[pm])
            console.log(org)

            // 4. 객체를 문자형으로 변환후 로컬스토리지에 반영
            localStorage.setItem("cart", JSON.stringify(org))
            console.log(localStorage.getItem("cart"));

            // 5. 카트 애니메이션 버튼을 등장시켜 카트리스트 연동
            this.commit('cartAni', org.length)
            // org.length 는 배열데이터 갯수를 넘김

        }, // setData
        //// 장바구니 애니메이션 버튼 생선
        cartAni(dt, pm){
            console.log("카트", pm)

            //0.생성된 카트이미지 지우고 시작
            $("#mycart").remove()

            // 1. gif 애니메이션 이미지를 사용하여 
            // 화면중앙에 등장하여 장바구니 담김을 알림
            $("body").append(`<img id="mycart" src="./images/mycart.gif" title="${pm}개의 상품이 카트에 있습니다"/>`)

            // 추가한 이미지 화면 중앙에 위치
            $("#mycart").css({
                position : "fixed",
                top : "50%",
                left : "50%",
                transform : "translate(-50% , -50%)",
                cursor : "pointer",
                zIndex : "9999999999999"
            }).delay(3000).animate({
                top : "5%",
                left : "80%",
                width : "50px"
            }, 1000, "easeInExpo")
            // 클릭하면 카트 리스트 보이기
            .click(function(){
                // body에 카트리스트 요소 넣기
                $("body").append(`<section id="cartlist"></section>`);
                // 생성된 카트리스트에 테이블 넣기
                $("#cartlist").html(`<a href="#" class="cbtn cbtn2">×</a>
                    <table>
                        <caption><h1>카트 리스트</h1></caption>
                        <tr>
                            <th>번호</th>
                            <th>상품명</th>
                            <th>상품코드</th>
                            <th>단가</th>
                            <th>수량</th>
                            <th>합계</th>
                            <th>삭제</th>
                        </tr>
                    </table>`)
            })


        } 

    } // mutations
})

export default store;