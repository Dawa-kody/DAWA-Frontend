import styled from "styled-components"

export const Wrapper = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 24px;
  width: 34rem
  height: 25rem;
  margin: 0 auto;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px; // 간격 좁힘
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 10px;
  border: none;
  background-color: #f0eaff;
  font-size: 14px;
  width: 120px;
  outline: none;
`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const SelectedStudent = styled.div`
  background-color: #8c5efc;
  color: white;
  padding: 6px 14px;
  border-radius: 16px;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 12px;
  font-size: 14px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  font-size: 13px;
`;

export const Thead = styled.thead`
  background-color: #f0eaff;
  font-weight: bold;
`;

export const Th = styled.th`
  padding: 10px 12px;
  border: 1px solid #dcdcdc;
  text-align: center;
`;

export const Td = styled.td`
  padding: 10px 12px;
  border: 1px solid #dcdcdc;
  text-align: center;
`;

export const Tr = styled.tr`
  &:nth-of-type(even) {
    background-color: #fafafa;
  }
`;

export const ResultLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: right;
`;

export const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ResultCard = styled.div`
  background-color: #efeaff;
  padding: 10px 14px;
  border-radius: 14px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  transition: background-color 0.2s;

  &:hover {
    background-color: #ded1ff;
  }
`;
