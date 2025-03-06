"use client";
import React from "react";
import * as S from "../styles/sheet";
import SickDropdown from "../components/SickDropdown"; //병명 드롭다운 
import GenderDropdown from "../components/GenderDropdown"; //성별 드롭다운

interface TableRowProps {
  row: RowData;
  index: number;
  onEnter: () => void;
  onDelete: (id: number) => void;
  onChange: (id: number, field: string, value: string) => void;
  onSickChange: (id: number, sickCategory: string) => void;
  onGenderChange: (id: number, gender: "남성" | "여성") => void;
}

interface RowData {
  serialNumber: number;
  schoolNumber: string;
  userName: string;
  gender: "" | "남성" | "여성";
  time: string;
  content: string;
  disease: string;
}

function TableRow({ row, index, rows, onEnter, onDelete, onChange, onSickChange, onGenderChange }: TableRowProps & { rows: RowData[] }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { // 줄 추가
      onEnter();
    }
    if (e.key === "Backspace") {
      if (row.time.trim() === "" && index === 0 && rows.length === 1) {
        // 한 줄만 남았을 때는 Backspace 눌러도 삭제하지 않음
        e.preventDefault();
      } else if (row.time.trim() === "" && rows.length > 1) {
        // 현재 줄이 비어있고, 줄이 2개 이상일 때 줄 삭제
        onDelete(row.serialNumber);
      } else if (row.time.trim() === "" && rows.length === 1) {
        // 현재 줄이 비어있고 줄이 1개일 때 새로운 줄 추가
        onEnter();
        e.preventDefault(); // 기본 동작 방지
      }
    }
  };

  const handleSickChange = (sickCategory: string) => { // 병명 드롭다운 onChange
    onSickChange(row.serialNumber, sickCategory);
  };

  const handleGenderChange = (gender: "남성" | "여성") => { // 성별 드롭다운 onChange
    onGenderChange(row.serialNumber, gender);
  };

  return (
    <tr>
      <S.Td>
        <S.Number>{index + 1}</S.Number>
      </S.Td>
      <S.Td>
        <S.ClassInput
          name="schoolNumber"
          value={row.schoolNumber}
          onChange={(e) => onChange(row.serialNumber, "schoolNumber", e.target.value)}
          autoComplete="off"
        />
      </S.Td>
      <S.Td>
        <S.NameInput
          name="userName"
          value={row.userName}
          onChange={(e) => onChange(row.serialNumber, "userName", e.target.value)}
          autoComplete="off"
        />
      </S.Td>
      <S.Td>
        <GenderDropdown
          data={["남성", "여성"]}
          onChange={handleGenderChange}
          value={row.gender}
        />
      </S.Td>
      <S.Td>
        <SickDropdown
          data={["호흡기계", "소화기계", "순환기계", "정신신경계", "피부피하계", "비뇨생식기계", "구강치아계", "이빈인후과계", "안과계", "감염병", "기타"]}
          onChange={handleSickChange}
        />
      </S.Td>
      <S.Td>
        <S.Textarea
          name="content"
          value={row.content}
          onChange={(e) => onChange(row.serialNumber, "content", e.target.value)}
          autoComplete="off"
        />
      </S.Td>
      <S.Td>
        <S.TimeInput
          name="time"
          value={row.time}
          onKeyDown={handleKeyDown}
          onChange={(e) => onChange(row.serialNumber, "time", e.target.value)}
          autoComplete="off"
        />
      </S.Td>
    </tr>
  );
}

export default TableRow;
