// 어떤 모듈
import $ from "jquery";
import { useEffect, useState } from "react";
import "./css/board.css";
import orgdata from "./data/data.json";

// 컴포넌트에서 제이슨 데이터를 담지 말고 반드시 바깥에서 담을 것
// 초기데이터 처리는 로컬스 'bdata'가 있으면 로컬스를 가져오고
// 없으면 제이슨 데이터를 사용하여 초기화
let org;
if(localStorage.getItem('bdata')) org = JSON.parse(localStorage.getItem('bdata'))
else org = orgdata

// 제이슨 데이터 배열정렬(내림차순: 최신등록순번이 1번)
org.sort((x,y)=>{
    return Number(x.idx) == Number(y.idx) ? 0 : Number(x.idx) > Number(y.idx) ? -1 : 1;
})


// 제이쿼리 로드구역 함수
function jqFn() {
    $(() => {}); // jQB
} // jqFn ////////

/*
    게시판 기능 정의(목록/글쓰기/글보기/수정/삭제)
    1. 글쓰기 버튼은 로그인 한 경우에만 노출
    2. 글쓰기 한 후 저장할 때 로그인한 계정으로 저장
    3. 글보기 모드에서 글 수정 버튼은 해당 글쓴이일때만 노출
    4. 수정 모드에서 삭제 버튼 확인 후 글쓴이일 경우에만 삭제 가능

    [2. 페이지별 기능 버튼]
    1. 목록 : 글쓰기(로그인후) / 글보기는 제목 클릭 시
    2. 글보기 : 글수정버튼/목록버튼
    3. 글수정 : 글수정확인버튼/글삭제버튼(해당계정일때)/목록버튼
*/
function Board() {
    // Hook 변수 구역
    // [ 제이슨 파일 데이터 로컬 스토리지에 넣기 ]
    // 1. 변수에 제이슨 파일 문자화하여 불러오기
    // 상단에서 불러옴
    // 실시간 데이터 변경 관리를 Hook 변수화 하여 처리
    const [jsn, setJsn] = useState(org);

    // 현재로그인 사용자 정보 : 처음에 현재로그에 저장된 정보로
    const [nowmem, setNowmem] = 
    useState(localStorage.getItem("minfo")?JSON.parse(localStorage.getItem("minfo")):'');

    // 게시판 모드별 상태구분 Hook 변수 만들기
    // 모드구분값 : CRUD (Create/Read/Update/Delete)
    // C-글쓰기 / R-글읽기 / U-글수정 / D-삭제(U에 포함)
    // 상태추가 : L-글목록
    const [bdmode, setBdmode] = useState("L");

    // 로그인상태 Hook 변수
    // 상태값 : false - 로그아웃 / true - 로그인
    const [log, setLog] = useState(false);

    // 쓰기버튼 출력여부상태 : 로그인사용자와 글작성자 일치시 true
    const [wtmode,setWtmode] = useState(false);

    // 수정모드에서 현재글 정보 셋팅하기
    const [currItem,setCurrItem] = useState([]);


    // 2. 로컬스토리지 변수를 설정하여 할당
    localStorage.setItem("bdata", JSON.stringify(jsn));

    // 3. 로컬스토리지 데이터를 파싱하여 게시판 리스트에 넣기
    // 3-1. 로컬스토리지 데이터 파싱
    // let bdata = JSON.parse(localStorage.getItem("bdata"));
    // jsn변수에 Hook 상태 처리했으므로 중간 파싱에 불필요함

    // 3-2. 게시판 리스트 생성

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
    function bindList(pgnum) {
        // 0. 게시판 리스트 생성
        let blist = "";
        // 전체 레코드 개수
        let totnum = jsn.length;

        // 내림차순 정렬
        jsn.sort((x,y)=>{
            return Number(x.idx) == Number(y.idx) ? 0 : Number(x.idx) > Number(y.idx) ? -1 : 1;
        })

        // 1. 일반형 for문으로 특정 대상 배열 데이터 가져오기
        // 데이터순서 : 번호, 글제목, 글쓴이, 등록일자, 조회수
        for (let i = (pgnum - 1) * pgblock; i < pgnum * pgblock; i++) {
            // 마지막 번호 한계값 조건으로 마지막 페이지 데이터
            // 존재하는 데이터까지만 바인딩
            if (i < totnum) {
                blist += `
                <tr>
                    <td>${i+1}</td>
                    <td><a href="#" data-idx="${jsn[i]["idx"]}">${jsn[i]["tit"]}</a></td>
                    <td>${jsn[i]["writer"]}</td>
                    <td>${jsn[i]["date"]}</td>
                    <td>${jsn[i]["cnt"]}</td>
                </tr>          
            `;
            } //  if
        } /// for

        // 2. 리스트 코드 테이블에 넣기
        $("#board tbody").html(blist);

        // 3. 페이징블록
        // 3-1.전체 페이지 번호 수 계산
        // 전체 레코드 수 / 페이지단위수 (나머지 있으면 + 1)
        // 전체 레코드 수 : totnum
        let pgtotal = Math.floor(totnum / pgblock);
        let pgadd = totnum % pgblock;
        console.log(pgadd);

        // 페이징 코드 변수
        let pgcode = "";
        // 3-2. 페이징 코드 만들기
        // 나머지가 있으면 1을 더함
        if (pgadd != 0) pgtotal = pgtotal + 1;

        // 코드 만들기 포문
        for (let i = 1; i <= pgtotal; i++) {
            pgcode +=
                // 페이지번호와 i가 같으면 a링크 생성 X
                pgnum == i ? `<b>${i}</b>` : `<a href="#">${i}</a>`;

            // 사이구분자(마지막번호 뒤는 제외)
            if (i !== pgtotal) pgcode += " | ";
        } // for

        // 3-3. 페이징코드 넣기
        $(".paging").html(pgcode);

        // 3-5. 이벤트 링크 생성
        $(".paging a").click(function (e) {
            // 기본이동막기
            e.preventDefault();
            // 함수 호출
            let num = $(this).text();
            bindList(num);
        }); // click

        // 3-6. 링크 페이지 보기
        $("#board tbody td a").click(function(e){
            e.preventDefault();
            // 게시판 상태값 업데이트
            setBdmode('R');
            // 현재 글 번호 고유값(idx) 읽어오기
            let selnum = $(this).attr('data-idx');

            // 원본데이터에서 해당 idx 데이터 찾기
            let seldt = jsn.find(x=>{ if(x.idx == selnum) return true});

            console.log(selnum,seldt);

            // 글쓴이(seldt.writer)와 현재 로그인한이(nowmem.unm)이 같으면 
            // 수정하기 버튼 상태값 true 로 업데이트 아니면 false
            if(seldt.writer === nowmem.unm) setWtmode(true);
            else setWtmode(false);

            $(()=>{
                $(".readone .name").val(seldt.writer);
                $(".readone .subject").val(seldt.tit);
                $(".readone .content").val(seldt.cont);
                console.log(nowmem.unm,seldt.tit);

                // 수정모드로 이동 시 읽기에서 기본 데이터 세팅하여 재사용 목적
                // 글idx, 글쓴이, 제목, 내용
                setCurrItem([seldt.idx,seldt.writer,seldt.tit,seldt.cont])

            });

        }); ///////////// click /////////////


    } // bindList


    // 로그인상태 체크 함수
    const chkLogin = () => {
        // 로컬스에 'minfo'가 있는지 체크
        let chk = localStorage.getItem("minfo");
        if (chk) {
            setLog(true)
        }
        else setLog(false);
        
        // 현재 로그인한 멤버 정보
        if(chk) {
            setNowmem(JSON.parse(chk));
        }
    };




    // 모드 전환 함수
    const chgMode = (e) => {
        e.preventDefault();
        let txt = $(e.target).text();
        console.log(txt);

        if (txt == "Write") {
            setBdmode("C")
            $(()=>{
                $(".writeone .name").val(nowmem.unm);
                $(".writeone .email").val(nowmem.eml);
            })
        }
        else if (txt == "List") setBdmode("L");
        // 글쓰기 모드(C)일 때 실행(Submit)
        else if (txt == "Submit" && bdmode == "C"){
            // 타이틀
            let tit = $(".writeone .subject").val();
            // 내용 
            let cont = $(".writeone .content").val();
            console.log(tit);
            
            // 제목, 내용 빈값 체크
            if(tit.trim()==''|| cont.trim()==''){
                alert("Title and content are required")
            }
            // 통과 시 입력
            else {
                // 날짜데이터처리
                let today = new Date();
                let yy = today.getFullYear();
                let mm = today.getMonth()+1;
                mm = mm<10?"0"+mm:mm
                let dd = today.getDate();
                dd = dd<10?"0"+dd:dd

                // 1. 원본데이터 변수할당
                let orgtemp = jsn;

                // 2. 임시변수에 입력할 객체 데이터 생성 
                let temp = {
                    "idx" : jsn.length+1, // 현재개수 + 1
                    "tit" : tit,
                    "cont" : cont,
                    "att" : "",
                    "date" : `${yy}-${mm}-${dd}`,
                    "writer" : nowmem.unm,
                    "pwd" : nowmem.pwd,
                    "cnt" : "1"
                };

                // 3. 원본임시변수에 데이터 push 하기
                orgtemp.push(temp)

                // 4. Hook 관리변수에 최종 업데이트
                setJsn(orgtemp)

                // 5. 로컬스 변수에 반영
                localStorage.setItem('bdata', JSON.stringify(jsn))


                // 6. 게시판 모드 업데이트
                setBdmode('L')

                // 7. 리스트 바인딩 호출
                bindList(1);

            }

        } // 새로입력
        else if (txt == "Modify") {
            setBdmode("U")

            $(()=>{
                $(".updateone .name").val(currItem[1]);
                $(".updateone .subject").val(currItem[2]);
                $(".updateone .content").val(currItem[3]);
            });

        }
        else if(txt=="Submit" && bdmode=='U'){
            // 1. 제목과 내용을 읽어옴 (고친내용읽기)
            let tit = $(".updateone .subject").val();
            let cont = $(".updateone .content").val();

            // 2. 빈값체크
            if(tit.trim()==''||cont.trim()==''){
                alert("Title and content are required");
            }
            // 3. 빈값이 아니면 해당 데이터 찾아서 값변경
            else{
                // 원본데이터에서 idx값이 일치하는 레코드의 값 변경
                jsn.find(v=>{
                    if(v.idx==currItem[0]){
                        v.tit = tit;
                        v.cont = cont;
                        return true;
                    }
                })

                 // 4. 게시판 모드 업데이트('L')
                 setBdmode('L');

                 // 5. 리스트 바인딩호출
                 bindList(1);
            }
            
        }
        // 수정모드에서 Delete 버튼 클릭 시
        else if(txt=="Delete" && bdmode=='U'){
            if(window.confirm('Are you sure you want to delete it?')){
                // 1.원본데이터에서 해당 항목 레코드를 찾아 삭제
                jsn.find((v,i)=>{
                    if(v.idx==currItem[0]){
                        console.log(v.idx,currItem[0]);
                        jsn.splice(i,1);
                        return true; // 필수 그래야 끝내고 나간다 안하면 에러난다
                    }
                })
                 // 2. 게시판 모드 업데이트('L')
                 setBdmode('L');

                 // 3. 리스트 바인딩호출
                 bindList(1);
            }
        }

        // 리스트 태그 로딩구역에서 일괄호출
        // 리스트 태그가 출력되었을때 적용
        $(() => bindList(1));
    };
    // 5. 수정모드에서 Submit 버튼 클릭 시 

    const callFn = () => {
        // 리스트 상태일때만 호출
        if (bdmode == "L") bindList(1);
        // 로그인상태 체크함수 호출
        chkLogin();
    };

    useEffect(callFn, []);

    return (
        <>
            {/* 모듈코드 */}
            {/* 1. 게시판 리스트 : 게시판 모드 'L' 일때 출력 */}
            {bdmode == "L" && (
                <table className="dtbl" id="board">
                    <caption>OPINION</caption>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Title</th>
                            <th>Writer</th>
                            <th>Date</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5">There is no data.</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5" className="paging"></td>
                        </tr>
                    </tfoot>
                </table>
            )}
            {/* 2. 글쓰기 테이블 : 게시판 모드 'C' 일때만 출력 */}
            {bdmode == "C" && log && (
                <table className="dtblview writeone">
                    <caption>OPINION : Write</caption>
                    <tbody>
                    <tr>
                        <td width="100">Name</td>
                        <td width="650">
                            <input type="text" className="name" size="20" readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="text" className="email" size="40" readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td>
                            <input type="text" className="subject" size="60" />
                        </td>
                    </tr>
                    <tr>
                        <td>Content</td>
                        <td>
                            <textarea
                                className="content"
                                cols="60"
                                rows="10"
                            ></textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
            )}
            {/* 3. 읽기 테이블 : 게시판 모드 'C'일때만 출력 */}
            {
                bdmode == 'R' &&
                <table className="dtblview readone">
                    <caption>OPINION : Read</caption>
                    <tbody>
                        <tr>
                            <td width="100">
                                Name
                            </td>
                            <td width="650">
                                <input type="text" className="name" size="20" readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Title
                            </td>
                            <td>
                                <input type="text" className="subject" size="60" readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Content
                            </td>
                            <td>
                                <textarea className="content" cols="60" rows="10" readOnly></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
            {/* 4. 수정(삭제) 테이블 : 게시판 모드 'U'일때만 출력 */}
            {
                bdmode == 'U' &&
                <table className="dtblview updateone">
                    <caption>OPINION : Modify</caption>
                    <tbody>
                        <tr>
                            <td width="100">
                                Name
                            </td>
                            <td width="650">
                                <input type="text" className="name" size="20" readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Title
                            </td>
                            <td>
                                <input type="text" className="subject" size="60" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Content
                            </td>
                            <td>
                                <textarea className="content" cols="60" rows="10"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
            <br />
            <table className="dtbl btngrp">
                <tbody>
                    <tr>
                        <td>
                            {
                                // 리스트모드(L) : 글쓰기 버튼
                                bdmode == "L" && log && (
                                    <>
                                        <button onClick={chgMode}>
                                            <a href="#">Write</a>
                                        </button>
                                    </>
                                )
                            }
                            {
                                // 글쓰기모드(C) : 서브밋 + 리스트 버튼
                                bdmode == "C" && (
                                    <>
                                        <button onClick={chgMode}>
                                            <a href="#">Submit</a>
                                        </button>
                                        <button onClick={chgMode}>
                                            <a href="#">List</a>
                                        </button>
                                    </>
                                )
                            }
                            {
                                // 읽기모드(R) : 리스트
                                bdmode == "R" && (
                                    <>
                                        <button onClick={chgMode}>
                                            <a href="#">List</a>
                                        </button>
                                    </>
                                )
                            }
                            {
                                // 읽기모드(R) : 수정모드버튼
                                bdmode == "R" && wtmode && (
                                    <>
                                        <button onClick={chgMode}>
                                            <a href="#">Modify</a>
                                        </button>
                                    </>
                                )
                            }
                            {
                                // 수정모드(U) : 서브밋 + 리스트 + 삭제버튼
                                bdmode == "U" && (
                                    <>
                                        <button onClick={chgMode}>
                                            <a href="#">Submit</a>
                                        </button>
                                        <button onClick={chgMode}>
                                            <a href="#">List</a>
                                        </button>
                                        <button onClick={chgMode}>
                                            <a href="#">Delete</a>
                                        </button>
                                    </>
                                )
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* 빈루트를 만들고 JS로드함수포함 */}
            {jqFn()}
        </>
    );
}

export default Board;
