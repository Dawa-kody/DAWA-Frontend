import styled from "styled-components";

/* 카드 컴포넌트 큰 틀 */
export const Container = styled.div`
    position: relative;
    width: 162px;
    height: 152px;
    left: 35px;
    top: 105px;

    display: flex;
    justify-content: center;

    background: #FFFFFF;
    border: 1px solid #E4E7EC;
    border-radius: 10px;
`

/* item(빌린 물건 이름) */
export const ItemName = styled.span`
    position: absolute;
    width: 63px;
    height: 21px;
    left: 12px;
    top: 15px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;

    color: #000000;
`

/* 개수&날짜 묶음 div */
export const ListDiv = styled.div`
    position: absolute;
    width: 79px;
    height: 35px;
    left: 16px;
    top: 56px;
`

/* 날짜 ex)08.27 */
export const Date = styled.span`
    position: absolute;
    width: 43px;
    height: 19px;
    left: 40px;
    top: 17px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 19px;
    /* identical to box height */

    color: #000000;
`

/* 개수 ex)1개 */
export const Number = styled.span`
    position: absolute;
    width: 21px;
    height: 19px;
    top: 17px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 19px;
    /* identical to box height */

    color: #000000;
`

/* 개수 글자 */
export const NumberTitle = styled.span`
    position: absolute;
    width: 21px;
    height: 14px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;

    color: #000000;
`

/* 날짜 */
export const DateTitle = styled.span`
    position: absolute;
    width: 21px;
    height: 14px;
    left: 40px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;

    color: #000000;
`



/* 빌린 물건과 내용 구분선 */
export const Line = styled.div`
    position: absolute;
    width: 137px;
    height: 0px;
    top: 42px;

    border: 1px solid #E4E7EC;
`

/* 아래 포인트 보라색 블럭 */
export const BottomDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 14px;
    bottom: 0px;

    background-color: #D9D6FE;
    border-radius: 0px 0px 10px 10px;
`