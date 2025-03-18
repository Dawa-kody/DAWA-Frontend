import styled from "styled-components";

export const RequestRentDataContainer = styled.div`
    position: relative;
    width: 162px;
    height: 152px;

    display: flex;
    justify-content: center;

    background: #FFFFFF;
    border: 1px solid #E4E7EC;
    border-radius: 10px;
`

export const item = styled.span`
    position: absolute;
    top: 18px;
    left: 17px;

    font-family: Pretendard;
    font-size: 17px;
    font-weight: 800;
`

export const count = styled.span`
    position: absolute;
    top: 19px;
    right: 17px;

    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
`

export const line = styled.div`
    position: absolute;
    top: 52px;
    width: 131px;
    height: 0px;

    border: 1px solid #E4E7EC;
`

export const requester = styled.span`
    position: absolute;
    top: 62px;
    left: 35px;

    font-family: Pretendard;
    font-size: 12px;
    font-weight: 300;

    color: #98A2B3;
`

export const student = styled.span`
    position: absolute;
    top: 60px;
    right: 13px;

    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
`

export const acceptBtn = styled.div`
    position: absolute;
    width: 50%;
    height: 30px;
    right: 0px;
    bottom: 0px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;

    color: white;
    background-color: #6948ED;
    border-bottom-right-radius: 10px;
`

export const denyBtn = styled.div`
    position: absolute;
    width: 50%;
    height: 30px;
    left: 0px;
    bottom: 0px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;

    color: #98A2B3;
    background-color: #F2F4F7;
    border-bottom-left-radius: 10px;
`