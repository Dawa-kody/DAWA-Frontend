import styled from "styled-components";

/* 방문기록 데이터 컴포넌트 틀 */
export const Container = styled.div`
    position: relative;

    width: 265px;
    height: 255px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: #FFFFFF;
    border: 1px solid #E4E7EC;
    border-radius: 16.5896px;
`;

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
    position: relative;
    width: 60px;
    height: 28px;
    left: 87px;
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
    position: relative;
    width:  230px; /* 부모 기준으로 설정 */
    height: 150px;
    margin: 50px 10px 0 10px;

    font-family: Pretendard;
    font-size: 14px;

    resize: none;
    background-color: white;
`;