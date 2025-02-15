"use client";

import React from "react";
import * as S from "../styles/sheet";

import Nav from "../components/Nav";
import Calendar from "../components/Calendar";
import Dropdown from '../components/Dropdown';

function TableRow() {
  return (
    <tr>
    

      <S.Td>
        <S.Shortinput type="text" defaultValue="" />
      </S.Td>
      <S.Td>
        <S.Mediuminput2 type="text" defaultValue="" />
      </S.Td>
      <S.Td>
        <S.Mediuminput2 type="text" defaultValue="" />
      </S.Td>
      <S.Td>
        <S.Shortinput type="text" defaultValue="" />
      </S.Td>
      <S.Td>
        <S.Mediuminput2 type="text" defaultValue="" />
      </S.Td>
      <S.Td>
        <S.Textarea />
      </S.Td>
      <S.Td>
        <S.Shortinput type="text" defaultValue="" />
      </S.Td>

    </tr>
  );
}

function Sheet() {
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
            <S.HandleTh as="th" scope="col">
              처치
            </S.HandleTh>
            <S.TimeTh scope="col">시간</S.TimeTh>
          </tr>
        </thead>
        <tbody>
          <TableRow />
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
        <S.TotalTd rowSpan={2}><S.TdText>일계</S.TdText>
          <Dropdown data={["2023", "2024", "2025"]} />
        </S.TotalTd>
        <S.TotalTd>남</S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
      </tr>
      <tr>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
      </tr>
    <tr>
      <S.TotalTd rowSpan={2}><S.TdText>월계</S.TdText>
          <Dropdown data={["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]} />
        </S.TotalTd>
        <S.TotalTd>남</S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
        <S.TotalTd><S.TdText>0</S.TdText></S.TotalTd>
    </tr>
  </tbody>
</S.TotalTable>
      <S.CalenderWhite>
        <Calendar />
      </S.CalenderWhite>
      <S.StudentSheetCheck>
        <S.StudentSheetCheckText>학생 문진 기록 확인</S.StudentSheetCheckText>
      </S.StudentSheetCheck>

    </>
  );
}

export default Sheet;
