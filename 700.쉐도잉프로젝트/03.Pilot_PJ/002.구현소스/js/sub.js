// 카테고리 서브페이지 JS - sub.js

// 자동스크롤 기능 함수 가져오기
import menuFn from "./mainjs/menu.js";
// 공통데이터
import comData from "./tempData/data-common.js";
// 서브데이터
import subData from "./tempData/data-sub.js";
// 신상정보
import sinsang from "./gdsdata/sinsang.js";
// 뷰엑스 스토어 JS 가져오기
// 반드시 메인JS파일 한군데서 불러와서 써야 상태관리 됨
// -> 이 JS파일에 Vue 인스턴스 생성코드가 같이 있어야함
import store from "./store.js";

let swiper

// 바로 실행 구역 함수
// 바로 실행 구역 쓰는 이유 : 변수나 명령어를 다른 영역과 구분하여 코딩할 때 주로 사용
// GET방식 데이터를 store에 초기값으로 세팅하는 것을 인스턴스 생성 전에 해야 아래쪽에
// 빈값으로 세팅된 값이 들어가서 에러나는 것을 막을 수 있다.
(()=>{
    let pm;
    // GET방식으로 넘어온 데이터 처리하여 분류별 서브페이지 구성
    // location.href 상단 url 읽어오기
    // indexOf("?")!==-1 물음표가 있으면 
    if(location.href.indexOf("?")!==-1){
        pm = location.href.split("?")[1].split("=")[1];
        // 물음표로 잘라서 뒤의 것, 이퀄로 잘라서 뒤의 것
        // 파라미터 값만 추출
        // pm에 할당이 되었다면 undefined가 아니므로 true
        if(pm) {
            store.commit("chgData", decodeURI(pm))
            // decodeURI() - 변경할 문자열만 변경
            // decodeURIComponent() - url 전체에 섞여 있어도 모두 변환
        }
        // 메뉴를 선택해서 파라미터로 들어오지 않으면 "남성" 세팅
        else {
            store.commit("chgData", "남성");
        }
    }
})();

//########## 서브영역 뷰 템플릿 세팅
// 1. 배너영역
Vue.component("ban-comp", {
    template : subData.banner,
})  ///// 서브영역 Vue component

// 2. 컨텐츠1
Vue.component("cont1-comp", {
    template : subData.cont1,
})  ///// 서브영역 Vue component

// 3. 컨텐츠2
Vue.component("cont2-comp", {
    template : subData.cont2,
})  ///// 서브영역 Vue component

// 4. 컨텐츠3
Vue.component("cont3-comp", {
    template : subData.cont3,
})  ///// 서브영역 Vue component

// 5. 컨텐츠4
Vue.component("cont4-comp", {
    template : subData.cont4,
})  ///// 서브영역 Vue component

// 6. 상세보기
Vue.component("detail-comp", {
    template : subData.detail,
})

//########## 서브영역 뷰 인스턴스 세팅
new Vue({
    el : "#cont",
    store, // 뷰엑스 스토어 등록 필수
    created(){
    }, 
    mounted(){
    }
    
}) //// 서브영역 뷰 인스턴스



//########## 상단영역 메뉴 뷰 템플릿 세팅
// Vue.component(내가지은요소명, {옵션})  
Vue.component("top-comp", {
    template : comData.tareaSub,
})  ///// 상단영역 Vue component

//########## 하단영역 뷰 템플릿 세팅
Vue.component("foot-comp", {
    template : comData.barea,
})  ///// 하단영역 Vue component

