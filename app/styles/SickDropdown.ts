import styled from "styled-components";

  export const SelectBox = styled.div`
  position: relative;
  width: 100px;
  height: 35px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  align-self: center;
  border: 1px solid #95979D;
  cursor: pointer;
  color:#000;
  position:relative;

  // 드롭다운 화살표 아이콘 추가
  &::before {
    content: "⌵";
    position: absolute;
    top: 4px;
    right: 5px;
    color: #000;
    font-size: 12px;
    font-weight: bold;

  }
`;

// 드롭다운에 선택된 값을 표시할 라벨 스타일
  export const Label = styled.label`
  font-size: 12px;
  text-align:center;
  `;

// 드롭다운 옵션 리스트 스타일, show 값에 따라 표시 여부 결정
  export const SelectOptions = styled.ul<{ show: boolean }>`
  position: absolute;
  top: 38px;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fefefe;
  border-radius: 5px;
  border: ${({ show }) => (show ? "1px solid #F2F2F2" : "none")};
  display: ${({ show }) => (show ? "block" : "none")};

  // 커스터마이징된 스크롤바
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #000;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: #000;
    border-radius: 0px 3px 3px 0px;
  }
`;

// 각 드롭다운 옵션의 스타일
  export const Option = styled.li`
  font-size: 12px;
  padding: 10px;
  cursor: pointer;

  // 옵션을 hover 했을 때 스타일 변화
  &:hover {
    color: #000;
    border-radius: 5px;
    background: #F2F4F7;
  }
`;