// 프로그레스 페이지 JS - progress.js

$(()=>{ ////////// JQB
    // 1. 대상선정
    // 1-1. 버튼 : .act button
    const abtn = $(".act button");    
    // 1-2. 퍼센트원 : .btns
    const btns = $(".btns");
    // 1-3. 선형퍼센트바 : .lbar
    const bar = $(".lbar");

    // 2. 이벤트 설정
    // 2-1 첫번째버튼(펭수1) - 퍼센트 원
    // one(이벤트명, 함수) -> 이벤트를 한번만 적용
    abtn.first().one("click",()=>{
        progFn(0,85)
        progFn(1,77)
        progFn(2,48)
        progFn(3,36)
    }); ////// click

    // 2-2 두번째버튼(펭수2) - 선형 퍼센트바
    abtn.last().one("click",()=>{
        // 바텍스트
        const btxt = bar.prev().find("b");
        // 숫자변수
        let num = 0;
        const progBar = () =>{
            // 퍼센트 수치 증가
            num++;
            btxt.text(num);
            // 바 width 증가
            bar.css({width : num+"%"})

            // 재귀호출
            setTimeout(()=>{
                if(num<100) {
                    progBar();
                }
                else {
                    // console.log("음악틀엉")
                    // 페이지에 미리 삽입된 오디오 요소 재생시키기
                    // 비디오/오디오 재생 메서드 : play()
                    // 비디오/오디오 멈춤 메서드 : pause()
                    // 비디오/오디오 요소는 제이쿼리에 get() 메서드를 사용하여 선택
                    // -> get(0) 또는 [0]
                    $("#myaud").get(0).play();
                }
            },10)

            // if(num<100) {
            //     setTimeout(()=>progBar(), 10)
            // }
        }; //// progBar

        // 함수 호출
        progBar();
    }); ////// click
        

    /*************************************************
        함수명 : progFn    
        기능 : 퍼센트 증가에 따른 숫자 및 그래프 변경
    *************************************************/
    
    function progFn(seq, pers){ // seq - 버튼 순번, pers - 설정 %값
        // 개별 숫자 텍스트 읽어오기
        let ptxt = btns.eq(seq).find(".ptxt");
        let num = ptxt.text(); // 문자형 숫자
        //  퍼센트 증가
        num++; // 문자형숫자는 숫자형으로 자동변환됨

        // 개별 숫자 반영
        ptxt.text(num);

        // 300% -> 0% 
        // 300을 최대수로 볼때 백분율로 변경 
        // 계산식 : 최대수 * 적용할%/100 = 결과 %        

        // 계산하기 
        let calc = (300 * (100-num))/100;
        // 계산법 : 전체옵션값 * (100%-현재%)/100
        // 100%-현재%로 계산한 이유는 300에서부터 숫자가 거꾸로 0까지 작아져야 하므로 

        // 첫번째 퍼센트원 진행
        btns.eq(seq).find("circle").css({
            strokeDashoffset : calc + "%"
        })

        // 재귀호출 -> 기준수보다 작을 떄까지
        // 기준수의 숫자가 원하는 %가 됨
        if(num < pers) {
            // 바로 부르기보다 시차두어서 호출하기 위해 setTimeout 사용
            setTimeout(()=>{
                progFn(seq, pers);
            }, 10);
        }
    } /////// progFn

}) /////// JQB ///////