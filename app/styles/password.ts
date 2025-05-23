import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body, #__next {
      height: 100%;
      margin: 0;
      padding: 0;

    }
    body {
      overflow: hidden;
    }
`;

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

      @media (max-width: 768px) {
      flex-direction: column;
      height: auto;
    }
`;


export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #FFFFFF;

  @media (max-width: 768px) {
    align-items: center;
    padding: 20px;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    margin-top: 20px;
  }
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(105, 72, 237, 0.3) 0%, #6948ED 100%);
  z-index: 1;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;

  @media (max-width: 768px) {
    height: 100%;
    object-fit: contain;
  }
`;

export const Title = styled.span`
<<<<<<< HEAD
  position: absolute;
  left: 124px;
  top: 5rem;
=======
  position:relative;
  top:6rem;
  left: 7rem;
>>>>>>> c937304135b3896e122250a15a46b6558a1e079a

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  color: #000000;

  @media (max-width: 768px) {
    position: static;
    font-size: 28px;
    line-height: 36px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PasswordGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  `;

export const InputLabel = styled.label`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #000000;
`;

export const EmailText = styled.span`
  color: #98A2B3;
  font-family: Pretendard;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  left: 51rem;
  top: 27rem;

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 8px;
    font-size: 1rem;
    text-align: center;
  }
`;

export const StyledInput = styled.input`
  width: 30rem;
  height: 3rem;
  border: none;
  border-radius: 8px;
  background: transparent;
  padding-left: 20px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #000;

  &::placeholder {
    color: #95979D;
  }
  outline: none;
  background-color: #F2F4F7;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 8px;
    padding-left: 12px;
  }
`;

export const FormEmailInput = styled.input`
  width: 22rem;
  height: 3rem;
  border: none;
  border-radius: 8px 0 8px 0;
  background: transparent;
  padding-left: 20px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #000;

  &::placeholder {
    color: #95979D;
  }
  outline: none;
  background-color: #F2F4F7;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 8px;
    padding-left: 12px;
  }
`;

export const FormStyledInput = styled.input`
  width: 22rem;
  height: 3rem;
  background: #F2F4F4;
  border-radius: 8px;
  padding-left: 20px;
  font-family: 'Pretendard';
  font-size: 16px;

  &::placeholder {
    color: #95979D;
  }
  outline: none;
  color: #000000;

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 12px;
    height: 40px;
  }
`;

export const AccessText = styled.span`
  color: #6948ED;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ErrorMessage = styled.div`
  color: #D23B3B;
  font-size: 13px;
  margin-top: 4px;
`;

export const TimerInfo = styled.div`
  margin-top: 8px;
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
`;

export const FlexRowWide = styled.div`
  display: flex;
  align-items: center;

`;

export const RedTimerText = styled.span`
  color: #6948ED;
  font-weight: 500;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const EmailInput = styled.div`
  width: 355px;
  height: 51px;
  position: relative;
  top: 4px;
  background: #F2F4F4;
  border-radius: 8px;
  padding-left: 20px;
  font-family: 'Pretendard';
  font-size: 16px;

  &::placeholder {
    color: #95979D;
  }
  outline: none;
  color: #000000;

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 12px;
    height: 45px;
  }
`;

export const EmailInputButton = styled.button`
  width: 140px;
  height: 48px;
  border: none;
  background: #7C5AF6;
  color: #fff;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #6948ED;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 8px;
    margin-top: 10px;
  }
`;

export const AuthRow = styled.div`
  display: flex;
  width: 100%;
  background: #F2F4F7;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  width: 8rem;
  height: 3rem;
  border-radius: 0px 8px 8px 0px;
  display: flex;
  left: 22.6rem;
  top: 22.6rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #6948ED;
  color: white;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 18px;

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    border-radius: 8px;
    margin-top: 10px;
    top: auto;
    left: auto;
  }
`;

export const EmailCheckButton = styled.button`
  width: 8rem;
  height: 3.3125rem;
  border-radius: 0px 8px 8px 0px;
  display: flex;
  position: relative;
  left: -0.3rem;
  top: -0.2rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #6948ED;
  color: white;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 18px;

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    border-radius: 8px;
    margin-top: 10px;
    left: auto;
    top: auto;
  }
`;

export const Inputs = styled.div`
  position:flex;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 63%;
  height: 33rem;
  margin-left: auto;
  margin-right: auto;
  margin-top:10rem;

  @media (max-width: 768px) {
    width: 90%;
    margin-top: 20px;
    height: auto;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
`;

export const NextButton = styled.div<{ isActive: boolean }>`
  width: 78px;
  height: 43px;
  border-radius: 6px;
  margin-left: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'default')};
  background-color: ${({ isActive }) => (isActive ? '#6948ED' : '#E4E7EC')};

  @media (max-width: 768px) {
    width: 100%;

  }
`;


export const NextbuttonText = styled.span<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? "#ffffff" : "#98A2B3")};
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  position: relative;
<<<<<<< HEAD
=======
`;


export const BeforeButton = styled.button`
  width: 85px;
  height: 43px;
  border-radius: 10px;
  position: relative;
  top: -50px;
  left: 10px;
  cursor: pointer;
  background-color: #F2F4F7;
  color: black;
  outline: none;
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 16px;
  user-select: none;

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    margin-top: 10px;
    top: auto;
    left: auto;
  }
>>>>>>> c937304135b3896e122250a15a46b6558a1e079a
`;


export const IconWrapper = styled.div`
  cursor: pointer;
  color: #6948ED;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -3rem;
`;



export const ReportMessage = styled.span`
  color: #D23B3B;
  font-family: Pretendard;
  margin-left: 210px;

  @media (max-width: 768px) {
    position: static;
    margin-left:30rem;
    margin-top: -2rem;
  }
`;
