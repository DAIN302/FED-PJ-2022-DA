// 쇼핑몰 갤러리 JS - small.js

// 템플릿 html 코드 객체 JS 가져오기
import hcode from "./hcode.js";

    // 뷰 JS 인스턴스 생성용 함수
    const makeVue = (x) => new Vue({ el: x });

    // 1. 제목에 넣을 전역 컴포넌트 만들기
    Vue.component("tit-comp", {
      template: hcode.tit,
    }); // 전역 컴포넌트1 /////

    // 뷰 인스턴스 생성하기 : 반드시 컴포넌트 아래에서 함
    // new Vue({
    //     el:".tit"
    // })
    // new Vue({
    //     el:".tit2"
    // })

    // 숫자증감 변수
    let num = 0;

    makeVue(".tit");
    // makeVue(".tit2");

    // 2. 갤러리 리스트에 넣을 전역 컴포넌트 만들기
    // 여기가 자식
    Vue.component("list-comp", {
      // v-on:click="goPapa" 로 부모이벤트 접근 시작
      template: hcode.list,
      // 부모에서 v-bind:속성명=값 으로 전달한 속성변수를 props:[]/{}로 받음
      props: ["haha", "myseq", "endlet"],
      // props : {"haha":Number}, -> 데이터형 일치
      // props : {"haha":String}, -> 데이터형 오류메시지 출력됨
      // 컴포넌트 내부 변수 세팅
      data: function () {
        return {
          // 1. 상품 이미지 경로
          gsrc: `img_gallery/${this.haha}.jpg`,
          // 2. 상품명
          gname:
            `Sofia23` +
            this.haha +
            this.endlet +
            (this.myseq % 2 ? "💝" : "🌙"),
          // 3. 단위가격(원래 가격)
          gprice: this.insComma(1540 * this.haha) + `원`,
          // 4. 할인된 가격 : 30% 할인
          sale: this.insComma(Math.round((1554 * this.haha)*0.7)) + `원`,
        };
      },
      // 컴포넌트 내부 메서드 세팅
      methods: {
        // 부모 이벤트 호출 전달 : $emit() 메서드 사용
        goPapa() {
          // $emit(부모가 만든 이벤트명)
          this.$emit("hull");
        },
        ovNow() {
          this.$emit("gotkimchi");
          // 부모 요소에 v-on:gotkimchi=메서드명 을 만들어서 사용
        },
        //정규식함수(숫자 세자리마다 콤마해주는 기능)
        insComma(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        // 세일표시여부 리턴메서드
        condiRet() {
          return this.haha==3 || this.haha==11 || this.haha==20 ||
          this.haha==26 || this.haha==31 || this.haha==47 || this.haha==50
        }
      },
    });

    // 리스트 뷰 인스턴스 생성
    // 여기가 부모
    new Vue({
      el: ".grid",
      // 부모 뷰인스턴스 메서드구역
      methods : {
        // 자식 이벤트 전달 후 실행 메서드
        goMsg(){
        //   alert("자식이 부모에게 이벤트 전달 성공");
        },
        ovMsg(){
        //   console.log("갓김치 마시따");
        }
      }
    }); /////// Vue

  // 큰이미지 보기 배경박스 컴포넌트 /////
  Vue.component("win-comp", {
    template : hcode.big
  }) //////////// win-comp 컴포넌트

  ////// win-comp 뷰JS 인스턴스 생성
  new Vue({
    el : "#pbg",
    // DOM이 모두 로딩된 후 실행구역
    mounted : function(){
        // [ 제이쿼리 기능 구현 ]

        // 공유 번호 변수
        let nowNum = 1;
        // 1. 갤러리 리스트 클릭 시 큰이미지박스 보이기
        $(".grid>div").click(function(e){
            e.preventDefault();
            // 1. 클릭된 이미지 경로 읽어오기
            let isrc = $(this).find("img").attr("src");
            

            // 2. 클릭된 이미지 경로를 큰 이미지에 src로 넣기
            $(".gimg img").attr("src", isrc);

            //큰 이미지 보이기
            $("#bgbx").show();

            // 4. 이전/다음 이미지 변경을 위한 data-num 속성 읽기
            nowNum = $(this).attr("data-num");
            console.log(nowNum);

            // 5. 상품명 및 가격 큰 박스에 넣기 
            setVal();
            

        }); //// click

        // 상품명 및 가격 등 데이터 셋업 함수
        function setVal(){
          let tg = $(`.grid>div[data-num=${nowNum}]`)

          // 상품명 큰박스에 넣기
          $("#gtit, #gcode").text(tg.find("h2").text());
          // 상품가격 큰박스에 넣기
          // 세일인 경우와 아닌 경우 나누기
          if(tg.find("h3 span").first().is(".del")) { // 세일일때
            $("#gprice, #total").html(("<small>30% 세일가 </small>"+tg.find("h3 span").last().text()));
          }
          else { // 세일 아닐때
            $("#gprice, #total").text(tg.find("h3 span").first().text());
          }
        } /// setVal

        // 2. 닫기 버튼 클릭 시 큰이미지박스 숨기기
        $(".cbtn").click(function(e){
            e.preventDefault();
            $("#bgbx").hide();
        })

        // 3. 이전/다음 버튼 클릭 시 이미지 변경
        $(".abtn").click(function(e){
            e.preventDefault();
            // 오른쪽버튼 여부
            let isB = $(this).is(".rb")
            // (1)오른쪽 버튼
            if(isB) {
                nowNum++;
                if(nowNum > 50) nowNum=1;
            }
            else {
                nowNum--;
                if(nowNum===0) nowNum=50;
            }

            // 4. 큰 이미지 변경
            $(".gimg img").attr("src", `img_gallery/${nowNum}.jpg`)

            // 5. 값 세팅
            setVal();
        })
    }

  }) // 뷰JS 인스턴스 생성