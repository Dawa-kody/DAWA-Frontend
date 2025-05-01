import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  /* 스크롤바 숨기기 - Chrome, Safari, Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* 스크롤바 숨기기 - IE, Edge */
  body, #__next {
    -ms-overflow-style: none;
  }
  /* 스크롤바 숨기기 - Firefox */
  body, #__next {
    scrollbar-width: none;
  }
`;


export const Container = styled.div`
  display: flex;
  height: 1000px;
  width: 100vw;
  overflow: auto; /* 스크롤 가능, 스크롤바는 숨김 */
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
    left: 105px;
    top: 74px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 48px;

    color: #000000;
`

export const SubText = styled.span`
    position: absolute;
    left: 105px;
    top: 115px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;

    color: #000000;
`

export const GoLogin = styled.span`
    position: absolute;
    left: 251px;
    top: 115px;

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
    top: 160px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;

    color: #000000;
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const InputLabel = styled.label`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;

    color: #000000; 
`

export const EmailAcess = styled.label`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;

    color: #000000;
    position:relative;
    top:14px;
`
export const EmailText=styled.span`

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;

    color: #000000;
    position:relative;
    top:20px;
`

export const EmailTextE=styled.span`

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;

    color: #98A2B3;
    position:relative;
    top:-23px;
    left:370px;
`


export const EmailInput = styled.input`
    width:355px;
    height:51px;
    position:relative;
    top:20px;
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
`

export const StyledInput = styled.input`
    width: 100%;
    height: 53px;
    position:relative;
    top: 171px;

    background: #F2F4F7;
    border-radius: 8px;

    padding-left: 20px;
    font-family: 'Pretendard';

    &::placeholder{
        color: #95979D;
    }
    outline:none;
    color:#000000;
`

export const PaaswordInput = styled.input`
    width: 100%;
    height: 53px;
    position:relative;
    top: -8px;

    background: #F2F4F7;
    border-radius: 8px;

    padding-left: 20px;
    font-family: 'Pretendard';

    &::placeholder{
        color: #95979D;
    }
    outline:none;
    color:#000000;
`

export const PaaswordCheckInput = styled.input`
    width: 100%;
    height: 53px;
    position:relative;
    top: 3px;

    background: #F2F4F7;
    border-radius: 8px;

    padding-left: 20px;
    font-family: 'Pretendard';

    &::placeholder{
        color: #95979D;
    }
    outline:none;
    color:#000000;
`


export const FormEmailInput = styled.input`
    width: 22rem;
    height: 53px;
    position:relative;  
    top: 12px;
    color:#000000;
    background: #F2F4F7;
    border-radius: 8px 0 0 8px;


    padding-left: 20px;
    font-family: 'Pretendard';

    &::placeholder{
        color: #95979D;
    }
    outline:none;
`

export const EmailInputButton = styled.button`
    width: 8rem;
    height: 3.34rem;
    border-radius: 0px 8px 8px 0px;
    display: flex;
    position:absolute;
    left:490px;
    top: 380px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #6948ED;
    color: white;


    font-family: 'Pretendard';
    font-weight: 500;
    font-size: 18px;
    align-items: center;
    justify-content: center;
`
export const Div=styled.div`
color: '#6948ED';
marginTop: '8px';
fontSize: '14px;
display: 'flex';
alignItems: 'center;
gap: '8px'
`
export const Password=styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  position: relative;
  top: 30px; 

`

export const ErrorMessage = styled.div`
   color: #ff3b30;
  font-size: 14px;
  margin-top: 6px;
  margin-bottom: 0;
  font-family: 'Pretendard', sans-serif;
`;

export const Text=styled.span`
  color: #6948ED;
  position: static;
  z-index: 10;
  position:relative;
  top:53px;
`


export const EmailSentInfo = styled.div`
  color: #6948ED;
  margin-top: -40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left:10px;
  
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
`

export const Count1page = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #6948ED;
`

export const Count2page = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #D9D6FE;
`

export const Pages = styled.div`
    display: flex;
    flex-direction: row;
    gap: 9px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 30px;
`

export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
`

export const NextButton = styled.button<{ isActive: boolean }>`
    width: 98px;
    height: 43px;
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
    align-items: center;
    justify-content: center;
    border: none;
    transition: background-color 0.2s;
`;

export const BeforeButton=styled.button`
width: 85px;
height: 43px;
border-radius: 10px;
position:relative;
top:-50px;
left:10px;
cursor: pointer;


background-color: #F2F4F7;
color: black;
outline:none;
font-family: 'Pretendard';
font-weight: 700;
font-size: 16px;
align-items: center;
justify-content: center;

-ms-user-select: none;
-moz-user-select: -moz-none;
-webkit-user-select: none;
-khtml-user-select: none;
user-select: none;
`

export const IconWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  color: #6948ED;
  top:50px;
  left:430px;

`;

export const IconWrapper2 = styled.div`
  position: absolute;
   top:160px;
  left:430px; 
  cursor: pointer;
  color: #6948ED;
`;
