// 달력 생성자함수 /////

MakeDallyeok();

function MakeDallyeok() {
    // 선택함수 ///////
    const qs = x => document.querySelector(x);
    const qsa = x => document.querySelectorAll(x);
    // 메세지
    const cg = x => console.log(x)


    // 1. 변수 세팅
    // (1) 변경할 현재 날짜 객체
    const curr_date = new Date();
    // (2) 오늘 날짜 객체
    const today = new Date();
    // (3) 년도 요소 : .yearTit
    const yearTit = qs(".yearTit");
    // (4) 월 요소 : .monthTit
    const monthTit = qs(".monthTit");
    // (5) 날짜 요소 : .dates
    const dates = qs(".dates");

    // 2. 함수 만들기 ////////////
    // (1) 달력 초기화 구성 함수
    const initDallyeok = () => {
        // getMonth() 정보는 항상 현재달 숫자보다 1작음(배열순번임 0부터 시작)
        // 1. 전달 마지막 날짜(옵션 0) 
        // -> 달력 전달끝쪽 날짜표시
        const prevLast = new Date(curr_date.getFullYear(), curr_date.getMonth(), 0)
        // cg(prevLast);

        // 2. 현재달 첫째 날짜(옵션 1-전달로 세팅) 
        // -> 달력 전달 세팅을 위한 요일 구하기 위해
        const thisFirst = new Date(curr_date.getFullYear(), curr_date.getMonth(), 1)
        // cg(thisFirst);

        // 3. 현재달 마지막 날짜(옵션 0) 
        // -> 현재 달력 날짜 세팅을 위해
        const thisLast = new Date(curr_date.getFullYear(), curr_date.getMonth()+1, 0)
        // cg(thisLast);

        // 4. 년도 표시
        yearTit.innerHTML =  curr_date.getFullYear();

        // 5. 월 표시
        monthTit.innerHTML = addZero(curr_date.getMonth()+1);

        // 6. 날짜 넣을 배열 변수 만들기
        const dset = [];

        // 7. 전달 날짜 앞쪽 채우기
        // 조건 : 현재달 첫날짜 요일이 0이 아니면 내용 있음
        // cg(thisFirst.getDay()); 
        if(thisFirst.getDay()!==0) {
            // for 문 세팅 : 몇바퀴 돌리나? 요일 순번 보다 작을때까지++
            for(let i =0;i<thisFirst.getDay();i++) {
                // cg(i);
                // 반복횟수만큼 배열 앞쪽에 추가
                // 전달 마지막 날짜부터 -> prevLast.getDate()
                dset.unshift(`<span style="color:#ccc;" class="bdt">${prevLast.getDate()-i}</span>`)
                // 마지막 날짜 - i 증가변수 = 1씩 작아지는 숫자추가
                // unshift() 배열앞에 값을 추가하는 메서드 
            } // for
        } // if
        
        // 2. 현재 월 삽입
        // 반복문 구성 : 현재월 1일부터 마지막 날짜까지 반복 배열 추가
        // 현재월 마지막 날짜 : thisLast.getDate()
        for(let i = 1;i<=thisLast.getDate();i++) {
            dset.push(i);
        } // for

        // 3. 다음달 나머지 칸 삽입
        // 반복문 구성 : 1부터 2주 분량 정도
        for(let i=1;i<14;i++) {
            dset.push(`<span style="color:#ccc;" class="bdt">${i}</span>`);
        } // for
        // cg(dset)

        // 화면에 뿌릴 html 변수
        let hcode ="";
        // 4. 날짜 만큼 배열 정보로 세팅
        // 7일 * 6주 => 42일
        for(let i = 0; i<42; i++) {
            // 오늘 날짜 표시
            if(today.getDate()===dset[i]&&
            today.getMonth()===curr_date.getMonth()&&
            today.getFullYear()===curr_date.getFullYear()) {
                hcode += `<div class="date today">${dset[i]}</div>`;
            }
            else{
                hcode += `<div class="date">${dset[i]}</div>`;
            }
        }

        // 5. 코드 화면에 넣기
        // 대상 : .dates
        dates.innerHTML = hcode;

        // 각 날짜 .date 요소에 링크 설정
        qsa(".date").forEach((ele)=>{
            ele.onclick = () => {
                // 년 
                let cyear = yearTit.innerText;
                // 월
                let cmonth = monthTit.innerText;
                // 일
                let cdate = ele.innerText;
                // 클릭한 날짜 데이터
                let comp = cyear + "-" + cmonth + "-" + addZero(cdate);
                console.log(comp);

            }   
        })

    }; //// initDallyeok

    // 0 자릿수 만들기 함수 ///////
    const addZero = x => x < 10?"0"+x:x;
    // 보낸 숫자가 10보다 작으면 앞에 "0"을 붙여서 리턴함

    initDallyeok();

    // (2) 이전달력 출력하기 함수 ///////////////////
    const prevCal = () => {
        // 이전월로 변경하여 initDallyeok() 호출
        // getMonth() 월 가져오기 / setMonth() 월 세팅
        curr_date.setMonth(curr_date.getMonth()-1);
        initDallyeok();
    } /////// prevCal
    
    // (3) 다음달력 출력하기 함수 ///////////////////
    const nextCal = () => {
        // 이전월로 변경하여 initDallyeok() 호출
        // getMonth() 월 가져오기 / setMonth() 월 세팅
        curr_date.setMonth(curr_date.getMonth()+1);
        initDallyeok();
    } /////// nextCal
    
    // 버튼에 클릭 설정 하기
    qs(".btnL").onclick = prevCal;
    qs(".btnR").onclick = nextCal;




} /// MakeDallyeok