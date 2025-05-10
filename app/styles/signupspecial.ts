import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';


export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
};

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
  `
  export const RowWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: -0.8rem;
  margin-left: -0.2vw;
  @media (max-width: 768px) {
    flex-direction: row; /* 줄 바꿈 방지 */
    align-items: center;
    gap: 0.3rem;
    margin-top: 0;     
    margin-left: 0;
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


export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 24px;

  color: #000000;
  user-select: none;

    @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.4;
    gap: 0.3rem;
  }
`;

export const SubText = styled.span`
  color: #000000;

    @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const GoLogin = styled.span`
color: #6948ED;
cursor: pointer;
user-select: none;

  @media (max-width: 768px) {
    font-size: 1rem;
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
  export const HelloBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

    @media (max-width: 768px) {
    gap: 0.2rem;
  }
`;


  export const TopTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  margin-left: 5rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 0;
    margin-left: -40vw;
  }
`;

  export const SpecialText=styled.span`
      color: #98A2B3;
      font-family: Pretendard;
      font-size: clamp(1rem, 1.2vw, 1.13rem);
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      display: flex;
    
      
     -ms-user-select: none;
     -moz-user-select: -moz-none;
     -webkit-user-select: none;
     -khtml-user-select: none;
     user-select: none;
   
       @media (max-width: 768px) {
        font-size: 1rem;
      }

  `

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;      // 수직 중앙 정렬
  justify-content: flex-start; // 왼쪽 정렬 (원하면 center로)
  background: #fff;

  @media (max-width: 768px) {
    justify-content: center; // 모바일에선 가운데 정렬
    padding: 2rem 0;
  }
`;


export const DiseaseTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 420px;
  width: 100%;

  margin-top: 3rem;
  margin-right: auto;
  margin-bottom: 0;
  margin-left: 7rem;


  padding: 0 2rem;
  background: #fff;
  box-sizing: border-box;
  max-width: 600px;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 1.25rem;
    padding: 0 1rem;
    min-height: auto;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;



export const AllergyItem=styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 8px;
` 

export const DiseaseItem = styled(AllergyItem)``;
export const MedicationItem = styled(AllergyItem)``;
export const GitaItem = styled(AllergyItem)``;


interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
} 

export const CheckboxRow = styled.div`
display: flex;
align-items: center;
gap: 12px;
`;

export const Checkbox = styled.div<CheckboxProps>`
width: 22px;
height: 22px;
border: 2px solid ${({ checked }) => (checked ? '#6948ED' : '#49454F')};
border-radius: 6px;
cursor: pointer;
background-color: ${({ checked }) => (checked ? '#6948ED' : 'white')};

position:relative;


-ms-user-select: none;
-moz-user-select: -moz-none;
-webkit-user-select: none;
-khtml-user-select: none;
user-select: none;
`;

export const AllergyCheckbox = styled.div<CheckboxProps>`
width: 22px;
height: 22px;
border: 2px solid ${({ checked }) => (checked ? '#6948ED' : '#49454F')};
border-radius: 6px;
cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
background-color: ${({ checked }) => (checked ? '#6948ED' : 'white')};
opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  `;
  
  export const AllergyExtra = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
  border-left: 2px solid #7C3AED;
  padding-left: 16px;
  `;
  
  
  export const DiseaseExtra = styled(AllergyExtra)``;
  export const MedicationExtra = styled(AllergyExtra)``;
  export const GitaExtra = styled(AllergyExtra)``;

export const AllergyLabel = styled.div`
  font-size: 14px;
  color: #7C3AED; // 보라색
  font-weight: 500;
`;


export const DiseaseCheckbox = styled.div<CheckboxProps>`
  width: 22px;
  height: 22px;
  border: 2px solid ${({ checked }) => (checked ? '#6948ED' : '#49454F')};
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ checked }) => (checked ? '#6948ED' : 'white')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  position:relative;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;

  
  export const DiseaseText = styled.span`
    color: #000;
    font-family: Pretendard;
    font-size: clamp(1rem, 1.5vw, 2rem);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  `;


  export const MedicationCheckbox = styled.div<CheckboxProps>`
  width: 22px;
  height: 22px;
  border: 2px solid ${({ checked }) => (checked ? '#6948ED' : '#49454F')};
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ checked }) => (checked ? '#6948ED' : 'white')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  position:relative;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;

export const GitaCheckbox = styled.div<CheckboxProps>`
  width: 22px;
  height: 22px;
  border: 2px solid ${({ checked }) => (checked ? '#6948ED' : '#49454F')};
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ checked }) => (checked ? '#6948ED' : 'white')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  position:relative;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;


export const AllergyInput =styled.input`
  width: 370px;
  height: 38px;
  background: #F2F4F7;
  border-radius: 8px;
  border: none;
  outline: none;
  padding: 8px 12px;
  color: #222;
  font-size: 15px;
`


export const DiseaseInput = styled(AllergyInput)``;
export const MedicationInput = styled(AllergyInput)``;
export const GitaInput = styled(AllergyInput)``;



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

export const StyledInput = styled.input`
    width: 100%;
    height: 53px;
    top: 461px;

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

export const Count1page = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #D9D6FE;
    `
    
    export const Count2page = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #6948ED;
`

export const Pages = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  position: relative;  
  top: 0;
  left: 0;

  @media (max-width: 768px) { 
    position: static;
    margin-left: 0;
    margin-top: 0;
  }


`

export const Divs=styled.div`
   display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 2rem; 


  margin-top: -10rem;
  margin-left: 4rem;
  @media (max-width: 768px) {
    gap: 1.5rem; 
    margin-top: 3rem;
    margin-left:-1rem;
  }
  
  `
  export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20rem;
  height: 43px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 20rem;
  }
`;



// NextButton: position 제거, width 100%로 확장(모바일)
export const NextButton = styled.button<{ disabled?: boolean }>`
  width: 125px;
  height: 43px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? '#D9D6FE' : '#6948ED')};
  color: white;
  border: none;
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  transition: background 0.2s;

  @media (max-width: 768px) {
    width: 100px;
    font-size: 15px;
    height: 40px;
  }
`;

// BeforeButton: position 제거, width 100%로 확장(모바일)
export const BeforeButton = styled.button`
  width: 85px;
  height: 43px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #F2F4F7;
  color: black;
  border: none;
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 16px;
  transition: background 0.2s;

  @media (max-width: 768px) {
    width: 75px;
    font-size: 15px;
    height: 40px;
  }
`;


