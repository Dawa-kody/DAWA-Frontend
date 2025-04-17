import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface DrugModalProps {
  onClose: () => void;
  initialData?: {
    id?: number; // 수정 시 ID 필요
    name: string;
    type: string;
    count: number;
  };
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  width: 360px;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button<{ primary?: boolean }>`
  background-color: ${(props) => (props.primary ? '#7a5af5' : '#eee')};
  color: ${(props) => (props.primary ? '#fff' : '#333')};
  border: none;
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
`;

export default function DrugModal({ onClose, initialData }: DrugModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('정제');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.type);
      setQuantity(initialData.count !== undefined ? `${initialData.count}개` : '');
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!name || !category || !quantity) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
  
    const newData = {
      medicineName: name,
      medicineType: category,
      medicineCount: quantity,
    };
  
    try {
      if (initialData) {
        // PUT: 수정 (medicineId 포함)
        await axios.put(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/medicine/update`, {
          medicineId: initialData.id,
          ...newData,
        });
        console.log('수정 완료:', { medicineId: initialData.id, ...newData });
      } else {
        // POST: 등록
        await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/medicine/insert`, newData);
        console.log('등록 완료:', newData);
      }
      onClose();
    } catch (error) {
      console.error('에러 발생:', error);
      alert('요청 중 문제가 발생했습니다.');
    }
  };
  

  return (
    <Overlay>
      <Modal>
        <Input
          placeholder="약 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="일반약">일반약</option>
          <option value="감기약">감기약</option>
          <option value="진통제">진통제</option>
        </Select>
        <Input
          placeholder="용량"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <ButtonGroup>
          <Button onClick={onClose}>취소</Button>
          <Button primary onClick={handleSubmit}>
            {initialData ? '수정' : '등록'}
          </Button>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
}
