import styled from "styled-components";

export const Wrapper = styled.div`
    width: 34rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1.12rem;
`

export const saveBtn = styled.button`
    width: 399px;
    height: 63px;

    background-color: #6948ED;

    font-family: Pretendard;
    font-size: 16px;
    font-weight: bold;

    color: white;
    border-radius: 5px;
`

export const backupBtn = styled.button`
    width: 140px;
    height: 63px;

    background-color: #6948ED;

    font-family: Pretendard;
    font-size: 16px;
    font-weight: bold;
    
    color: white;
    border-radius: 5px;
`

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
    z-index: 2000;
`;

export const ModalContainer = styled.div`
    width: 700px;
    height: 400px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;

    background-color: white;
    border-radius: 10px;
`

export const Title = styled.span`
    font-family: Pretendard;
    font-size: 30px;
    font-weight: bold;

    position: absolute;
    top: 280px;
    left: 540px;
`

export const Des = styled.span`
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;

    position: absolute;
    top: 320px;
    left: 540px;

    color: #98A2B3;
`

export const yoso = styled.span`
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;

    position: absolute;
    top: 360px;
    left: 540px;
`

export const Cancle = styled.img`
    width: 32px;
    height: 32px;

    position: absolute;
    top: 280px;
    right: 530px;

    cursor: pointer;
`

export const Choose = styled.div`
    width: 231px;
    height: 231px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #F2F4F7;
    border-radius: 10px;

    position: relative;
    top: 20px;
`

export const ChooseImg = styled.img`
    width: 80px;
    height: 80px;
`

export const ChooseSpan = styled.span`
    font-family: Pretendard;
    font-size: 20px;
    font-weight: bold;

    color: #98A2B3;
`

export const Line = styled.div`
    width: 3px;
    height: 117px;

    position: absolute;
    top: 400px;
    left: 542px;

    background-color: #6948ED;
`

export const IT = styled.span`
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 500;

    position: absolute;
    top: 400px;
    left: 562px;
`

export const DateInput = styled.input.attrs({ type: "date" })`
    width: 600px;
    height: 56px;

    background-color: #F2F4F7;
    border-radius: 8px;

    position: absolute;
    padding-left: 15px;
    top: 440px;
    left: 562px;

    ::placeholder{
        color: #95979D;
    }

  /* 캘린더 아이콘 위치 조정 (크롬 전용) */
  &::-webkit-calendar-picker-indicator {
    position: relative;
    right: 18px;
    cursor: pointer;
    filter: invert(0.4);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-clear-button {
    display: none;
  }

  &:invalid {
    color: #95979D;
  }
`;

export const Submit = styled.button`
    width: 140px;
    height: 56px;

    font-family: Pretendard;
    font-size: 18px;
    font-weight: bold;

    position: absolute;
    top: 550px;
    left: 1020px;

    color: white;
    border-radius: 5px;
    background-color: #6948ED;
`