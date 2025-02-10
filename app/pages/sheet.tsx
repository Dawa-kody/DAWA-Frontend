'use client'

import React from 'react'
import * as S from '../styles/sheet';

import Nav from '../components/Nav';

function Sheet() {
  return (
    <>
      <Nav />
      *<S.Table>
       <thead>
          <S.Tr>
            <S.NumberTh scope="col">연번</S.NumberTh>
            <S.ClassTh scope="col">학년반</S.ClassTh>
            <S.NameTh scope="col">이름</S.NameTh>
            <S.GenderTh scope="col">성별</S.GenderTh>
            <S.SickTh scope="col">병명</S.SickTh>
            <S.HandleTh as="th" scope="col">처치</S.HandleTh>
            <S.TimeTh scope="col">시간</S.TimeTh>
          </S.Tr>
        </thead>

        <tbody>
          <S.Tr>
            <tr>

            <S.Td><S.Shortinput type="text" defaultValue="" /></S.Td>
            <S.Td><S.Mediuminput2 type="text" defaultValue="" /></S.Td>
            <S.Td><S.Mediuminput2 type="text" defaultValue="" /></S.Td>
            <S.Td><S.Shortinput type="text" defaultValue="" /></S.Td>
            <S.Td><S.Mediuminput2 type="text" defaultValue="" /></S.Td>
            <S.Td><S.Longinput3 type="text" defaultValue="" /></S.Td>
            <S.Td><S.Shortinput type="text" defaultValue="" /></S.Td>
            </tr>
          </S.Tr>
        </tbody>
      </S.Table>
    </>
  );
}

export default Sheet;
