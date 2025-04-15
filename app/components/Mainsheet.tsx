'use client';
import { useState } from "react";
import * as S from "../styles/Mainsheet";

function Td(props: { onEnter: () => void; onSpace: () => void }) {
  function handleKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      props.onEnter(); // Enter 입력 시 행 추가
    } else if (event.key === "Backspace") { 
      props.onSpace(); // Space 입력 시 행 삭제
    }
  }
return(
<>
<S.Td><S.Count ></S.Count></S.Td>
</>

)
}

function MainSheet() {
  const [rows, setRows] = useState<number[][]>([[...Array(13)].map(function(_, i) { return i; })]);
  const [count, setCount] = useState(0);

  function addRow() { //줄추가
    setRows(function(prevRows) {
      return [...prevRows, [...Array(13)].map(function(_, i) { return i; })];
      setCount((prevCount) => prevCount + 1);
    });
  }

  function removeRow(index: number) { //줄삭제
    setRows(function(prevRows) {
      return prevRows.filter(function(_, rowIndex) {
        return rowIndex !== index;
      });
    });
  }

  return (

    <S.Table>
      <thead>
        <tr>
          <S.CountTh scope="col">연번</S.CountTh>
          <S.ClassTh scope="col">학년반</S.ClassTh>
          <S.NameTh scope="col">이름</S.NameTh>
          <S.GenderTh scope="col">성별</S.GenderTh>
          <S.DivisionTh scope="col">구분</S.DivisionTh>
          <S.SymptomTh as="th" scope="col">증상</S.SymptomTh>
          <S.HandleTh scope="col">처치상황</S.HandleTh>
          <S.GuesuTh scope="col">수량</S.GuesuTh>
          <S.Medicine1Th scope="col">투약1</S.Medicine1Th>
          <S.Guesu1Th scope="col">수량 1</S.Guesu1Th>
          <S.Medicine2Th scope="col">투약 2</S.Medicine2Th>
          <S.Guesu2Th scope="col">수량 2</S.Guesu2Th>
          <S.BigoTh scope="col">비고</S.BigoTh>
        </tr>
      </thead>
      <tbody>
        <tr>
        <S.Td><S.Count></S.Count></S.Td>
        <S.Td><S.Class></S.Class></S.Td>
        <S.Td><S.Name></S.Name></S.Td>
        <S.Td><S.Gender></S.Gender></S.Td>
        <S.Td><S.Division></S.Division></S.Td>
        <S.Td><S.Symptom></S.Symptom></S.Td>
        <S.Td><S.Handle></S.Handle></S.Td>
        <S.Td><S.Guesu></S.Guesu></S.Td>
        <S.Td><S.Medicine1></S.Medicine1></S.Td>
        <S.Td><S.Guesu1></S.Guesu1></S.Td>
        <S.Td><S.Medicine2></S.Medicine2></S.Td>
        <S.Td><S.Guesu2></S.Guesu2></S.Td>
        <S.Td><S.Bingo></S.Bingo></S.Td>
        </tr>
        
      </tbody>
    </S.Table>
  );
}

export default MainSheet;
