'use client'

import React from 'react'
import * as S from '../styles/sheet';

import Nav from '../components/Nav';



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
            <S.HandleTh as="th" scope="col">처치</S.HandleTh>
            <S.TimeTh scope="col">시간</S.TimeTh>
        </tr>
        </thead>
        <tbody>
          <tr>
            <S.Td><S.Shortinput type="text" defaultValue="" /></S.Td>
            <S.Td><S.Mediuminput2 type="text" defaultValue="" /></S.Td>
            <S.Td><S.Mediuminput2 type="text" defaultValue="" /></S.Td>
            <S.Td><S.Shortinput type="text" defaultValue="" /></S.Td>
            <S.Td><S.Mediuminput2 type="text" defaultValue="" /></S.Td>
            <S.Td><S.Textarea></S.Textarea></S.Td>
            <S.Td><S.Shortinput type="text" defaultValue="" /></S.Td>
          </tr>
        </tbody>
      </S.Table>
      <S.TotalTable>
        <thead>
          <tr>
          <S.Total scope="col">종류</S.Total>
          <S.Gender scope="col">성별</S.Gender>
          <S.Respiratory scope="col">호흡기계</S.Respiratory>
          <S.Digestivesystem scope="col">소화기계</S.Digestivesystem>
          <S.Circulatorysystem scope="col">순환기계</S.Circulatorysystem>
          <S.HandleTh as="th" scope="col">정신신경계</S.HandleTh>
          <S.TimeTh scope="col">피부피하게</S.TimeTh>
          </tr>
        </thead>
      </S.TotalTable>
      <S.CalenderWhite></S.CalenderWhite>
      <S.StudentSheetCheck></S.StudentSheetCheck>
    </>
  );
}

export default Sheet;