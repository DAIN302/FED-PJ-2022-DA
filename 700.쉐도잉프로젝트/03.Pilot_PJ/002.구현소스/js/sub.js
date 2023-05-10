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

//########## 서브영역 뷰 템플릿 세팅
Vue.component("ban-comp", {
    template : subData.banner,
})  ///// 서브영역 Vue component

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
        $(".mlist a").click(()=>$(".ham").trigger('click'))
        // $(선택요소).trigger(이벤트) -> 선택요소의 이벤트 강제 발생
        // 참고 JS클릭이벤트 강제발생 document.querySelector(요소).click();
    }
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
            // 2. 클래스 이름으로 세팅된 신장 정보 객체 데이터 가져오기
            let gd_info = sinsang[clsnm];
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