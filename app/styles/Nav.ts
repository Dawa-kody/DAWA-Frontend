import styled from 'styled-components';

interface ActiveProps {
  isActive: boolean;
}

export const Component = styled.div`
  width: 100%;
  height: 75px;
  background: #ffffff;
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  height: 45px;
  margin-left: 130px;
  width:122px;
`;

export const Homehap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer; 
  margin-left:700px;
`;

export const Home = styled.img`
postion:relative;

`;

export const HomeText = styled.span<ActiveProps>`
  font-size: 20px;
  font-weight: 700;
  color: ${({ isActive }) => (isActive ? '#6948ED' : '#DEDEDE')};
left:100px;

  `;
  
  export const Loginhap = styled.div`
  display: flex;
  align-items: center;

  `;
  export const Dangeroushap = styled.div``;

export const Dangerous = styled.img`
  margin-right: 10px;
`;
export const DangerousText = styled(HomeText)<ActiveProps>``;

export const Login = styled.img`
  margin-right: 100px;
`;

export const LoginText = styled(HomeText)<ActiveProps>``;


export const Person=styled.img`
position: absolute;
left:1300px;

`