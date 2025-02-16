import styled from "styled-components";

export const Logo = styled.img`
  position: absolute; 
  width: 56px;
  height: 38px;
  left: 100px;
`;

export const LogoText = styled.span`
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  font-size: 27px;

  line-height: 36px;
  color: #6938EF;
  
  position: absolute;
  left: 180px;
`;

export const Component = styled.div`
  width: 100%;
  height: 88px;
  background: #FFFFFF;
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
  right: 470px;
  background-color: ${(props) => (props.Active ? '#F2ECF8' : '#FFFFFF')};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding-left: 12px;
  align-items: center;
  text-align: center;
  gap: 25px;
  position: absolute;
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
    position: absolute;
    right: 170px;
    cursor: pointer;
  `;
  
  export const LoginHoverBox = styled.div`
  display: flex;
  flex-direction: column; 
  position: absolute;
  top: 70px;          
  right: 140px;
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
  right: 250px;
  background-color: ${(props) => (props.Active ? '#F2ECF8' : '#FFFFFF')};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding-left: 12px;
  align-items: center;
  text-align: center;
  gap: 25px;
  position: absolute;
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

export const MoonjinHap = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'Active', // '$active'를 DOM에 전달하지 않음
})<{ Active: boolean }>`
  cursor: pointer;
  width: 210px;
  height: 50px;
  right: 690px;
  background-color: ${(props) => (props.Active ? '#F2ECF8' : '#FFFFFF')};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding-left: 12px;
  align-items: center;
  text-align: center;
  gap: 25px;
  position: absolute;
  `;

export const Moonjin = styled.img`
width: 30px;
height: 30px;
`;

export const MoonjinText = styled.span<{ active: boolean }>`
color: ${(props) => (props.active ? '#6948ED' : '#DEDEDE')};
top: 10px;
font-family: Pretendard Variable;
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 24px;
`;

export const AdminText = styled.span`
  color: #6938EF;
  
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  right: 960px;
  position: absolute;
`

export const NavContainer = styled.div`
  width: 100%;
  height: 88px;
  z-index: 2000;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  top: 0px;
`