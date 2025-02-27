
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
  top:120px;
  left:20px;
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

  export const DetailsTable = styled.table`
  width: 200px; 
  height:400px;
  `;

// 카드 컨테이너
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; // 카드 간의 간격
  margin: 20px 0;
`;

// 학생 카드 스타일
export const StudentCard = styled.div`
  background-color: #f9f9f9; // 카드 배경색
  border: 1px solid #ddd; // 테두리
  border-radius: 8px; // 둥근 모서리
  padding: 16px; // 내부 여백
  cursor: pointer; // 클릭 가능 표시
  transition: background-color 0.3s; // 배경색 전환 효과

  &:hover {
    background-color: #e0e0e0; // 마우스 오버 시 배경색 변화
  }
`;

// 학생 이름 스타일
export const StudentName = styled.h3`
  margin: 0; // 기본 여백 제거
`;

// 상세 정보 컨테이너
export const DetailsContainer = styled.div`
  margin: 20px 0;
`;

// 기록 카드 스타일
export const RecordCard = styled.div`
  background-color: #e0f7fa; // 카드 배경색
  border: 1px solid #b2ebf2; // 테두리
  border-radius: 8px; // 둥근 모서리
  padding: 16px; // 내부 여백
  margin-bottom: 10px; // 카드 간의 간격
`;

// 기록 날짜 스타일
export const RecordDate = styled.p`
  margin: 0; // 기본 여백 제거
  font-weight: bold; // 글자 두껍게
`;

// 기록 학번 및 병명 스타일
export const RecordClassId = styled.p`
  margin: 0; // 기본 여백 제거
`;

// 기록 처치 스타일
export const RecordTreatment = styled.p`
  margin: 0; // 기본 여백 제거
  color: #00796b; // 색상 설정
`;
