import styled from 'styled-components';

// 📌 테이블이 부모 영역을 넘지 않도록 제한하고 자체 스크롤 생성
export const TableWrapper = styled.div`
  width: 100%;
  max-height: 50rem;
  border: 1px solid #ccc;
`;

export const Table = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
  table-layout: fixed;
  overflow-y: scroll;
  scrollbar-height: hidden;
  color: #000;
  font-size:0.65rem;
`;

export const Th = styled.th`
  background-color: #F0EDFE;
  border: 1px solid black;
  padding: 0.5rem;
  text-align: center;
  user-select: none;
  white-space: nowrap;
`;

export const Td = styled.td`
  border: 1px solid black;
  padding: 0.5rem;
  text-align: center;
  white-space: nowrap;
`;

export const Cell = styled.div`
  width: 100%;
  text-align: center;
  outline: none;
  border: none;
`;
