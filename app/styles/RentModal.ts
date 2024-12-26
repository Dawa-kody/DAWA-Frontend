import styled from "styled-components";

/* 모달 컨테이너 */
export const ModalContainer = styled.div`
    position: absolute;
    width: 620px;
    height: 438px;
    top: 260px;
    margin-left: auto;
    margin-right: auto;

    background: #FFFFFF;
    border-radius: 10px;
`

/* 배경색 */
export const background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(58, 61, 67, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

/* 보건실 물품 대여하기 : 모달 제목*/
export const Title = styled.span`
    position: absolute;
    width: 248px;
    height: 36px;
    left: 40px;
    top: 29px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 36px;
    /* identical to box height */

    color: #000000;
`

/* 대여할 물품을 선택해주세요. : 서브 타이틀 */
export const SubTitle = styled.span`
    position: absolute;
    width: 223px;
    height: 24px;
    left: 40px;
    top: 68px;

    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    /* identical to box height */

    color: #98A2B3;
`

/* 대여 물품 카드 묶음 div */
export const CardsDiv = styled.div`
    position: relative;
    max-width: 580px;
    height: 195px;
    left: 40px;
    top: 130px;

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
export const RentCard = styled.div`
    width: 150px;
    height: 180px;

    font-family: Pretendard;
    font-size: 22px;
    font-weight: 500;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #D4C9FF;
    border-radius: 16px;

    cursor: pointer;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
`

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