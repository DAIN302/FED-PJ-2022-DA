// 리스트 페이지 JS - list.js

// [ 제이슨 파일 데이터 로컬 스토리지에 넣기 ]
// 1. 변수에 제이슨 파일 문자화하여 불러오기
let jsn =JSON.stringify(mydata);
//console.log(jsn)

// 2. 로컬스토리지 변수를 설정하여 할당
localStorage.setItem("bdata", jsn)

// 3. 로컬스토리지 데이터를 파싱하여 게시판 리스트에 넣기
// 3-1. 로컬스토리지 데이터 파싱
let bdata = JSON.parse(localStorage.getItem("bdata"));
// console.log(bdata)

// 3-2. 게시판 리스트 생성
// let blist = ""; 

// 페이징번호 : 페이지단위별 순서번호 -> 바뀌는 애라서 let
// let pgnum = 1; -> 함수내 전달변수로 처리
// 페이지 단위수 : 한페이지 당 레코드 수 -> 고정되야하므로 const
const pgblock = 10;
// 시작번호 생성 -> (pgnum-1)*pgblock (페이지번호-1)*페이지단위수
// 끝번호 생성 -> pgnum*pgblock 페이지번호*페이지단위수

/***********************************************************************
    함수명 : bindList
    기능 : 페이지별 리스트를 생성하여 바인딩
***********************************************************************/
function bindList(pgnum){
    // 0. 게시판 리스트 생성
    let blist = "";
    // 전체 레코드 개수
    let totnum = bdata.length;
    // 1. 일반형 for문으로 특정 대상 배열 데이터 가져오기
    // 데이터순서 : 번호, 글제목, 글쓴이, 등록일자, 조회수
    for(let i=(pgnum-1)*pgblock; i<pgnum*pgblock; i++) {
        // 마지막 번호 한계값 조건으로 마지막 페이지 데이터 
        // 존재하는 데이터까지만 바인딩
        if(i<totnum) {
            blist += `
                <tr>
                    <td>${bdata[i]["idx"]}</td>
                    <td><a href="view.html?idx=${bdata[i]["idx"]}">${bdata[i]["tit"]}</a></td>
                    <td>${bdata[i]["writer"]}</td>
                    <td>${bdata[i]["date"]}</td>
                    <td>${bdata[i]["cnt"]}</td>
                </tr>          
            `
        } //  if
    } /// for

    // 2. 리스트 코드 테이블에 넣기
    $("#board tbody").html(blist)

    // 3. 페이징블록 
    // 3-1.전체 페이지 번호 수 계산
    // 전체 레코드 수 / 페이지단위수 (나머지 있으면 + 1)
    // 전체 레코드 수 : totnum
    let pgtotal = Math.floor(totnum / pgblock)
    let pgadd = totnum % pgblock;
    console.log(pgadd)

    // 페이징 코드 변수
    let pgcode = "";
    // 3-2. 페이징 코드 만들기
    // 나머지가 있으면 1을 더함
    if(pgadd!=0) pgtotal = pgtotal + 1
    
    // 코드 만들기 포문
    for(let i=1; i<=pgtotal; i++) {
        pgcode +=
        // 페이지번호와 i가 같으면 a링크 생성 X
        pgnum==i?`<b>${i}</b>` : `<a href="#">${i}</a>`;

        // 사이구분자(마지막번호 뒤는 제외)
        if(i!==pgtotal)pgcode += " | "
    } // for

    // 3-3. 페이징코드 넣기
    $(".paging").html(pgcode)

    // 3-5. 이벤트 링크 생성
    $(".paging a").click(function(e){
        // 기본이동막기
        e.preventDefault();
        // 함수 호출
        let num = $(this).text()
        bindList(num)

    })
    
}


///// 로드구역
$(()=>{
    bindList(1);
})