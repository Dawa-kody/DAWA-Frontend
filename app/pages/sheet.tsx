'use client';
import React, { useState, useEffect, useCallback } from "react";
import * as S from "../styles/sheet";
import Nav from "../components/Nav";
import Calendar from "../components/Calendar";
import SickDropdown from '../components/SickDropdown';
import Today from '../components/Today';
import Search from "../components/Search";
import axios from "axios";

interface TableRowProps {
  row: RowData;
  index: number;
  onEnter: () => void;
  onDelete: (id: number) => void;
  onChange: (id: number, field: string, value: string) => void;
  onSickChange: (id: number, sickCategory: string) => void;
}

interface RowData {
  id: number;
  class: string;
  name: string;
  gender: string;
  time: string;
  details: string;
  sickCategory: string;
}

function TableRow({ row, index, onEnter, onDelete, onChange, onSickChange }: TableRowProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onEnter();
    }
    if (e.key === "Backspace" && row.time.trim() === "") {
      onDelete(row.id);
    }
  };

  const handleSickChange = (sickCategory: string) => {
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
  const [rows, setRows] = useState<RowData[]>([{ id: 1, class: "", name: "", gender: "", time: "", details: "", sickCategory: "" }]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({
    호흡기계: 0,
    소화기계: 0,
    순환기계: 0,
    정신신경계: 0,
    피부피하계: 0,
    비뇨생식기계: 0,
    구강치아계: 0,
    이빈인후과계: 0,
    안과계: 0,
    감염병: 0,
    기타: 0,
  });

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate) {
        try {
          const response = await axios.get(`http://your-api.com/data?date=${selectedDate}`);
          setRows(response.data);
          console.log("get 데이터 성공", response.data);
        } catch (error) {
          console.error("get 데이터 로드 실패:", error);
        }
      }
    };
    fetchData();
  }, [selectedDate]);

  const addRow = () => {
    setRows((prev) => [...prev, { id: prev.length + 1, class: "", name: "", gender: "", time: "", details: "", sickCategory: "" }]);
  };

  const deleteRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const updateRow = (id: number, field: string, value: string) => {
    setRows((prev) => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const updateCategoryCounts = (sickCategory: string) => {
    setCategoryCounts((prevCounts) => ({
      ...prevCounts,
      [sickCategory]: prevCounts[sickCategory] + 1,
    }));
  };

  const handleSickChange = (id: number, sickCategory: string) => {
    setRows((prev) => prev.map(row => row.id === id ? { ...row, sickCategory } : row));
    updateCategoryCounts(sickCategory);
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
    setSelectedDate(date); // 선택된 날짜를 상태에 저장
    try {
      const response = await axios.get(`http://your-api.com/data?date=${date}`);
      setRows(response.data); // 가져온 데이터를 상태에 저장
      console.log("get데이터 로드 성공:", response.data);
    } catch (error) {
      console.error("get데이터 로드 실패:", error);
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
              key={row.id}
              row={row}
              index={index}
              onEnter={addRow}
              onDelete={deleteRow}
              onChange={updateRow}
              onSickChange={handleSickChange} // onSickChange 전달
            />
          ))}
        </tbody>
      </S.Table>

      <S.TotalTable>
        <thead>
          <tr>
            <S.Total scope="col"><S.Font>종류</S.Font></S.Total>
            <S.Gender scope="col"><S.Font>성별</S.Font></S.Gender>
            <S.Respiratory scope="col"><S.Font>호흡기계</S.Font></S.Respiratory>
            <S.Digestivesystem scope="col"><S.Font>소화기계</S.Font></S.Digestivesystem>
            <S.Circulatorysystem scope="col"><S.Font>순환기계</S.Font></S.Circulatorysystem>
            <S.Spirit scope="col"><S.Font>정신신경계</S.Font></S.Spirit>
            <S.Skin scope="col"><S.Font>피부피하계</S.Font></S.Skin>
            <S.Urogenital scope="col"><S.Font>비뇨생식기계</S.Font></S.Urogenital>
            <S.Teeth scope="col"><S.Font>구강치아계</S.Font></S.Teeth>
            <S.Ibinolaryngology scope="col"><S.Font>이비인후과계</S.Font></S.Ibinolaryngology>
            <S.Ophthalmology scope="col"><S.Font>안과계</S.Font></S.Ophthalmology>
            <S.Infection scope="col"><S.Font>감염병</S.Font></S.Infection>
            <S.Gita scope="col"><S.Font>기타</S.Font></S.Gita>
            <S.Gue scope="col"><S.Font>계</S.Font></S.Gue>
          </tr>
        </thead>
        <tbody>
          <tr>
          <S.TotalTd rowSpan={2}><S.TdText>일계</S.TdText></S.TotalTd>
          <S.TotalTd><S.TdText>남</S.TdText></S.TotalTd>
          </tr>
          <tr>
            <S.TotalTd><S.TdText>여</S.TdText></S.TotalTd>
          </tr>
          <tr>
            <S.TotalTd rowSpan={2}><S.TdText>월계</S.TdText>     
              </S.TotalTd>
              <S.TotalTd><S.TdText>남</S.TdText></S.TotalTd>

          </tr>
          <tr>
            <S.TotalTd><S.TdText>여</S.TdText></S.TotalTd>
          </tr>
          <tr>
            <S.TotalTd rowSpan={2}><S.TdText>누계</S.TdText></S.TotalTd>
            <S.TotalTd><S.TdText>남</S.TdText></S.TotalTd>
          </tr>
          <tr>
            <S.TotalTd><S.TdText>여</S.TdText></S.TotalTd>
          </tr>
        </tbody>
      </S.TotalTable>


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
