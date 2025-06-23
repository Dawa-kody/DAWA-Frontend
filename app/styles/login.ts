  import { Password } from './signup1';
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



  export const RightSection = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    
  @media (max-width: 768px) {
    width: 100%;
    height: 250px; 
    margin-top: 0; 
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
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: clamp(1.5rem, 2vw, 2.2rem);
    line-height: 1.3;

    color: #000000;

    @media (max-width: 768px) {
      position: static; 
      width: 100%;        
  
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  `;

  export const HelloText = styled.span`
    
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: clamp(1.5rem, 2vw, 2.25rem);
    line-height: 1.3;
    color: #000000;

    @media (max-width: 768px) {

      position: static;
      display: block;
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  `;



  export const SubText = styled.span`
    font-family: 'Pretendard';
    font-weight: 300;
    font-size: clamp(1rem, 1.2vw, 1.125rem);
    line-height: 1.3;
    color: #000;
    margin-bottom: 0.2rem;

    @media (max-width: 768px) {
      margin-left: 0;
    }
  `;


  export const GoSignup = styled.span`
    font-family: 'Pretendard';
    font-weight: 300;
    font-size: clamp(1rem, 1.2vw, 1.125rem);
    line-height: 1.3;
    color: #6948ED;
    margin-bottom: 2rem;
    cursor: pointer;

    @media (max-width: 768px) {
      margin-left: 0; 
      margin-bottom: 0.2rem;
    }
  `;



    export const RowWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 0.6rem;

    @media (max-width: 768px) {
      flex-direction: row; /* 줄 바꿈 방지 */
      align-items: center;
      gap: 0.3rem;
    }
  `;
    
    
    export const HelloBlock = styled.div`
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    `;

  export const InputGroup = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 7px;
  `;

  export const InputLabel = styled.label`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;

    color: #000000;
  `;

  export const EmailInputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%; 
  `;



  export const EmailText = styled.span`
  color: #98A2B3;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap; 


  `;

  export const ErrorMessage = styled.div`
    color: red;
    font-size: 13px;
    margin-top: 4px;
  `;

  export const PasswordMessage = styled.span`
    color: red;
    font-size: 13px;
    margin-top: 4px;
  `;

  export const EmailInput = styled.input`
    flex: 1; 
    height: clamp(40px, 7vh, 53px);
    background: #F2F4F7;
    border-radius: 8px;
    padding-left: 20px;
    font-family: 'Pretendard';
    outline: none;
    border: none;
    color: #000;

    &::placeholder {
      color: #95979D;
    }

    @media (max-width: 768px) {
      padding-left: 12px;
    }
  `;


  export const PasswordInput = styled.input`
    width: 100%;
    height: clamp(40px, 7vh, 53px);
    background: #F2F4F7;
    border-radius: 8px;
    padding-left: 20px;
    font-family: 'Pretendard';
    outline: none;
    border: none;
    color: #000;

    &::placeholder {
      color: #95979D;
    }

    @media (max-width: 768px) {
      padding-left: 12px;
    }
  `;

  export const PasswordInputWrapper = styled.div`
    display: flex;
    flex-direction: column;  
    gap: 6px;
    position: relative;
    width: 100%;
  `;

  export const MissingpasswordText = styled.span`
    align-self: flex-end;
    color: #6948ED;
    font-family: Pretendard;
    font-size: 0.9rem;
    font-weight: 300;
    cursor: pointer;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  `;

  export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 100%; 
    padding-left: 2rem; 
    box-sizing: border-box; 

    @media (max-width: 768px) {
      padding-left: 0;
    }
  `;


  export const TopTexts = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
    margin-left: 4rem;
    width: 80%;

  `;

  export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 24px;
  `;

  export const NextButton = styled.button<{ isActive: boolean }>`
    width: clamp(120px, 15vw, 93px);
    height: clamp(40px, 5vh, 48px);
    border-radius: 10px;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${({ isActive }) => (isActive ? "pointer" : "default")};
    background-color: ${({ isActive }) => (isActive ? "#6948ED" : "#E4E7EC")};
    color: white;
    position: relative;
    bottom: -0.8rem;
    outline: none;

    @media (max-width: 768px) {
      width: 100%;
    }
  `;

  export const NextButtonText = styled.span<{ isActive: boolean }>`
    color: ${({ isActive }) => (isActive ? '#ffffff' : '#98A2B3')};
    font-family: "Pretendard Variable";
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  `;

  export const IconWrapper = styled.div<{ $showPassword: boolean }>`
    position: absolute;
    right: 20px;
    top: 36%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #6948ED;
  `;

  export const LoginFormSection = styled.form`
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    overflow: hidden; 
     @media (max-width: 768px) {
    align-items: center;
    transform: none;
    padding: 0 0.5rem;
    margin-bottom: 0;  
  }
  `;






  export const LoginFormInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    transform: translateY(-5%); 

  @media (max-width: 768px) {
    transform: none;
    padding: 0 1rem;
  }
  `;

  export const MainWrapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
  `;

  export const Form=styled.form` 
  width: 100%;

  position: relative;
  left:-1rem;
  `;