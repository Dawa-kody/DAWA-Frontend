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
  overflow: hidden;


  @media (max-width: 768px) {
    align-items: center;
    padding: 20px;
   overflow: hidden;

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

export const HelloText = styled.span`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: clamp(1.6rem, 2vw, 2.5rem);
    line-height: 1.3;
    color: #000000;

    @media (max-width: 768px) {

      position: static;
      display: block;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
`;

export const TopTexts = styled.div`
display: flex;
flex-direction: column;
gap: 0.75rem;
margin-left: 7rem;
margin-top:5rem;
width: 80%;
@media (max-width: 768px) {

  margin-left: 0;
  margin-top:2rem;
}

`;

export const SubTextWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;

    @media (max-width: 768px) {
      flex-direction: row; /* 줄 바꿈 방지 */
      align-items: center;
      gap: 0.3rem;
    }
`;

export const SubText = styled.span`
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: clamp(10px, 2vw, 16px);
  line-height: 1.3;
  color: #000;


   @media (max-width: 768px) {
      margin-left: 0;
        margin-bottom: 0.2rem;
    }

`;

export const HelloBlock = styled.div`
display: flex;
flex-direction: column;
gap: -1rem;
`;


export const GoLogin = styled.span`
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: clamp(10px, 2vw, 16px);
  line-height: 1.3;
  color: #6948ED;
  cursor: pointer;
  
    @media (max-width: 768px) {
      margin-left: 0; 
      margin-bottom: 0.2rem;
    }

`;

export const Title = styled.span`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: clamp(1.8rem, 1.8vw, 1.8rem);
    line-height: 1.3;
    margin-left:2rem;
    color: #000000;
    position:relative;
    top:-0.2rem;
    left:-1rem;

    @media (max-width: 768px) {
      position: static; 
      width: 100%;        
      margin-left:1rem;
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
`;

 
export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: static;
`;

export const InputLabel = styled.label`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #000000;
`;


export const EmailText = styled.label`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 1rem;
  line-height: 21px;
  color: #000000;
`;

export const EmailTextE = styled.span`
  color: #98A2B3;
  font-family: Pretendard;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: normal;
  /* left, top 제거! */

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: left;
    margin-bottom: 0;
  }
`;

export const EmailInputGroup = styled.div`
display: flex;
  align-items: center;
  gap: clamp(8px, 1vw, 20px);  
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
`;

    
export const EmailInput = styled.input`
  width: 22rem;
  height: 3rem;
  position: relative;
  top: clamp(2px, 5px, 10px);
  color: #000000;
  background: #F2F4F7;
  border-radius: 8px;
  padding-left: 20px;
  font-family: 'Pretendard';

  &::placeholder {
    color: #95979D;
  }
  outline: none;

  &::placeholder {
    color: #95979D;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
  }
`;
  
export const EmailAcess = styled.label`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #000000;
  position: relative;
  top: clamp(2px, 5px, 10px);
  margin-top: 1rem; 
`;

export const FormEmailInput = styled.input`
  width: 22rem;
  height: 3rem;
  position: relative;
  top: clamp(2px, 5px, 10px);
  color: #000000;
  background: #F2F4F7;
  border-radius: 8px 0 0 8px;
  padding-left: 20px;
  font-family: 'Pretendard';

  &::placeholder {
    color: #95979D;
  }
  outline: none;

  &::placeholder {
    color: #95979D;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
  }
`;
      
      
  export const PasswordInput = styled.input`
  width: 100%;
 height: 53px;
 position: relative;
 top: clamp(-5px,-8px,10px);
 background: #F2F4F7;
 border-radius: 8px;
 padding-left: 20px;
 font-family: 'Pretendard';
 color: #000000;
 outline: none;

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

export const EmailInputButton = styled.button`
  width: 120px;
  height: 50px;
  border-radius: 0px 8px 8px 0px;
  display: flex;
  margin-left: 22rem;
  position:relative;
  top:-3.4rem;
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
    max-width: 300px; 
    border-radius: 8px; 
    margin-top: 10px; 
    margin-left: 0;  
    top: auto;  
    left: auto;  
    font-size: 16px; 
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
  gap: -1rem;
  position: relative;
  top: -5vh;

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
  gap: -1px;

  margin-left: auto;
  margin-right: auto;


  @media (max-width: 768px) {
    width: 90%;
    margin-top: 2rem;
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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6948ED;
  margin-left: -3rem;
  margin-top:-1vh;
  z-index:1;
  @media (max-width: 768px) {
    margin: 1rem 0 0 0;
    justify-content: flex-end;
  }
`;

export const IconWrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6948ED;
  margin-left: -3rem;
  height: 3rem;
  z-index:1;
  @media (max-width: 768px) {
    margin: 1rem 0 0 0;
    justify-content: flex-end;
  }
`;



