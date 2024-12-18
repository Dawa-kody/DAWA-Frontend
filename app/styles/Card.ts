import styled from "styled-components"

/* 응급처치 방법 카드 */
export const CardContainer = styled.div`
    position: relative;
    width: 280px;
    height: 225px;

    border-radius: 20px;
    background-color: white;
`

/* 카드 화면 */
export const Screen = styled.div`
    position: absolute;
    left: 6.92%;
    right: 6.92%;
    top: 7.84%;
    bottom: 32.94%;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    background-color: #6948ED;
`

export const Emoji = styled.img`
    width: 92px;
    height: 92px;
`

/* 만약 머리가 깨질 듯이 아프다면? - 감기 */
export const CardTitle = styled.span`
    position: absolute;
    left: 7.55%;
    right: 5.35%;
    top: 70.59%;
    bottom: 21.18%;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;

    color: #000000;
`

export const CardTagBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

/* 카드에 적용된 태그 */
export const CardTag = styled.div`
    position: relative;
    height: 20.25px;
    left: 20px;
    top: 190px;

    display: inline-block;

    font-size: 9px;
    font-family: Pretendard;

    padding: 3.5px 10px 0px 10px;
    background: #D4C9FF;
    border-radius: 9px;
`

/* 카드 컴포넌트가 아무것도 없을 때 띄우는 svg */
export const CapsuleSvg = styled.img`
    position: absolute;
    width: 140px;
    height: 97px;

    top: 230px;
    left: 50%;
    transform: translate(-50%, -50%);

    margin: 0;
`

/* 카드 컴포넌트가 아무것도 없을 때 띄우는 span */
export const Notice = styled.span`
    position: absolute;

    top: 310px;
    left: 50%;
    transform: translate(-50%, -50%);

    font-family: Pretendard;
    font-weight: bold;
    font-size: 22px;

    color: #98A2B3;
    margin: 0;
`