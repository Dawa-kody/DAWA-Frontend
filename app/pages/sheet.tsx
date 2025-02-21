  "use client";
  import React,{useState} from "react";
  import * as S from "../styles/sheet";
  import Nav from "../components/Nav";
  import Calendar from "../components/Calendar";
  import SickDropdown from '../components/SickDropdown';
  import Today from '../components/Today';
  import Search from "../components/Search";
  import axios from "axios";

  interface TableRowProps {
    rowId: number;
    index: number;
    onEnter: () => void;
    onDelete: (id: number) => void;
  }
  
  function TableRow({ rowId, index, onEnter, onDelete }: TableRowProps) {
    const [values, setValues] = useState({
      class: "",
      name: "",
      gender: "",
      time: "",
      details: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onEnter();
      if (e.key === "Backspace" && values.time.trim() === "") onDelete(rowId);
    };
    return (
      <tr>
      <S.Td><S.Number>{index + 1}</S.Number></S.Td>
      <S.Td><S.ClassInput name="class" value={values.class} onChange={handleChange} /></S.Td>
      <S.Td><S.NameInput name="name" value={values.name} onChange={handleChange} /></S.Td>
      <S.Td><S.GenderInput name="gender" value={values.gender} onChange={handleChange} /></S.Td>
      <S.Td><SickDropdown data={["호흡기계", "소화기계", "순환기계", "정신신경계", "피부피하계", "비뇨생식기계", "구강치아계", "이빈인후과계", "안과계", "감염병", "기타"]} /></S.Td>
      <S.Td><S.Textarea name="details" value={values.details} onChange={handleChange} /></S.Td>
      <S.Td><S.TimeInput name="time" value={values.time} onKeyDown={handleKeyDown} onChange={handleChange} /></S.Td>
      </tr>
    );
  }

  function Sheet() {  

    const [rows, setRows] = useState([{ id: 1 }]); // 첫 번째 행을 1로 시작
    const addRow = () => {
      setRows((prev) => [...prev, { id: prev.length + 1 }]); // 행 추가 시 id 증가
    };
    const deleteRow = (id: number) => {
      setRows((prev) => prev.filter((row) => row.id !== id));
    };
    

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
            <TableRow key={row.id} rowId={row.id} index={index} onEnter={addRow} onDelete={deleteRow} />))}
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
        <S.CalenderWhite>
          <Today/>
          <Calendar/>
        </S.CalenderWhite>
        <S.StudentSheetCheck>
          <Search/>
          <S.StudentSheetCheckText>학생 문진 기록 확인</S.StudentSheetCheckText>
        </S.StudentSheetCheck>

      </>
    );
  }

  export default Sheet;
