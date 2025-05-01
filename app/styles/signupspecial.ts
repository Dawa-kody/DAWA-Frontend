import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100%;
    margin: 0;
    padding: 0;
  }

`;


export const Container = styled.div`
  display: flex;
  height: 1000px;
  width: 100vw;
  overflow: auto; 
`;

export const LeftSection = styled.div`
    flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; // 상단 정렬
  align-items: flex-start;
  background-color: #FFFFFF;
  min-height: 700px; // 필요에 따라 조정
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
    top: 104px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 48px;

    color: #000000;
      
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;

`

export const SubText = styled.span`
    position: absolute;
    left: 105px;
    top: 145px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;

    color: #000000;
    
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  
`

export const AllergyItem=styled.div`
 display: flex;
  flex-direction: column; /* 설명란이 아래로 */
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
    font-size: 1.4rem;
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





export const DiseaseTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px; /* 항목 간격 */
  position: relative;
  left: 160px;
  top: 180px;
   margin-top: 154px;
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

export const GoLogin = styled.span`
    position: absolute;
    left: 251px;
    top: 145px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;

    color: #6948ED;
    cursor: pointer;
  
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
 
`

export const Title = styled.span`
    position: absolute;
    left: 124px;
    top: 205px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;

    color: #000000;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
 
`
export const SpecialText=styled.span`
    color: #98A2B3;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    position:absolute;
    left:130px;
    top:250px;

   -ms-user-select: none;
   -moz-user-select: -moz-none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   user-select: none;
 
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

export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 63%;
    height: 10vh;
    margin-left: auto;
    margin-right: auto;
    margin-top:20px;
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
    gap: 9px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 420px;
`

export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
`
export const NextButton = styled.button<{ disabled?: boolean }>`
  width: 125px;
  height: 43px;
  border-radius: 10px;
  position: relative;
  left: 490px;
  top: -165px;
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

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;


export const BeforeButton=styled.button`
    width: 85px;
    height: 43px;
    border-radius: 10px;
    position:relative;
    top:-210px;
    left:140px;
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
    margin-top: 42px;
    margin-left: 500px;
    cursor: pointer;
    color: #6948ED;
`;