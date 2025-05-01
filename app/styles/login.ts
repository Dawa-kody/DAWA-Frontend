import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
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
`;

export const LeftSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: #FFFFFF;
`;

export const RightSection = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
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
`

export const HelloText = styled.span`
 position: absolute;
    left: 106px;
    top: 114px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;

    color: #000000;
`

export const SubText = styled.span`
    position: absolute;
    left: 105px;
    top: 168px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;

    color: #000000;
`

export const GoSignup = styled.span`
    position: absolute;
    left: 245px;
    top: 168px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;

    color: #6948ED;
    cursor: pointer;
`

export const Title = styled.span`
    position: absolute; 
    left: 124px;
    top: 240px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 48px;

    color: #000000;
`

export const InputGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 7px;
`

export const InputLabel = styled.label`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;

    color: #000000;
`

export const EmailText=styled.span`
color: #98A2B3;
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 400;
line-height: normal;
position:absolute;
left:508px;
top:363px;
`
export const ErrorMessage = styled.div`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`;

export const PasswordMessage=styled.span`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`

export const EmailInput = styled.input`
    
    width: 22rem;
    height: 53px;
    position:relative;
   
    background: #F2F4F7;
    border-radius: 8px;

    padding-left: 20px;
    font-family: 'Pretendard';
    outline:none;

    &::placeholder{
        color: #95979D;
    }
    color:#000000;
`


export const PasswordInput = styled.input`
    width: 28.6875rem;
    height: 53px;
    top: 461px;

    
    background: #F2F4F7;
    border-radius: 8px;

    padding-left: 20px;
    font-family: 'Pretendard';
    outline:none;

    &::placeholder{
        color: #95979D;
    }
    color:#000000;
`

export const MissingpasswordText = styled.span`
color: #6948ED;
font-family: Pretendard;
font-size: 1rem;
font-style: normal;
font-weight: 300;
line-height: normal;
position:relative;
left:20.6rem;

bottom:-1.4rem;
cursor:pointer;
`


export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 63%;
    height: 10vh;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1vh;
`

export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`

export const NextButton = styled.button<{ isActive: boolean }>`
width: 5.8rem;
height: 3.0rem;
display: flex;  
border-radius: 10px;
margin-left: auto;
display: flex;
justify-content: center;
align-items: center;
cursor: ${({ isActive }) => (isActive ? "pointer" : "default")};
background-color: ${({ isActive }) => (isActive ? "#6948ED" : "#E4E7EC")};
color: white;
position:relative;
bottom:-0.8rem;
outline:none;
`;

export const NextButtonText = styled.span<{ isActive: boolean }>`
color: ${({ isActive }) => (isActive ? '#ffffff' : '#98A2B3')};
font-family: "Pretendard Variable";
font-size: 1rem;
font-style: normal;
font-weight: 600;
line-height: normal;
`

export const IconWrapper = styled.div<{ $showPassword: boolean }>`
  position: absolute;
  cursor: pointer;
  color: #6948ED;
  /* 조건부 스타일 */
  margin-top: ${({ $showPassword }) => ($showPassword ? "42px" : "40px")};
  margin-left: ${({ $showPassword }) => ($showPassword ? "480px" : "420px")};
`;
