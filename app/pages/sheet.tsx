import React, { useState, useEffect, useCallback } from "react";
import * as S from "../styles/sheet";
import Nav from "../components/Nav";
import Calendar from "../components/Calendar";
import SickDropdown from "../components/SickDropdown";
import Today from "../components/Today";
import Search from "../components/Search";
import CountDate from "../components/CountDate"; 
import axios from "axios";

// 각 행의 필요한 속성
interface TableRowProps {
  row: RowData;
  index: number;
  onEnter: () => void;
  onDelete: (id: number) => void;
  onChange: (id: number, field: string, value: string) => void;
  onSickChange: (id: number, sickCategory: string) => void;
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

function TableRow({ row, index, onEnter, onDelete, onChange, onSickChange }: TableRowProps) {
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

  return (
    <tr>
      <S.Td><S.Number>{index + 1}</S.Number></S.Td>
      <S.Td><S.ClassInput name="class" value={row.class} onChange={(e) => onChange(row.id, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
      <S.Td><S.NameInput name="name" value={row.name} onChange={(e) => onChange(row.id, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
      <S.Td><S.GenderInput name="gender" value={row.gender} onChange={(e) => onChange(row.id, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
      <S.Td><SickDropdown data={["호흡기계", "소화기계", "순환기계", "정신신경계", "피부피하계", "비뇨생식기계", "구강치아계", "이빈인후과계", "안과계", "감염병", "기타"]} onChange={handleSickChange} /></S.Td>
      <S.Td><S.Textarea name="details" value={row.details} onChange={(e) => onChange(row.id, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
      <S.Td><S.TimeInput name="time" value={row.time} onKeyDown={handleKeyDown} onChange={(e) => onChange(row.id, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
    </tr>
  );
}

function Sheet() {
  const [rows, setRows] = useState<RowData[]>([{ id: 1, class: "", name: "", gender: "", time: "", details: "", sickCategory: "" }]); // 행 데이터
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택된 날짜
  const [categoryCounts, setCategoryCounts] = useState<{ 
    일계: { 남성: Record<string, number>; 여성: Record<string, number>; };
    월계: { 남성: Record<string, number>; 여성: Record<string, number>; };
    누계: { 남성: Record<string, number>; 여성: Record<string, number>; };
  }>({
    일계: { 남성: {}, 여성: {} },
    월계: { 남성: {}, 여성: {} },
    누계: { 남성: {}, 여성: {} },
  });

  // 선택된 날짜 선정 후 get 받아오기
  useEffect(() => {
    if (selectedDate) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${selectedDate}`);
          setRows(response.data);
        } catch (error) {
          console.error("get 데이터 로드 실패:", error);
        }
      };
      fetchData(); 
    }
  }, [selectedDate]);
  const handleSickChange = (id: number, sickCategory: string) => {
    const date = selectedDate || new Date().toISOString().split('T')[0]; // 선택된 날짜가 없으면 오늘 날짜로
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, sickCategory } : row
    );
    setRows(updatedRows);
  
    const gender = updatedRows.find(row => row.id === id)?.gender; // 성별을 찾기
  
    // 병명 카운트 업데이트
    setCategoryCounts(prevCounts => {
      const newCounts = { ...prevCounts };
      
      // 성별에 따라 카운트 객체 선택
      const genderKey = gender === "남성" ? "남성" : "여성";
  
      // 병명 카운트 업데이트
      if (!newCounts.일계[genderKey][sickCategory]) {
        newCounts.일계[genderKey][sickCategory] = 0;
      }
      newCounts.일계[genderKey][sickCategory] += 1;
  
      // 월계 및 누계도 비슷하게 업데이트할 수 있습니다.
      if (!newCounts.월계[genderKey][sickCategory]) {
        newCounts.월계[genderKey][sickCategory] = 0;
      }
      newCounts.월계[genderKey][sickCategory] += 1;
  
      if (!newCounts.누계[genderKey][sickCategory]) {
        newCounts.누계[genderKey][sickCategory] = 0;
      }
      newCounts.누계[genderKey][sickCategory] += 1;
  
      return newCounts;
    });
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