// ####### 상단영역 뷰 인스턴스 생성
// new Vue({옵션})
new Vue({
    el : "#top",
    store, // 뷰엑스 스토어 사용하려면 뷰인스턴스에 등록 필요
    data : {},
    // created 실행 구역 : DOM 연결 전 (가상DOM-실제DOM 연결 전)
    created : function() {
        // DOM 연결 전 데이터 가공 작업
        console.log("created구역")
        // 파라미터 변수

    },
    // mounted 실행구역 : DOM 연결 후 실행 (가상DOM-실제DOM 연결 후)
    mounted : function(){
        // 제이쿼리 코드 함수 호출
        console.log("mounted구역")
        
        // 메뉴 기능 함수 호출
        menuFn();   

        // 스와이퍼 함수 호출
        makeSwiper();

        // 부드러운 스크롤
        startSS();

        // 신상품 기능 함수
        sinsangFn();

        // 패럴렉스 기능 함수
        setParallax(".c2", 0.6);

        // 스크롤리빌 플러그인 적용 호출
        $.fn.scrollReveal();

        // 메뉴 클릭 시 전체 메뉴창 닫기
        $(".mlist a").click((e)=>{
            e.preventDefault();
            // 1. 전체 메뉴창 닫기
            $(".ham").trigger('click');
            // 2. 부드러운 스크롤 위치값 업데이트 + 맨위이동
            sc_pos=0;
            $("html, body").animate({scrollTop : "0"},1)
            // 3. 스와이퍼 첫번째 슬라이드로 이동
            swiper.slideTo(0);
            // 첫슬라이드는 0번: 스와이퍼 API 이용
            // 4. 등장액션 스크롤리빌 다시 호출
            $.fn.scrollReveal();
            // 5. URL 강제 변경
            // 변경이유 : SPA 변경 시 전달변수 내용 일치 -> 새로고침 시 현재 변경 로딩
            history.pushState(null,null,"sub.html?cat="+store.state.name)
             /***************************************************** 
                [ history.pushState() 메서드 ]

                1. 브라우저 세션 기록 스택항목 추가메서드
                2. 비동기식으로 작동함(주소이동없이 주소만 업데이트됨!)
                3. 전달값 :
                    history.pushState(상태,사용안됨,URL)

                    (1) 상태 : 새로운 페이지 이동시 popstate가 됨
                    (2) 사용안됨 : 전부터 사용되던 전달값.지금사용안됨
                        보통 (1),(2)는 null로 셋팅함
                    (3) URL : 이 주소는 현재 페이지가 포함된
                        주소 카테고리(폴더)를 기준으로 작성됨

                4. 사용기본폼 : 
                    history.pushState(null,null,"my.html?hi=bye") 
            *****************************************************/
           // 6. 상세보기 박스가 열려있을 수 있으므로 무조건 닫기
           $("#bgbx").hide();


        })
        // $(선택요소).trigger(이벤트) -> 선택요소의 이벤트 강제 발생
        // 참고 JS클릭이벤트 강제발생 document.querySelector(요소).click();

        // GNB 메뉴 클릭 시 해당위치로 스크롤이동 애니메이션
        // 각 .gnb a 에는 href="#c2" 이런식으로 아이디 요소가 있음
        // a요소의 #아이디명 기본 위치이동은 되지만 스크롤이동 애니메이션이 안됨
        // 제이쿼리로 스크롤이동 애니메이션 구현
        $(".gnb a").click(function(e){
            // 1. 기본 이동 막기
            e.preventDefault();
            // 2.클릭된 a요소의 href값 읽어오기
            let aid = $(this).attr("href");
            // 3. 아이디요소 박스 위치구하기
            let newpos = $(aid).offset().top;
            // 4. 애니메이션 이동
            $("html, body").animate({
                scrollTop : newpos + "px"
            }, 600, "easeOutQuint")
            // 5. 부드러운 스크롤 변수에 현재 위치값 업데이트
            sc_pos = newpos

        })
        // 로고 클릭 시 첫 페이지 이동
        $("#logo").click(()=>location.href="index.html");

        // 상품 클릭 시 상세보기 정보 세팅하여 보이기
        $(".flist a").click(function(e){
            // 0. 기본 기능 막기
            e.preventDefault();
            // 1. 클릭된 요소의 부모(li)의 클래스 읽어오기
            let cls = $(this).parent().attr("class")
            // 2. 클릭된 요소의 형제 다음 요소의 정보값 읽어오기
            // split("<br>") br태그로 잘라서 배열에 담음
            let ginfo = $(this).next(".ibox").html().split("<br>")
            // 3. 뷰엑스 스토어 업데이트(리액티브 데이터 반영)
            store.state.cls = cls;
            store.state.gname = ginfo[0];
            store.state.gcode = ginfo[1];
            store.state.gprice = ginfo[2];
            // 4. 슬라이드 애니메이션하여 나타나기
            $("#bgbx").slideDown(400)
        })/// click

        // 상세보기 버튼 닫기 버튼 클릭 시 닫기
        $(".cbtn").click(function(e){
            e.preventDefault();
            $("#bgbx").slideUp(400)
        })

        // 상세보기 썸네일 링크 세팅
        $(".small").click(function(e){
            e.preventDefault();
        })

    }, /// mounted
}) // 상단영역 뷰 인스턴스

// ####### 하단영역 뷰 인스턴스 생성
new Vue({
    el : "#info",
}) // 하단영역 뷰 인스턴스

// 스와이퍼 생성함수
// 스와이퍼 플러그인 인스턴스 생성
function makeSwiper(){
    swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
            delay: 3000, 
            disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });
} //// makeSwiper

