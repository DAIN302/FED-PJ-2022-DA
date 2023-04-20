// 보그 PJ 카테고리 페이지 JS =  category.js

// 넘어온 url 받기
let pm = location.href
// location.href 이 이퀄 오른쪽에 있으면 url 주소 읽어옴
// 만약 메뉴를 클릭하여 파라미터가 없는 경우 물음표로 구분하여 돌려보내기
if(pm.indexOf("?")===-1) location.href="index.html";
// indexOf("?") -> 물음표가 몇번째에 있는지 알아옴, 없으면 -1

// 문자열 잘라서 값 읽어오기
// 우선 할당한 다음에 값을 담아서 잘라야함
// ?로 잘라서 두번째값, =로 잘라서 두번째값
pm = pm.split("?")[1].split("=")[1];
// pm값 특수문자 복원
pm = decodeURIComponent(pm);


$(()=>{ ///// JQB
    // Vue JS 데이터 바인딩 코드
    const vmCont = new Vue({
        // 대상선정 : 메인컨텐츠 영역
        el : "#cont",
        data : {
            items : {}, // json 데이터 루트에 맞춤
            // 파라미터로 넘어온 값을 경로값과 비교하기 위해 뷰 JS 데이터 변수로 세팅
            catName : pm.replace(" & ", "-")
        },
        mounted : function(){
            // 엑시오스로 제이슨 연결하여 데이터 가져오기
            axios.get("./js/mdata.json").then(x=>this.items=x);

            // 탭메뉴 타이틀 변경
            $("title").prepend(pm+" ");
        }
    }); ///// Vue ///////////////

    // GNB 메뉴 SPA를 위한 재정의
    // -> 뷰JS 인스턴스를 생성하면 대상요소가 기존 JS의 모든 기능 초기화하여 작동 X
    new Vue({
        el : "#gnb",
        data : {

        },
        methods : {
            // 메뉴변경
            chgMenu(e){
                console.log("ㅎㅇ");
                // 컨텐츠 영역의 뷰에 설정된 변수 catName에 접근하여 변수 값 변경
                // vmCont에 인스턴스가 담겼으므로 
                // vmCont.catName 로 접근하여 클릭된 요소의 글자를 읽고 이를 소문자로 변경
                // " & " 를 "-"로 치환만 해주면 됨

                // a요소 문자열 변경
                let txt = e.target.innerText.replace(" & ", "-").toLowerCase();

                // 뷰데이터에 반영 -> 가상돔의 변경 -> 실제 돔반영
                vmCont.catName = txt
                console.log(txt);
                $("title").text(vmCont.catName+" | 2023 보그 코리아 (Vogue Korea)")
            }
        }, ////// methods
    }) /////// GNB Vue

}) ////// JQB
