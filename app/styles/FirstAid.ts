import styled from "styled-components";

/* 큰 컨테이너 */
export const Container = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: center;
`

/* 선생님이 알려주시는 약, 질병 관련 꿀TIPS ~  : 페이지 소개문 */
export const Title = styled.span`
    position: absolute;
    width: 871px;
    height: 60px;
    left: 58px;
    top: 132px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 44px;
    line-height: 60px;
    /* identical to box height */

    color: #000000;
`

/* 증상 키워드 필터 박스 틀 */
export const FilterBoxContainter = styled.div`
    position: absolute;
    width: 1590px;
    height: 120px;
    top: 225px;
    
    border-radius: 16px;
    background-color: white;
`

/* 증상 키워드를 골라보세요 : 필터 키워드 박스 소개문 */
export const KeywordTitle = styled.span`
    position: absolute;
    height: 28px;
    left: 47px;
    top: 14px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 29px;
    display: flex;
    align-items: center;

    color: #98A2B3;

    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
`

/* 필터 요소와 소개문의 구분선 */
export const Line = styled.div`
    position: absolute;
    width: 1515px;
    height: 0px;
    left: 14px;
    top: 53px;
    
    transform: scaleY(0.5);
    border: 1px solid #E4E7EC;
`

/* 카드 컴포넌트 모을 틀 */
export const CardBox = styled.div`
    position: absolute;
    width: 1590px;
    height: auto;
    top: 355px;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 47.5px;
`