// 신상품 기능 구현 함수
function sinsangFn(){
    /*************************************************************************
        함수명 : moveList
        기능 : 신상품 리스트 박스를 연속하여 왼쪽 방향으로 흘러가게 함
    *************************************************************************/
    // 대상 .flist
    const flist = $(".flist");
    // 위치값 변수
    let lpos = 0;
    // 재귀호출 상태값 변수 1 - 호출가능 / 0 - 호출불가
    let call_sts = 0; 
    // 스크롤 시 상태값 변수 1 - 호출가능 / 0 - 호출불가
    let sc_sts = 0;
    // 재귀호출 타임아웃용 변수
    let callT;

    function moveList(){
        // 1. 이동 위치값(left) 감소
        lpos--;
        // console.log(lpos)

        // 2. 한계값 초기화 + 첫번째 요소 맨뒤로 이동
        if(lpos < -300) {
            // 위치값 초기화
            lpos = 0;

            // 첫번째 li 맨뒤로 이동
            flist.append(flist.find("li").first())
        }

        // 3. 이동하기
        flist.css({
            left : lpos + "px"
        })

        // 타임아웃 비우기
        clearTimeout(callT);

        // 재귀호출(비동기 호출 setTimeout)
        // 조건 : call_sts 상태값이 1일때만 호출
        if(call_sts) callT = setTimeout(moveList, 15);

    } ///// moveList 

    // 신상품 이동함수 최초호출
    // moveList();

    // 신상품 리스트에 마우스 오버시 멈춤 / 아웃시 이동
    flist.hover(
        function(){ // over
            call_sts = 0; // 콜백 중단
        },
        function(){ // out
            call_sts = 1; // 콜백허용
            moveList(); // 함수 재호출
    }); // hover

    /****************************************************************
        신상품 리스트 li에 마우스 오버시 정보 보이기
        1. 대상 : .flist li
        2. 정보구분법 : li의 클래스명으로 신상품 정보와 매칭하여 상품 정보박스를
           동적으로 생성하여 애니메이션을 주어 보이게 함
    ****************************************************************/
    flist.find("li").hover(
        function(){ // over 시
            // 1. 클래스 정보 알아내기
            let clsnm = $(this).attr("class");
            // 중간 객체속성명 상위부모박스 #c1의 data-cat 속성값 읽어오기
            let cat = $(this).parents(".c1").attr("data-cat")
            // 2. 클래스 이름으로 세팅된 신장 정보 객체 데이터 가져오기
            let gd_info = sinsang[cat][clsnm];
            // 3. 상품정보박스 만들고 보이게 하기 
            $(this).append(`<div class="ibox"></div>`)
            // .ibox에 상품 정보 넣기
            // ^는 특수문자이므로 정규식에 넣을때 역슬래쉬와 함께씀
            $(".ibox").html(gd_info.replace(/\^/g, "<br>"))
            .animate({
                top : "110%",
                opacity : 1
            }, 300, "easeOutCirc");
        },
        function(){ // out 시
            // ibox 나갈때 지우기
            $(".ibox").remove();
    }) /// hover

    /****************************************************************
         스크롤 위치가 신상품 박스가 보일때만 움직이기
        ****************************************************************/
    // JS의 getBoundingClientRect()의 값과 같은 것
    // 적용박스 offset.top위치값 - scroll바 위치값
    // 1. 대상 요소 위치값
    let tgpos = flist.offset().top;
    // 2. 스크롤 위치 변수
    let scTop = 0;
    // 3. 화면높이값
    let winH = $(window).height();

    // 4. 스크롤 이벤트 함수
    $(window).scroll(function(){
        scTop = $(this).scrollTop()
        // gBCR 값 구하기
        let gBCR = tgpos - scTop;
        // 신상품 리스트 이동/멈춤 분기
        // (1) 이동기준 : gBCR값이 화면 높이보다 작고 0보다 클때
        if(gBCR < winH && gBCR > 0 && sc_sts===0) {
            sc_sts =1;
            call_sts = 1; // 콜백허용
            moveList();
        }
        // (2) 기타 경우 멈춤(조건 : 윈도우 높이보다 크거나 0보다 작고 call_sts===1일때)
        else if((gBCR > winH || gBCR < -300) && sc_sts===1) {
            sc_sts = 0;
            call_sts = 0;
        }

        // 서브 배너 스와이퍼 API를 이용한 작동 멈춤 세팅
        // 기준 : 화면 높이값보다 스크롤위치가 크면 멈춤 작으면 자동 넘김
        
        if(scTop > winH) {
            swiper.autoplay.stop()
        }
        else { 
            swiper.autoplay.start()    
        }


        
    }) //// scroll
} //// sinsangFn

// 패럴렉스 플러그인 적용
function setParallax(ele, speed){
    // 대상 : .c2
    $(ele).parallax("50%",speed)

} ///// setParallax