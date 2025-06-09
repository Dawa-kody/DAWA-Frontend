import styled from "styled-components";

/* 대여 물품 카드 묶음 div */
export const CardsDiv = styled.div`
    position: relative;
    max-width: 580px;

    display: flex;
    flex-direction: row;
    gap: 15px;

    overflow: scroll;
    overflow-y: hidden;

    &::-webkit-scrollbar {
    height: 8px; /* 수평 스크롤 높이 */
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #D9D9D9;
    }
`

/* 대여 물품 카드 */
export const RentCard = styled.div<{ Click: boolean }>`
    width: 150px;
    height: 180px;
    font-family: Pretendard;
    font-size: 22px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${({ Click }) => (Click ? "#6948ED" : "#E4E7EC")};
    border-radius: 16px;
    cursor: pointer;

    position: relative;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
`;

export const ControlButtons = styled.div`
    display: flex;
    gap: 8px;
    position: absolute;
    bottom: 30px;

    button {
        width: 30px;
        height: 30px;
        border-radius: 5px;
        border: none;

        font-weight: bold;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: #ddd;
        }
    }

    span {
        font-size: 18px;
        font-weight: bold;
        color: #000;
    }
`;

/* 확인 버튼 */
export const submitbutton = styled.button`
    position: relative;
    width: 99px;
    height: 50px;
    left: 486px;
    top: 169px;
    background-color: #6948ED;
    border-radius: 5px;

    font-family: Pretendard Variable;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;

    color: #FFFFFF;
`

/* 취소 버튼 */
export const canclebutton = styled.button`
    position: relative;
    width: 99px;
    height: 50px;
    left: 271px;
    top: 169px;
    background-color: #F2F4F7;
    border-radius: 5px;

    font-family: Pretendard Variable;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;

    color: #000000;

`