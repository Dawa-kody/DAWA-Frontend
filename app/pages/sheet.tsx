import React, { useState, useEffect, useCallback } from "react";
import * as S from "../styles/sheet";
import Nav from "../components/Nav"; //nav
import Calendar from "../components/Calendar"; //캘런더
import SickDropdown from "../components/SickDropdown"; //병명 드롭다운 
import GenderDropdown from "../components/GenderDropdown";
import Today from "../components/Today"; //오늘 날짜 
import Search from "../components/Search"; //검색기능
import CountDate from "../components/CountDate"; //날짜 선정
import axios from "axios";

// 각 행의 필요한 속성
interface TableRowProps {
  row: RowData;
  index: number;
  onEnter: () => void;
  onDelete: (id: number) => void;
  onChange: (id: number, field: string, value: string) => void;
  onSickChange: (id: number, sickCategory: string) => void;
  onGenderChange: (id: number, gender: "남성" | "여성") => void;
}

// 각 행의 데이터 구조 정의
interface RowData {
  id: number;
  class: string;
  name: string;
  gender: "" | "남성" | "여성";
  time: string;
  details: string;
  sickCategory: string;
}

interface CategoryCounts {
  일계: GenderCounts;
  월계: GenderCounts;
  누계: GenderCounts;
}

interface GenderCounts {
  남성: Record<string, number>;
  여성: Record<string, number>;
}


function TableRow({ row, index, onEnter, onDelete, onChange, onSickChange, onGenderChange }: TableRowProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => { 
    if (e.key === "Enter") { // 줄 추가
      onEnter();
    }
    if (e.key === "Backspace" && row.time.trim() === "") { // 줄 삭제
      onDelete(row.id);
    }
  };

  const handleSickChange = (sickCategory: string) => { // 병명 드롭다운 onChange
    onSickChange(row.id, sickCategory);
  };

  const handleGenderChange = (gender: "남성" | "여성") => { // 성별 드롭다운 onChange
    onGenderChange(row.id, gender);
  };

  return (
    <tr>
      <S.Td><S.Number>{index + 1}</S.Number></S.Td>
      <S.Td><S.ClassInput name="class" value={row.class} onChange={(e) => onChange(row.id, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
      <S.Td><S.NameInput name="name" value={row.name} onChange={(e) => onChange(row.id, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
      <S.Td><GenderDropdown data={["남성", "여성"]} onChange={handleGenderChange}></GenderDropdown></S.Td>
      <S.Td><SickDropdown data={["호흡기계", "소화기계", "순환기계", "정신신경계", "피부피하계", "비뇨생식기계", "구강치아계", "이빈인후과계", "안과계", "감염병", "기타"]} onChange={handleSickChange} /></S.Td>
      <S.Td><S.Textarea name="details" value={row.details} onChange={(e) => onChange(row.id, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
      <S.Td><S.TimeInput name="time" value={row.time} onKeyDown={handleKeyDown} onChange={(e) => onChange(row.id, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
    </tr>
  );
}

function Sheet() {
  const [rows, setRows] = useState<RowData[]>([{ id: 1, class: "", name: "", gender: "", time: "", details: "", sickCategory: "" }]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({
    일계: { 남성: {}, 여성: {} },
    월계: { 남성: {}, 여성: {} },
    누계: { 남성: {}, 여성: {} },
  });
  const updateCategoryCounts = () => {
    const newCounts: CategoryCounts = {
      일계: { 남성: {}, 여성: {} },
      월계: { 남성: {}, 여성: {} },
      누계: { 남성: {}, 여성: {} },
    };
  
    rows.forEach(row => {
      const { gender, sickCategory,time } = row;
  
     // 일계 업데이트
    if (gender) {
      if (!newCounts.일계[gender][sickCategory]) {
        newCounts.일계[gender][sickCategory] = 0;
      }
      newCounts.일계[gender][sickCategory]++;

      // 월계 업데이트
      if (time) {
        const month = new Date(time).toLocaleString('default', { month: 'long' }); // 예: "January"
        if (!newCounts.월계[gender][month]) {
          newCounts.월계[gender][month] = 0;
        }
        newCounts.월계[gender][month]++;
      }

      // 누계 업데이트
      if (!newCounts.누계[gender][sickCategory]) {
        newCounts.누계[gender][sickCategory] = 0;
      }
      newCounts.누계[gender][sickCategory]++;
    }
  });

  setCategoryCounts(newCounts);
  console.log("Updated Counts:", newCounts);
};

  const handleGenderChange = (id: number, gender: "남성" | "여성") => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, gender } : row
    );
    setRows(updatedRows);
    updateCategoryCounts();
  };

  const handleSickChange = (id: number, sickCategory: string) => { //변명이 변경되면 업데이트
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, sickCategory } : row
    );
    setRows(updatedRows);
    updateCategoryCounts();
  };


  
  const handleSave = async () => {
    try {
      const response = await axios.post("http://your-api.com/data", rows);
      console.log("POST 데이터 저장 성공:", response.data);
      alert("저장되었습니다");
    } catch (error) {
      console.error("POST 데이터 저장 실패:", error);
    }
  };

  const handleDateSelect = useCallback(async (date: string) => {
    setSelectedDate(date);
  }, []);

  return (
    <>
      <Nav />
      <S.Table>
        <thead>
          <tr>
            <S.NumberTh scope="col">연번</S.NumberTh>
            <S.ClassTh scope="col">학년반</S.ClassTh>
            <S.NameTh scope="col">이름</S.NameTh>
            <S.GenderTh scope="col">성별</S.GenderTh>
            <S.SickTh scope="col">병명</S.SickTh>
            <S.HandleTh as="th" scope="col">처치</S.HandleTh>
            <S.TimeTh scope="col">시간</S.TimeTh>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <TableRow
              key={row.id}
              row={row}
              index={index}
              onEnter={() => setRows([...rows, { id: rows.length + 1, class: "", name: "", gender: "", time: "", details: "", sickCategory: "" }])}
              onDelete={(id) => setRows(rows.filter(row => row.id !== id))}
              onChange={(id, field, value) => setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row))}
              onSickChange={handleSickChange}
              onGenderChange={handleGenderChange}
            />))}
        </tbody>
      </S.Table>
      <CountDate categoryCounts={categoryCounts} />
      <S.SaveButton onClick={handleSave}>
        <S.SaveButtonText>저장하기</S.SaveButtonText>
      </S.SaveButton>
      <S.CalenderWhite>
        <Calendar onDateSelect={handleDateSelect} />
        <Today />
      </S.CalenderWhite>
      <S.StudentSheetCheck>
        <Search />
        <S.StudentSheetCheckText>학생 문진 기록 확인</S.StudentSheetCheckText>
      </S.StudentSheetCheck>
    </>
  );
}

export default Sheet;
