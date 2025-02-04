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
            <S.Td>1</S.Td>
            <S.Td>김우직</S.Td>
            <S.Td>1104</S.Td>
            <S.Td>남</S.Td>
            <S.Td>깨병</S.Td>
            <S.Td>잘 어루고 달램</S.Td>
            <S.Td>11:52</S.Td>
          </S.Tr>
        </tbody>
      </S.Table>
    </>
  );
}

export default Sheet;
