import styled from "styled-components";

  export const Search=styled.input`
    width: 160px;
    height: 40px;
    background: #F0EDFE;
    border-radius: 8px;
    position: absolute;
    left: 280px;
    top: 20px;
    outline: none;
    color: #000;
    padding-left: 30px; /* 텍스트 입력 위치 조정 */
    
    background-image: url('Search.svg'); /* 배경 이미지 */
    background-size: 20px; /* 이미지 크기 설정 */
     background-position: calc(100% - 20px) center; 
    background-repeat: no-repeat; /* 배경 이미지가 반복되지 않도록 설정 */
  `

  export const Name=styled.div`
  color:#000;
  `

  export const Table=styled.table`
  position:relative;
  top:100px;
  left:100px;
  `

  export const DateTh=styled.th`
  width:100px;
  height:30px;
  color:#000;
  border-top-left-radius: 7px;
  border: 1px solid #000;
  background-color:#F0EDFE;
  border-left:none;
  border-top: none;
  `

  export const ClassTh=styled.th`
  width:60px;
  color:#000;
  border: 1px solid #000;
  background-color:#F0EDFE;
  border-top:none;
  `

  export const SickTh=styled.th`
  width:100px;
  color:#000;
  border: 1px solid #000;
  background-color:#F0EDFE;
  border-top:none;
  `
  
  export const HandleTh=styled.th`
  width:140px;
  color:#000;
  border: 1px solid #000;
  background-color:#F0EDFE;
  border-top:none;
  border-right:none;
  border-top-right-radius: 7px;
  `