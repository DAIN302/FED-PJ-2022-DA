// 회원 관련 기능 함수 - fnMem.js

// [ 로컬스토리지 초기체크 세팅 ]
const initData = () => {
    // 만약 로컬스토리지 "mem-data"가 null이면 만들어준다
    if(localStorage.getItem("mem-data")===null) {
        localStorage.setItem("mem-data", `
            [
                {
                    "idx" : "1",
                    "uid" : "dada",
                    "pwd" : "1111",
                    "unm" : "dada",
                    "eml" : "ddddd@naver.com"
                }
            ]
        `)
    }
}

export default initData;