import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useMedicalStore from '@/store/useMedicalStore';

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
  color:#000000;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000000;
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
  const { addMedicine, updateMedicine } = useMedicalStore();

  const handleSubmit = async () => {
    if (!name || !category || !quantity) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
  
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity)) {
      alert('유효한 수량을 입력해주세요.');
      return;
    }
  
    try {
      if (initialData) {
        // 수정 로직
        if (!initialData?.id) throw new Error('Invalid ID');
        await updateMedicine({
          id: initialData.id,
          name,
          type: category,
          count: parsedQuantity,
          body_system: null
        });
      } else {
        // 생성 로직 (ID 없이 전송)
        await addMedicine({
          name,
          type: category,
          count: parsedQuantity,
          body_system: null
        });
      }
      onClose();
    } catch (error) {
      alert('처리 중 오류가 발생했습니다');
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
          <option  className="text-black" value="GENERAL_MEDICINE">일반약</option>
          <option  className="text-black" value="COLD_MEDICINE">감기약</option>
          <option  className="text-black" value="PAINKILLER">진통제</option>
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
