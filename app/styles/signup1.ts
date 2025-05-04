import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar {
    display: none;
  }
  body, #__next {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export const Container = styled.div`
  display: flex;
  height: 1000px;
  width: 100vw;
  overflow: auto;

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
    object-fit: contain;
    height: 100%;
  }
`;

export const HelloText = styled.span`
  position: absolute;
  left: clamp(4vw, 7vw, 106px);
  top: clamp(5vh, 38vh, 100px);
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: clamp(1.5rem, 2vw, 2.25rem);
  line-height: 1.3;
  color: #000000;

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 10px;
    text-align: center;
    font-size: 1.8rem;
    top: auto;
    left: auto;
  }
`;

export const SubText = styled.span`
  position: absolute;
  left: clamp(4vw, 7vw, 105px);
  top: clamp(7vh, 34vh, 138px);
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: clamp(1rem, 1.2vw, 1.125rem);
  line-height: 1.3;
  color: #000000;

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 10px;
    text-align: center;
    font-size: 1rem;
    top: auto;
    left: auto;
  }
`;

export const GoLogin = styled.span`
  position: absolute;
  left: clamp(15vw, 20vw, 251px);
  top: clamp(8vh, 39vh, 140px);
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: clamp(1rem, 1.2vw, 1.125rem);
  line-height: 1.3;
  color: #6948ED;
  cursor: pointer;

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1rem;
    top: auto;
    left: auto;
  }
`;

export const Title = styled.span`
  position: absolute;
  left: clamp(5vw, 9vw, 124px);
  top: clamp(10vh, 27vh, 260px);
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: clamp(1.5rem, 2vw, 2.25rem);
  line-height: 1.3;
  color: #000000;

  @media (max-width: 768px) {
    position: static;
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
    top: auto;
    left: auto;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const InputLabel = styled.label`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #000000;
`;

export const EmailAcess = styled.label`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #000000;
  position: relative;
  top: 14px;

  @media (max-width: 768px) {
    top: 0;
  }
`;

export const EmailText = styled.span`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #000000;
  position: relative;
  top: 20px;

  @media (max-width: 768px) {
    top: 0;
    text-align: center;
    display: block;
    margin-bottom: 10px;
  }
`;

export const EmailTextE = styled.span`
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #98A2B3;
  position: relative;
  top: -23px;
  left: 370px;

  @media (max-width: 768px) {
    position: static;
    top: 0;
    left: 0;
    display: block;
    margin: 0 auto 10px auto;
    text-align: center;
  }
`;

export const EmailInput = styled.input`
  width: clamp(280px, 40vw, 355px);
  height: clamp(45px, 7vh, 51px);
  position: relative;
  top: 20px;
  background: #F2F4F4;
  border-radius: 8px;
  padding-left: 20px;
  font-family: 'Pretendard';
  font-size: 16px;
  color: #000000;

  &::placeholder {
    color: #95979D;
  }
  outline: none;

  @media (max-width: 768px) {
    width: 100%;
    top: 0;
    padding-left: 12px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 53px;
  position: relative;
  top: 171px;
  background: #F2F4F7;
  border-radius: 8px;
  padding-left: 20px;
  font-family: 'Pretendard';
  color: #000000;

  &::placeholder {
    color: #95979D;
  }
  outline: none;

  @media (max-width: 768px) {
    top: 0;
    height: 45px;
    padding-left: 12px;
  }
`;

export const PaaswordInput = styled.input`
  width: 100%;
  height: 53px;
  position: relative;
  top: -8px;
  background: #F2F4F7;
  border-radius: 8px;
  padding-left: 20px;
  font-family: 'Pretendard';
  color: #000000;

  &::placeholder {
    color: #95979D;
  }
  outline: none;

  @media (max-width: 768px) {
    top: 0;
    height: 45px;
    padding-left: 12px;
  }
`;

export const PaaswordCheckInput = styled.input`
  width: 100%;
  height: 53px;
  position: relative;
  top: 3px;
  background: #F2F4F7;
  border-radius: 8px;
  padding-left: 20px;
  font-family: 'Pretendard';
  color: #000000;

  &::placeholder {
    color: #95979D;
  }
  outline: none;

  @media (max-width: 768px) {
    top: 0;
    height: 45px;
    padding-left: 12px;
  }
`;

export const FormEmailInput = styled.input`
  width: clamp(300px, 22rem, 352px);
  height: 53px;
  position: relative;
  top: 12px;
  color: #000000;
  background: #F2F4F7;
  border-radius: 8px 0 0 8px;
  padding-left: 20px;
  font-family: 'Pretendard';

  &::placeholder {
    color: #95979D;
  }
  outline: none;

  @media (max-width: 768px) {
    width: 100%;
    top: 0;
    border-radius: 8px;
    padding-left: 12px;
  }
`;

export const EmailInputButton = styled.button`
  width: 8rem;
  height: 3.34rem;
  border-radius: 0px 8px 8px 0px;
  position: absolute;
  left: clamp(32vw, 450px, 450px);
  top: clamp(33vh, 380px, 378px);
  display: flex;
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

export const Div = styled.div`
  color: #6948ED;
  margin-top: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Password = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 18px;
  position: relative;
  top: 30px;

  @media (max-width: 768px) {
    top: 0;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff3b30;
  font-size: 14px;
  margin-top: 6px;
  margin-bottom: 0;
  font-family: 'Pretendard', sans-serif;
`;

export const Text = styled.span`
  color: #6948ED;
  position: relative;
  top: 53px;
  z-index: 10;

  @media (max-width: 768px) {
    position: static;
    top: 0;
    text-align: center;
    display: block;
    margin-bottom: 10px;
  }
`;

export const EmailSentInfo = styled.div`
  color: #6948ED;
  margin-top: -40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 10px;

  @media (max-width: 768px) {
    margin-top: 10px;
    margin-left: 0;
    justify-content: center;
  }
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 63%;
  height: 10vh;
  margin-left: auto;
  margin-right: auto;
  margin-top: -70vh;

  @media (max-width: 768px) {
    width: 90%;
    margin-top: 20px;
    height: auto;
  }
`;

export const Count1page = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #6948ED;
`;

export const Count2page = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #D9D6FE;
`;

export const Pages = styled.div`
  display: flex;
  flex-direction: row;
  gap: 9px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;

  @media (max-width: 768px) {
    justify-content: center;
    padding-top: 20px;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

export const NextButton = styled.button<{ isActive: boolean }>`
  width: clamp(90px, 15vw, 98px);
  height: clamp(40px, 5vh, 43px);
  border-radius: 10px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'not-allowed')};
  background-color: ${({ isActive }) => (isActive ? '#6948ED' : '#CCCCCC')};
  color: white;
  outline: none;
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 18px;
  border: none;
  transition: background-color 0.2s;

  @media (max-width: 768px) {
    width: 100%;
  }
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
`;

export const IconWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  color: #6948ED;
  top: clamp(4vh, 7vh, 50px);
  left: clamp(25vw, 28vw, 600px);

  @media (max-width: 768px) {
    position: static;
`

export const IconWrapper2 = styled.div`
  position: absolute;
  cursor: pointer;
  color: #6948ED;
  top: clamp(4vh, 22vh, 200px);
  left: clamp(25vw, 28vw, 600px);

  @media (max-width: 768px) {
    position: static;
`