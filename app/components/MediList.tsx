'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import axios from 'axios';

interface Medicine {
  id: number;
  name: string;
  count: number;
  body_system: string | null;
  type: string;
}

interface MedicineTableProps {
  onAdd: () => void;
  onEdit: (data: Medicine) => void;
}

const Container = styled.div`
  padding: 40px;
  background-color: #f7f9fb;
  min-height: 100vh;
`;

const AddButton = styled.button`
  background-color: #6a5acd;
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a4db2;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  background: white;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Thead = styled.thead`
  background-color: #e4e8ee;
  color: #555;
  font-weight: 600;
`;

const Th = styled.th`
  text-align: left;
  padding: 16px;
`;

const Td = styled.td`
  padding: 16px;
  border-top: 1px solid #f0f0f0;
`;

const ActionTd = styled.td`
  text-align: right;
  padding: 16px;
  border-top: 1px solid #f0f0f0;

  svg {
    cursor: pointer;
    margin-left: 12px;
    font-size: 16px;
    transition: color 0.2s;

    &:hover {
      color: #6a5acd;
    }

    &.delete {
      color: #d64545;

      &:hover {
        color: #b93232;
      }
    }
  }
`;

const MedicineTable: React.FC<MedicineTableProps> = ({ onAdd, onEdit }) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const fetchMedicines = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/medicine/get`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((res) => {
        const data = res.data;
        console.log('✅ 받은 데이터:', data);
        if (Array.isArray(data)) {
          setMedicines(data);
        } else {
          console.error('🚨 예상과 다르게 배열이 아님:', data);
        }
      })
      .catch((err) => {
        console.error('약 정보를 불러오는 데 실패했습니다.', err);
      });
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = confirm(`정말로 "${name}" 약을 삭제하시겠습니까?`);
    if (!confirmDelete) return;
  
    try {
      // id를 경로 변수로 보내기
      await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/medicine/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
  
      setMedicines((prev) => prev.filter((med) => med.id !== id));
      console.log(`🗑️ ${name} 삭제 성공`);
    } catch (error) {
      console.error(`❌ ${name} 삭제 실패`, error);
    }
  };  

  return (
    <Container>
      <AddButton onClick={onAdd}>약 정보 추가</AddButton>

      <TableWrapper>
        <Table>
          <Thead>
            <tr>
              <Th>이름</Th>
              <Th>타입</Th>
              <Th>수량</Th>
              <Th>작업</Th>
            </tr>
          </Thead>
          <tbody>
            {medicines.map((item) => (
              <tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.type}</Td>
                <Td style={{ fontWeight: 'bold' }}>{item.count}</Td>
                <ActionTd>
                  <FaPen onClick={() => onEdit(item)} />
                  <FaTrashAlt className="delete" onClick={() => handleDelete(item.id, item.name)} />
                </ActionTd>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default MedicineTable;
