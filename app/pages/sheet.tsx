import React, { useState, useEffect, useCallback } from "react";
import * as S from "../styles/sheet";
import Nav from "../components/Nav"; //nav
import Calendar from "../components/Calendar"; //캘런더
import SickDropdown from "../components/SickDropdown"; //병명 드롭다운 
import GenderDropdown from "../components/GenderDropdown"; //성별 드롭다운
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
  serialNumber : number;
  schoolNumber: string;
  userName: string;
  gender: "" | "남성" | "여성";
  time: string;
  content: string;
  disease: string;
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
    onSickChange(row.serialNumber , sickCategory);
  };

  const handleGenderChange = (gender: "남성" | "여성") => { // 성별 드롭다운 onChange
    onGenderChange(row.serialNumber , gender);
  };

  return (
    <tr>
     <S.Td><S.Number>{index + 1}</S.Number></S.Td>
      <S.Td><S.ClassInput name="schoolNumber" value={row.schoolNumber} onChange={(e) => onChange(row.serialNumber, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
      <S.Td><S.NameInput name="userName" value={row.userName} onChange={(e) => onChange(row.serialNumber, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
      <S.Td><GenderDropdown data={["남성", "여성"]} onChange={handleGenderChange} value={row.gender} /></S.Td>
      <S.Td><SickDropdown data={["호흡기계", "소화기계", "순환기계", "정신신경계", "피부피하계", "비뇨생식기계", "구강치아계", "이빈인후과계", "안과계", "감염병", "기타"]} onChange={handleSickChange} /></S.Td>
      <S.Td><S.Textarea name="content" value={row.content} onChange={(e) => onChange(row.serialNumber, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
      <S.Td><S.TimeInput name="time" value={row.time} onKeyDown={handleKeyDown} onChange={(e) => onChange(row.serialNumber, e.target.name, e.target.value)} autoComplete="off" /></S.Td>
    </tr>
  );
}

function Sheet() {
  const [rows, setRows] = useState<RowData[]>(() => {
    const storedRows = localStorage.getItem("rows");
    return storedRows ? JSON.parse(storedRows) : [{ serialNumber: 1, schoolNumber: "", userName: "", gender: "", time: "", content: "", disease: "" }];
  });
  
  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows));
  }, [rows]);

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
      const { gender, disease, time } = row;
  
      // 일계 업데이트
      if (gender) {
        if (!newCounts.일계[gender][disease]) {
          newCounts.일계[gender][disease] = 0;
        }
        newCounts.일계[gender][disease]++;
  
        // 월계 업데이트
        if (time) {
          const month = new Date(time).toLocaleString('default', { month: 'long' }); // 예: "January"
          if (!newCounts.월계[gender][month]) {
            newCounts.월계[gender][month] = 0;
          }
          newCounts.월계[gender][month]++;
        }
  
        // 누계 업데이트
        if (!newCounts.누계[gender][disease]) {
          newCounts.누계[gender][disease] = 0;
        }
        newCounts.누계[gender][disease]++;
      }
    }); 
  
    setCategoryCounts(newCounts); 
    console.log("Updated Counts:", newCounts);
  };
  

  const handleGenderChange = (id: number, gender: "남성" | "여성") => {
    const updatedRows = rows.map((row) =>
      row.serialNumber  === id ? { ...row, gender } : row
    );
    setRows(updatedRows);
    updateCategoryCounts();
  };

  const handleSickChange = (id: number, sickCategory: string) => { //변명이 변경되면 업데이트
    const updatedRows = rows.map((row) =>
      row.serialNumber  === id ? { ...row, sickCategory } : row
    );
    setRows(updatedRows);
    updateCategoryCounts();
  };
  const handleSave = async () => { // 저장하기 눌렀을 때 POST
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/questionnaire/write`, rows);
      console.log("POST 데이터 저장 성공:", response.data);
      alert("저장되었습니다");
      localStorage.setItem("rows", JSON.stringify(rows));
    } catch (error) {
      console.error("POST 데이터 저장 실패:", error);
    }
  };
  const handleDateSelect = useCallback(async (date: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/questionnaire/date`, { params: { date } });
      
      if (Array.isArray(response.data)) {
        setRows(response.data);
        localStorage.setItem("rows", JSON.stringify(response.data));
      } else {
        console.error("응답 데이터가 배열이 아닙니다:", response.data);
        alert("데이터를 불러오는 데 문제가 발생했습니다. 서버 응답을 확인하세요.");
      }
    } catch (error) {
      console.error("get 데이터 가져오기 실패:", error);
      alert("데이터 가져오기 실패. 네트워크를 확인하세요.");
    }
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
              key={row.serialNumber }
              row={row}
              index={index}
              rows={rows}
              onEnter={() => setRows([...rows, { serialNumber : rows.length + 1, schoolNumber: "", userName: "", gender: "", time: "", content: "", disease: "" }])}
              onDelete={(id) => setRows(rows.filter(row => row.serialNumber  !== id))}
              onChange={(id, field, value) => setRows(rows.map(row => row.serialNumber  === id ? { ...row, [field]: value } : row))}
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