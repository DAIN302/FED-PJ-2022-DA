// 미니언즈 좀비 탈출 애니 구현 JS - main.js
$(() => {
    /////////// jQB ///////////////////

    // 로딩확인
    // console.log("로딩완료!");

    /*********************************** 
        [ 요구사항정리 ]
        1. 버튼을 클릭하여 미니언즈가
        순서대로 특정위치로 이동하며
        메시지를 보여준다
        2. 각 위치별 좀비를 등장시킨다
        3. 맨윗층에서 탈출할때 헬기를 사용한다

        [ 변경대상 ]
        1. 주인공 미니언즈
        2. 좀비 미니언즈들
        3. 주사기
        4. 헬기

        [ 이벤트와 이벤트대상  ]
        1. 이벤트 : 클릭이벤트
        2. 이벤트대상 : 버튼들
        3. 기능구분 : 버튼글자(지시사항)

    ***********************************/

        // 0. 주인공들 변수에 할당
        // (1) 미니언즈
        const mi = $(".mi");
        // (2) 건물 li
        const bd = $(".building li");
        // (3) 버튼들 
        const btns = $(".btns button");
        // (4) 메세지 박스
        const msg = $(".msg")
        // (5) 좀비, 주사기 요소 변수처리
        let mz1 = `<img src="./images/mz1.png" alt="좀비1" class="mz">`;
        let mz2 = `<img src="./images/mz2.png" alt="좀비2" class="mz">`;
        let zom = `<img src="./images/zom.png" alt="좀비들" class="mz">`;
        let inj = `<img src="./images/inj.png" alt="주사기" class="inj">`;
        // 간판
        let tit = $(".tit")
        

        // 1. 건물 각 방에 번호 넣기 + 좀비/주사기 넣기
        // 대상 bd변수
        // 사용할 제이쿼리 메서드 
        // (1) each((순서, 요소) => {}) : 요소의 개수만큼 순서대로 돌아줌
        // (2) append(요소) : 요소내부에 자식요소 추가(이동)
        bd.each((idx, ele)=>{
            // console.log(idx, ele);
            // 1. 각 방에 숫자로 순번넣기
            $(ele).text(idx)

            // 좀비/주사기 넣기
            switch(idx) {
                case 9 : $(ele).append(mz1); break;
                case 7 : $(ele).append(mz2); break;
                case 2 : $(ele).append(inj); break;
                case 1 : $(ele).append(zom); break;

            }// switch case

            // 좀비 모두 숨기기
            $(".mz").hide();
            // 시간없는 hide()는 display : none된다

        }) // each

        // 2. 버튼 세팅
        btns.hide().first().show()
        // 임시
        // btns.hide().eq(5).show()

        // 3. 공통함수 : actMini()
        // 전달변수 3개
        // (1) ele : 클릭된 버튼 요소
        // (2) seq : 이동할 li방 순번
        // (3) fn : 콜백함수 
        const actMini = (ele, seq, fn) => {
            // 1. 클릭된 버튼 사리지기
            $(ele).slideUp(300);
            // 2. 메세지 없애기 : .msg -> msg변수
            msg.fadeOut(300)

            // 위치 : li 몇번방 -> bd 변수에 있는 모든 li중 몇번
            let room = bd.eq(seq)

            // 4. 위치값 알아내기
            // 위치값 배열 변수
            let pos  = [];

            // top 위치값
            pos[0] = room.offset().top;
            // left 위치값 : 방에서 중앙이동(+li 가로 크기 절반-미니언즈가로크기절반)
            pos[1] = room.offset().left + room.width()/2 - mi.width()/2;
            
            // 제이쿼리 위치값 정보 메서드 : offset() -> 하위 속성 : top, left
            // 제이쿼리 가로, 세로 크기정보 메서드 : width(), height()
            // console.log(room, pos);

            // 4. 미니언즈 이동하기
            // 대상 : mi변수
            mi.animate({
                top : pos[0]+"px",
                left : pos[1]+"px",
            }, 800, "easeOutElastic", fn) // -> 전달된 콜백함수
            
        } // actMini 함수

        // 4. "들어가기" 버튼 클릭 시
        btns.first().click(function(){
            // console.log("들어가셈")
            // 이동 후 콜백 함수
            let fn = () => {
                // 5. 메세지 넣고 나타나기
                msg.html("와! 아늑하당! 옆방으로 가보자").fadeIn(300);
                // console.log(this);
                // 다음 버튼 보이기
                // this 사용 (현재 화살표 함수이기 때문에 이 상위인 btns 가 this로 잡힌다)
                $(this).next().delay(500).slideDown(300)
                // this 키워드 -> 화살표 함수를 사용하여 싸고 있는 요소인 현재 클릭된 버튼을 가리킴
            } // fn 함수

            // 공통함수 호출
            actMini(this, 8, fn)
        }) // 첫번째 버튼(들어가기 버튼) click   

        // 5. "옆방으로" 버튼 클릭 시
        .next().click(function(){
            let fn = () => {
                // 좀비 나타나기(2초 후)
                bd.eq(9).find(".mz").delay(2000).fadeIn(400, ()=>{
                    // 메세지 넣고 나타나기
                    msg.html("악!!!! 좀비당!!! 어서 피하자!")
                    .css({left : "-50%"})
                    .fadeIn(300);
                    // 다음 버튼 보이기
                    $(this).next().delay(500).slideDown(300)
                });

            } // fn 함수
            actMini(this, 9, fn)
        }) // "옆방으로 버튼 끝"

        // 6."윗층으로 도망가!" 버튼 클릭 시
        .next().click(function(){
            let fn = () => {
                // 메세지 보이기
                msg.html(`여긴없겠지?`).fadeIn(300);

                // 좀비보이기
                bd.eq(7).find(".mz").delay(1000).fadeIn(400, ()=>{
                    // 좀비 등장 후 메세지와 버튼
                    // 메세지 변경
                    msg.html(`악! 여기도!!`);
                    // 다음 버튼 보이기
                    $(this).next().delay(500).slideDown(300)
                })

            } // fn 함수
            // 공통함수 호출! 7번방으로
            actMini(this, 7, fn)                
        }) // "윗층으로 도망가" 버튼 끝

        // 7."다시 옆방으로" 버튼 클릭 시
        .next().click(function(){
            let fn = () => {
                // 메세지 보이기
                msg.html(`여긴없겠지?`).fadeIn(200).delay(1000).fadeIn(200,()=>{
                    // 두번째 메세지
                    msg.html(`그래도 무서우니 위층으로 가자!`)
                    // 다음 버튼 보이기
                    $(this).next().delay(500).slideDown(300)                
                })

            } // fn 함수
            // 공통함수 호출! 
            actMini(this, 6, fn)                
        }) // "다시 옆방으로" 버튼 끝

        // 8."무서우니 윗층으로" 버튼 클릭 시
        .next().click(function(){
            let fn = () => {
                // 무.서.워...  메시지
                msg.html(`무`)
                .fadeIn(200)
                .delay(500)
                .fadeIn(200,()=>msg.html(`무.`))
                .delay(500)
                .fadeIn(200,()=>msg.html(`무.서`))
                .delay(500)
                .fadeIn(200,()=>msg.html(`무.서.`))
                .delay(500)
                .fadeIn(200,()=>msg.html(`무.서.워`))
                .delay(500)
                .fadeIn(200,()=>msg.html(`무.서.워.`))
                .delay(500)
                .fadeIn(200,()=>msg.html(`무.서.워..`))
                .delay(500)
                .fadeIn(200,()=>msg.html(`무.서.워...`))
                .delay(500)
                .fadeIn(200,()=>{
                    // 7번방 좀비가 올라와서
                    // 달겨든다!
                    bd.eq(7).find(".mz").animate({// 윗층으로 올라옴
                        bottom : bd.eq(7).height()+"px"
                        // li 높이값 만큼 bottom 올려주기
                    }, 500, "easeOutElastic").delay(500) // 기다림
                    .animate({
                        // 달려들기
                        right : bd.eq(7).width()*1.1+"px"
                    },1000, "easeOutBounce",()=>{
                        // 물린 후 대사
                        msg.html(`악!! 물렸다! 어서 치료주사방으로!!`)
                        // 미니언즈 좀비 이미지 변경(1초후)
                        setTimeout(()=>{
                            mi.find("img").attr("src", "images/mz1.png")
                            .css({filter : "grayscale(100%)"})

                            // 다음 버튼 보이기
                            $(this).next().delay(500).slideDown(300)                
                        },1000)
                    })
                })
            } // fn 함수
            // 공통함수 호출! 
            actMini(this, 4, fn)                
        }) // "무서우니 윗층으로" 버튼 끝

        // 9."치료주사방으로" 버튼 클릭 시
        .next().click(function(){
            let fn = () => {
                // 주사기 돌리기(animate는 transform이 적용이 안됨)
                $(".inj").css({
                    transform : "rotate(-150deg)",
                    transition : ".5s .5s",
                    zIndex : "9999", // 미니언즈보다 위
                })
                // 미니언즈 다시 태어나다(ㅋㅋㅋㅋㅋㅋㅋㅋㅋ)(1초 후)
                setTimeout(()=>{
                    // 이미지 변경
                    mi.find("img").attr("src", "images/m2.png")
                    .css({filter : "grayscale(0)"});
                    // 대사
                    msg.html(`이제 좀만 더 가면 탈출이닷!`).fadeIn(200)

                    // 주사기 없애기
                    $(".inj").hide();
                    
                    // 다음 버튼 보이기
                    $(this).next().delay(500).slideDown(300)                
                },1000)

            } // fn 함수
            // 공통함수 호출! 
            actMini(this, 2, fn)                
        }) // "치료주사방으로" 버튼 끝

        // 10."3번방으로" 버튼 클릭 시
        .next().click(function(){
            let fn = () => {
                // 메세지 보이기
                msg.html(`어서 윗층으로 가자!`).fadeIn(200)

                // 다음 버튼 보이기
                $(this).next().delay(500).slideDown(300)                

            } // fn 함수
            // 공통함수 호출! 
            actMini(this, 3, fn)                
        }) // "3번방으로" 버튼 끝

        // 11."1번방으로" 버튼 클릭 시
        .next().click(function(){
            let fn = () => {
                // 메세지 보이기
                msg.html(`이제 곧 탈출이닷!!`).fadeIn(200)                
                // 다음 버튼 보이기
                $(this).next().delay(500).slideDown(300)                
            } // fn 함수
            // 공통함수 호출! 4번방으로
            actMini(this, 1, fn)                
        }) // "1번방으로" 버튼 끝

        // 12."헬기를 호출" 버튼 클릭 시
        .next().click(function(){
            let fn = () => {
                // 메세지 보이기
                msg.html(`도와줘요!`).fadeIn(200)  
                
                // 1번방의 단체 좀비 등장
                bd.eq(1).find(".mz").fadeIn(300).animate({
                    right : bd.eq(1).width()+"px"
                }, 3000, "easeInExpo")

                // 헬기등장
                $(".heli").animate({
                    left : "20%", // 미니언즈 위치까지 이동
                }, 3200, "easeOutBack", function(){ // 헬기 이동완료 후
                    // 헬기 이미지 변경(this -> .heli)
                    $(this).attr("src", "images/heli2.png");
                    // 원본 미니언즈 사라지기
                    mi.hide();
                }).delay(500).animate({
                    left : "70%"
                }, 4000, "easeInOutCirc", function(){
                    // 끝쪽에서 조종사 좀비로
                    $(this).attr("src", "images/heli3.png")
                }).delay(300).animate({
                    left : "100%" // 아주 천천히 바깥으로 나감
                }, 10000, "linear", ()=>{ // 헬기 나간 후
                    // 간판 떨어뜨리기
                    // 1단계 : 중간까지 떨어짐 -> 간판에 class "on" 주기
                    
                    tit.addClass("on");
                    // 2단계 : 맨 아래까지 떨어짐
                    // 3초 후  간판에 class "on2" 추가
                    setTimeout(()=>{
                        tit.addClass("on2")
                    }, 3000)
                    // 건물 무너뜨리기
                    // 간판 떨어진 후 실행(6초 후)
                    setTimeout(() => {
                        bd.parent().addClass("on")
                        // parent() -> 부모요소인 .building
                    }, 6000);

                    // 추가 구현 : 건물 무너진 후 좀비 하나 올라와 오른쪽으로 사라짐
                    setTimeout(() => {
                        // 건물 기울기 원복
                        bd.parent().attr("style","transform : rotate(0deg) !important")
                        // 애니메이션에 걸린 설정이 더 우선순위가 높기 떄문에 !important 설정
                        bd.eq(9).find(".mz").animate({
                            bottom : "586%"
                        }, 5000).delay(3000).animate({
                            right : "-244%"
                        }, 5000)
                    }, 18000);
                })
            } // fn 함수
            // 공통함수 호출! 
            actMini(this, 0, fn)                
        }) // "헬기를 호출" 버튼 끝 - 모든 버튼 마무리
        // 간판에 마우스 오버시/아웃시 색상 변경
        tit.hover(function(){// 오버시
            $(this).css({
                backgroundColor : "orange"
            })
        }, function(){ // 아웃시
            $(this).css({
                backgroundColor : "pink"
            })
        })




}); /////////////// jQB ////////////////////
