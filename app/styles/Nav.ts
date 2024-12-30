import styled from "styled-components";

export const LogoHap = styled.div``;

export const Logo = styled.img`
  position: relative; 
  width: 56px;
  height: 38px;
  left: 110px;
`;

export const LogoText = styled.span`
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 36px;
  color: #6938EF;
  position: absolute;
  top: 30px;
  left: 185px;
`;

export const Component = styled.div`
  width: 100%;
  height: 88px;
  background: #FFFFFF;
  z-index: 1;  /* 수정된 z-index */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

export const HomeHap = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'Active', // '$active'를 DOM에 전달하지 않음
})<{ Active: boolean }>`
  cursor: pointer;
  width: 210px;
  height: 50px;
  left: 580px;
  background-color: ${(props) => (props.Active ? '#F2ECF8' : '#FFFFFF')};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding-left: 12px;
  align-items: center;
  text-align: center;
  gap: 25px;
  position: relative;
  `;
  
  export const Home = styled.img`
    width: 30px;
    height: 30px;
  `;
  
  export const HomeText = styled.span<{ active: boolean }>`
  color: ${(props) => (props.active ? '#6948ED' : '#DEDEDE')};
  top: 10px;
  font-family: Pretendard Variable;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
`;


export const Login = styled.img`
width: 60px;
height: 60px;
  position: relative;
  left: -180px;
  cursor: pointer;
  `;
  
  export const LoginHoverBox = styled.div`
  display: flex;
  flex-direction: column; 
  position: absolute;
  top: 70px;          
  left: 1440px;
  background-color: #fff; 
  border: 1px solid #e0e0e0; 
  border-radius: 8px;    
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); 
  padding: 16px;          
  z-index: 10;
  align-items: center;    
  gap: 8px;              
  `;

  
export const Text=styled.span`
 font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000;
  cursor: pointer;
`

export const TextContainer=styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;   
  gap: 8px;        
`

export const DangerousHap = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'Active', // '$active'를 DOM에 전달하지 않음
})<{ Active: boolean }>`
  cursor: pointer;
  width: 210px;
  height: 50px;
  left: 190px;
  background-color: ${(props) => (props.Active ? '#F2ECF8' : '#FFFFFF')};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding-left: 12px;
  align-items: center;
  text-align: center;
  gap: 25px;
  position: relative;
`;

export const Dangerous = styled.img`
  width: 30px;
  height: 30px;
`;

export const DangerousText = styled.span<{ active: boolean }>`
  color: ${(props) => (props.active ? '#6948ED' : '#DEDEDE')};
  top: 10px;
  font-family: Pretendard Variable;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
`;

