import styled from "styled-components";


export const LogoHap=styled.div`

`
export const Logo=styled.img`
position: absolute;
width:56px;
height:42px;
height: 44.87px;
top:8px;
left:100px;

`;

export const LogoText=styled.span`
font-family: 'Pretendard';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 36px;

color: #6938EF;
position:relative;
top:20px;
left:180px;

`


export const Component=styled.div`
width: 100%;
height: 70px;
background: #FFFFFF;
z-index:-2;
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none
display: flex;
justify-content: center;
align-items: center;
`; 

  export const HomeHap=styled.div<{ active: boolean }>`
cursor: pointer;
width:240px;
height:50px;
background-color: ${(props) => (props.active ? '#F2ECF8' : "#FFFFF")};
border-radius: 10px;
display: flex;
justify-content:center;
align-items: center;
padding-left: 10px;
gap: 30px;
position: absolute;
right: 430px;
top: 10px;
z-index:1;
    `

export const Home=styled.img`
postion:absolute;
display: flex;
top:10px;
`

export const HomeText=styled.span<{ active: boolean }>`
color: ${(props) => (props.active ? '#6948ED' : '#DEDEDE')};
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 24px;
`


export const Login=styled.img`
position: absolute;
left: 1350px;
top:20px;
`

export const LoginText=styled.span`

font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 24px;

color: #DEDEDE;
`

  
export const DangerousHap=styled.div<{active: boolean}>`
cursor: pointer;
width:240px;
height:50px;
background-color: ${(props) => (props.active ? '#F2ECF8' : "#FFFFF")};
border-radius: 10px;
display: flex;
justify-content:center;
align-items: center;
gap: 20px;
position: absolute;
right: 190px;
top: 10px;
z-index:1;
`

export const Dangerous=styled.img`
`
export const DangerousText=styled.span<{ active: boolean }>`
color: ${(props) => (props.active ? '#6948ED' : '#DEDEDE')};
font-family: 'Pretendard Variable';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 24px;
`
