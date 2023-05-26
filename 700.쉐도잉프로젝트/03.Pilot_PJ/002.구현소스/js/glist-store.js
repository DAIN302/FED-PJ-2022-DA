// 전체 리스트 페이지 뷰엑스 스토어 JS - glist-store.js
// 전체 상품 정보
import gdata from "./gdsdata/glist-items.js";

const store = new Vuex.Store({
    state: {
        // 서브데이터 셋업
        // 전체 상품정보 전역화
        gdata: gdata,
        // 필터 데이터용 배열 변수
        chkarr: [true, true, true],
        // 필터 데이터용 배열입력값 변수
        selnm: ["", "", ""],
        // 페이징용 변수
        pnum: 0,
        // 모어버튼용 변수
        mnum: 0,
        // 모어버튼 표시변수
        mbtn: true,
    }, // state
    // state 변경 메서드 구역
    mutations: {
        // 체크박스 체크시 처리메서드
        resCheck(dt) {
            // 3개의 체크박스 상태 배열 변수 값에 따라 실제 조건에 들어갈 cat명 넣어주기
            // v : 배열값인 true/false 값
            dt.chkarr.forEach((v, i) => {
                if (v) {
                    dt.selnm[i] = i == 0 ? "men" : i == 1 ? "women" : "style";
                    // 조건1?값1:조건2?값2:최종값;
                    // 중첩3항연산자
                } // if 체크박스 체크시
                else {
                    // 무조건 빈값 할당
                    dt.selnm[i] = "";
                } // else 체크박스 체크없을 시
            });
        }, // resCheck
        // 페이징 변수 업데이트 메서드
        updatePaging(dt, pm) {
            dt.pnum = pm;
        }, // updatePaging
        // 모어 변수 업데이트 메서드
        updateMore(dt, pm) {
            // mnum 은 모어 범위수 : += 로 여러번 모어진행
            dt.mnum += pm;
            // 업데이트 후 모어 버튼 없애기
            if (dt.mnum >= 25) dt.mbtn = false;
        }, // updateMore
        ///// [ 장바구니 데이터 업데이트 메서드 ] //////
        setData(dt, pm) {
            // pm 배열데이터 순번
            console.log("구니셋", pm);
            console.log("선택gdata", dt.gdata[pm]);
            console.log(localStorage.getItem("cart"));
            // 1. 로컬스데이터 cart가 없으면 [] 배열형식으로 문자넣기
            if (localStorage.getItem("cart") == null) {
                localStorage.setItem("cart", "[]");
            }
            //console.log(localStorage.getItem("cart"));

            // 2. 로컬스토리지 데이터 가져오기
            // 파싱하여 원래 객체로 복원
            let org = localStorage.getItem("cart");
            org = JSON.parse(org);
            //console.log(org);

            // 이미 선택한 상품일 경우 분기
            let save = true;
            org.forEach((v) => {
                // 같은 데이터인가?(idx값으로 비교)
                // v.idx 는 현재 카트에 있는 아이템 idx
                // dt.gdata[pm].idx 는 입력하려는 새로운 아이템 idx
                if (v.idx == dt.gdata[pm].idx) {
                    alert("이미 선택하신 상품입니다.");
                    save = false;
                }
            });

            // save == true 일때만 배열넣기
            if (save) {
                /*
                    [ 기존 데이터 구조에 컬럼 추가 ]
                    dt.gdata의 데이터 구조
                    {
                        idx : "",
                        cat : "",
                        ginfo : ""
                    }
                    ->여기에 num 항목을 추가하여 개수 데이터 입력
                    {
                        idx : "",
                        cat : "",
                        ginfo : "",
                        num : 
                    }
                    -> 기존객체에 속성추가는 간단
                    객체변수.새항목 = 값
                    dt.gdata[pm].num = 값
                */ 
                // 3. 배열뒤에 밀어넣기
                // 넣기 전에 num 항목 추가
                dt.gdata[pm]["num"] = $("#sum").val();
                // 추가 후 데이터 넣기    
                org.push(dt.gdata[pm]);

                console.log(org)

                // 4. 객체를 문자형으로 변환후 로컬스토리지에 반영
                localStorage.setItem("cart", JSON.stringify(org));
                // console.log(localStorage.getItem("cart"));

                // 5. 카트 애니메이션 버튼을 등장시켜 카트리스트 연동
                this.commit("cartAni", {cnt : org.length, opt : 1});
                // org.length 는 배열데이터 갯수를 넘김
            }
        }, // setData
        //// 장바구니 애니메이션 버튼 생선
        cartAni(dt, pm) { // pm.cnt / pm.opt
            // cnt - 카트아이템 개수, opt - 세팅옵션번호(초기CSS값 선택옵션)
            // opt : 0 - 오른쪽위 작은것 / 1 - 정중앙 큰것
            
            console.log("카트", pm.cnt, pm.opt);

            // 초기 CSS 세팅값 배열
            let icss = [
                {
                    tv : "5%",
                    lv : "80%",
                    wd : "50px",
                },
                {
                    tv : "50%",
                    lv : "50%",
                    wd : "370px",
                },
            ]

            //0.생성된 카트이미지 지우고 시작
            $("#mycart").remove();

            // 1. gif 애니메이션 이미지를 사용하여
            // 화면중앙에 등장하여 장바구니 담김을 알림
            $("body").append(
                `<img id="mycart" src="./images/mycart.gif" title="${pm.cnt}개의 상품이 카트에 있습니다"/>`
            );

            // 추가한 이미지 화면 중앙에 위치
            $("#mycart")
            .css({
                position: "fixed",
                // 변경셋(top, left, width)
                top: icss[pm.opt].tv,
                left: icss[pm.opt].lv,
                width : icss[pm.opt].wd,
                transform: "translate(-50% , -50%)",
                cursor: "pointer",
                zIndex: "999999",
            })
            .delay(3000)
            .animate(
                {
                    top: "5%",
                    left: "80%",
                    width: "50px",
                },
                1000,
                "easeInExpo"
            )
            // 클릭하면 카트 리스트 보이기
            .click(function () {
                // 1.body에 카트리스트 요소 넣기
                // 카트리스트 박스가 없으면 만드리
                if ($("#cartlist").length == 0) {
                    $("body").append(`<section id="cartlist"></section>`);
                    console.log("카트를 만들다!");
                }
                // 2. 로컬스토리지 데이터로 테이블 레코드 태그 구성
                store.commit("bindData", "-60vw");
                
            }); // click
        }, //cartAni
        // 카트 아이템 삭제 메서드
        delRec(dt, pm) {
            //console.log("삭제하셈", pm);
            // 1. 로컬스 데이터 읽기
            let org = localStorage.getItem("cart");
            // 2. 로컬스 데이터 파싱 JSON.parse
            org = JSON.parse(org);
            // 3. 삭제 아이템 찾아서 지우기 : splice(순번, 1)
            org.forEach((v, i) => {
                if (v.idx == pm) {
                    // 지울것인지 물어봄(확인 시 true, 취소 시 false)
                    if (confirm("삭제하시겠습니까?")) {
                        org.splice(i, 1);
                    }
                }
            });
            // 4. 로컬스 문자화하여 넣기 JSON.stringify
            localStorage.setItem("cart", JSON.stringify(org));
            // 5. 리스트 갱신
            store.commit('bindData', "0");
            // 6. 카트버튼 툴팁 문구 업데이트
            if(org.length==0){
                $("#mycart").remove();
                $("#cartlist").remove();
                // 로컬스 데이터 지우기
                localStorage.removeItem("cart");
            }
            else {
                $("#mycart").attr("title", org.length+"개의 상품이 카트에 있습니다")
            }
        }, // delRec
        /// 리스트 바인딩 메서드
        bindData(dt, pm) { // pm - 카트박스 right값 전달
            // (1) 로컬스토리지 데이터 읽어와서 객체화하기
            let org = localStorage.getItem("cart");
            org = JSON.parse(org);
            const chx = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            // (2) 데이터를 이용하여 리스트 태그 만들기
            // forEach((값, 순번)=>{})
            // map((값, 순번)=>{})
            // -> 차이는? map은 리턴값으로 처리할 경우 값을 자동으로 대입연산처리함
            // v-배열의 각 값, i-배열순번
            // forEach는 변수 선언하고 대입연산 처리해서 값을 모아야함
            // map은 변수에 직접할당해도 리턴값을 대입연산처리해줌
            let rec = org.map(
                (v, i) =>
                `<tr>
                    <!-- 상품번호 : 리스트 순서 번호-->
                    <td>${i + 1}</td>
                    <!-- 상품이미지 -->
                    <td>
                        <img src="${
                            "images/goods/" + v.cat + "/" + v.ginfo[0] + ".png"
                        }" style="width:50px" alt="item"/>
                    </td>
                    <!-- 상품명 -->
                    <td>${v.ginfo[1]}</td>
                    <!-- 상품코드 -->
                    <td>${v.ginfo[2]}</td>
                    <!-- 상품단가 -->
                    <td>${v.ginfo[3]}</td>
                    <!-- 상품수량 -->
                    <td>${v.num}</td>
                    <!-- 상품합계 -->
                    <td>${chx(v.ginfo[3].trim().replaceAll(',','').replace('원','')*v.num)}원</td>
                    <!-- 삭제 -->
                    <td>
                        <button class="cfn" data-idx="${v.idx}">×</button>
                    </td>
                </tr>
                `
            );

            // console.log(rec.join(""))
            // 배열.join(구분자) -> 배열을 구분자로 한문자열로 만들어줌
            // 구분자를 빈문자열로 넣으면 사이구분자 없이 합쳐진다
            // 구분자를 생략하면 콤마(,)가 사이에 들어감

            // 총합계 구하기
            
            // 단가 숫자만 남기기
            const pnum = x => x.trim().replaceAll(",","").replace("원","")

            // map()을 써서 각 총합계를 배열로 리턴
            let total = org.map(v=> pnum(v.ginfo[3]) * v.num) 

            // 순회하며 더하기
            let temp = 0;
            total.forEach(v=>temp+=v)

            total = temp;
            console.log("총합계",total, temp)

            // 3.생성된 카트리스트에 테이블 넣기
            $("#cartlist")
                // (1) html 테이블 태그 넣기
                .html(
                    `
                    <a href="#" class="cbtn cbtn2">
                        <span style="display:none">닫기버튼</span>
                    </a>
                    <table>
                        <caption><h1>카트 리스트</h1></caption>
                        <tr>
                            <th>번호</th>
                            <th>상품</th>
                            <th>상품명</th>
                            <th>상품코드</th>
                            <th>단가</th>
                            <th>수량</th>
                            <th>합계</th>
                            <th>삭제</th>
                        </tr>
                        ${rec.join('')}
                        <!-- 총합계 표시 -->
                        <tr>
                            <td colspan="6" style="text-align:right">총 합계 :</td>
                            <td>${chx(total)}원</td>
                            <td></td>
                        </tr>
                    </table>`
            )
            // (2) 카트박스 CSS 설정
            .css({
                position: "fixed",
                top: "0",
                right: pm,//"-60vw",
                width: "60vw",
                height: "100vh",
                backgroundColor: "rgba(255,255,255,0.8)",
                zIndex: "9999999",
            })
            // (3) 등장 애니메이션
            .animate(
                {
                    right: "0",
                },
                800,
                "easeOutQuint"
            )
            // (4) table css 설정
            .find("table")
            .css({
                width: "90%",
                margin: "80px auto",
                fontSize: "14px",
                borderTop: "2px solid #222",
                borderBottom: "2px solid #222",
                borderCollapse: "collapse",
                textAlign: "center",
            })
            //(5) td css 설정
            .find("td")
            .css({
                padding: "10px 0",
                borderTop: "1px solid #aaa",
            })
            //(6) th css 설정
            .parents("table")
            .find("th")
            .css({
                padding: "15px 0",
                backgroundColor: "#e5e5e5",
                fontSize: "16px",
            })
            //(7) caption
            .parents("table")
            .find("caption")
            .css({
                padding: "20px 0",
                textDecoration: "underline",
                textDecorationStyle: "wavy",
                fontSize: "30px",
            });
            //(8) 닫기 버튼 세팅
            $(".cbtn2").click(() => {
                $("#cartlist").animate(
                    {
                        right: "-60vw",
                    },
                    800,
                    "easeOutQuint"
                );
            }); // click
            // (9) 삭제 버튼 처리 연결
            $(".cfn").click(function () {
                store.commit("delRec", $(this).attr("data-idx"));
                // 삭제할 idx 정보를 넘겨줌
            });
        }, // bindData
        // 상세보기 버튼 기능 세팅 메서드
        setBtn(dt, pm){
            // DOM 로딩 후 세팅(DOM로딩 보장)
            // 제이쿼리 로딩구역
            $(()=>{
                const chx = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                // console.log($(".chg_num"))
                $(".chg_num img").click(function(e){
                    // 0. 수량 표시 요소
                    let sum = $("#sum");
                    // 1. 이미지 alt 값 읽어오기
                    let ialt = $(this).attr("alt")
                    // 2. 증가/감소 처리
                    if(ialt==="증가"){ // 증가버튼 클릭
                        sum.val(Number(sum.val())+1);
                        // sum.val() 값이 문자형이라 숫자형으로 형변환 
                        // 더하기를 써서 문자형끼리 더해줄 수 있으므로 숫자형으로 변환해줌
                        // -, *, /는 숫자 대상이라 자동 형변환, +는 문자 더하기도 있어서 기본형이 문자면 자동형변환 안됨
                        //Number()로 형변환해서 숫자계산하게함
                    } 
                    else { // 감소버튼 클릭
                        sum.val(Number(sum.val())-1);
                    }
                    // 0이면 1로 고정
                    if(sum.val()==0) sum.val(1);

                    // 3. 기본금액 * 개수
                    let cnum = $("#gprice").text().trim().replaceAll(",","").replace("원","")*sum.val()

                    // 4. 출력하기
                    $("#total").text(chx(cnum+"원"))
                    
                })
            }) /// JQB
        }, // setBtn
        // 테스트 편의상 로컬스토리지 데이터 지우기
        clearData() {
            // 특정 key값의 데이터만 지움
            localStorage.removeItem("cart");
        }, // clearData
    }, // mutations
});

export default store;
