import styled from "styled-components";

/* 방문기록 데이터 컴포넌트 틀 */
export const Container = styled.div`
    box-sizing: border-box;
    position: relative;

    width: 265px;
    height: 255px;
    left: 35px;
    top: 100px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: #FFFFFF;
    border: 1px solid #E4E7EC;
    border-radius: 16.5896px;
`

/* 날짜 ex) 08.27 */
export const Date = styled.span`
    position: absolute;
    width: 69px;
    height: 30px;
    left: 14.59px;
    top: 20px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    /* identical to box height */

    color: #000000;
`

/* 날짜 요일 */
export const Week = styled.div`
    position: absolute;
    width: 60px;
    height: 28px;
    left: 188px;
    top: 22px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: Pretendard;
    font-size: 13px;
    font-weight: 400;

    background: #F2F4F7;
    border-radius: 10px;
`

/* 내용 칸 표시 줄 */
export const ContentLine = styled.div`
    position: absolute;
    width: 230px;
    height: 0px;
    top: 63px;

    transform: scaleY(0.5);
    border: 1.65896px solid #E4E7EC;
`

/* 내용 적는 곳 */
export const ContentBox = styled.textarea`
    position: absolute;
    width: 230px;
    height: 150px;
    top: 80px;

    font-family: Pretendard;
    font-size: 14px;

    resize: none;
    background-color: white;
`
