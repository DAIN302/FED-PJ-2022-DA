// 쇼핑몰 갤러리 JS - small.js

    // 뷰 JS 인스턴스 생성용 함수
    const makeVue = (x) => new Vue({ el: x });

    // 1. 제목에 넣을 전역 컴포넌트 만들기
    Vue.component("tit-comp", {
      template: `
                <strong>
                    <span>🌟쇼핑몰🌟</span><br>
                    🌟Shopping Mall🌟
                </strong>
            `,
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
      template: `
                <div>
                    <img v-bind:src="gsrc" v-on:click="goPapa" v-on:mouseover="ovNow" alt="dress" >
                    <aside>
                        <h2 v-text="gname"></h2>
                        <h3>{{gprice}}</h3>
                    </aside>
                </div>
            `,
      // 부모에서 v-bind:속성명=값 으로 전달한 속성변수를 props:[]/{}로 받음
      props: ["haha", "myseq", "endlet"],
      // props : {"haha":Number}, -> 데이터형 일치
      // props : {"haha":String}, -> 데이터형 오류메시지 출력됨
      // 컴포넌트 내부 변수 세팅
      data: function () {
        return {
          gsrc: `img_gallery/${this.haha}.jpg`,
          gname:
            `Sofia23` +
            this.haha +
            this.endlet +
            (this.myseq % 2 ? "💝" : "🌙"),
          gprice: this.insComma(1554 * this.haha) + `원`,
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
    template : `
        <!-- 큰이미지 배경박스 -->
        <div id="bgbx">
            <!-- 오른쪽버튼 -->
            <a href="#" class="abtn rb">
                <span class="ir">오른쪽버튼</span>
            </a>
            <!-- 왼쪽버튼 -->
            <a href="#" class="abtn lb">
                <span class="ir">왼쪽버튼</span>
            </a>
            <!-- 닫기버튼 -->
            <a href="#" class="cbtn">
                <span class="ir">닫기버튼</span>
            </a>
            
            <!-- 큰이미지 박스 -->
            <div id="imbx">
                <!-- 큰 이미지 -->
                <img src="img_gallery/50.jpg" alt="큰 이미지">
                <!-- 이미지 설명 -->
                <h4></h4>
            </div>
        </div>
    `
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
            $("#imbx img").attr("src", isrc);

            //큰 이미지 보이기
            $("#bgbx").show();

            // 4. 이전/다음 이미지 변경을 위한 data-num 속성 읽기
            nowNum = $(this).attr("data-num");
            console.log(nowNum);


            // let isrcNum = $("#imbx").find("img").attr("src").split("/")[1].split(".")[0];
            // // 오른쪽 (다음) 버튼 클릭 시
            // $(".rb").click(function(){
            //     isrcNum++;
            //     if(isrcNum > 50) isrcNum=1;
            //     $("#imbx img").attr("src", `img_gallery/${isrcNum}.jpg`);
            // })
            
            // // // 왼쪽 (이전) 버튼 클릭 시
            // $(".lb").click(function(){
            //     isrcNum--;
            //     console.log(isrcNum);
            //     if(isrcNum === 0) isrcNum=50;
            //     $("#imbx img").attr("src", `img_gallery/${isrcNum}.jpg`);
            // })
        }); //// click

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
            $("#imbx img").attr("src", `img_gallery/${nowNum}.jpg`)
        })
    }

  }) // 뷰JS 인스턴스 생성