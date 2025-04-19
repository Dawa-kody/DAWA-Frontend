'use client';

import { useCalendarStore } from '@/store/useCalendarStore';
import * as S from '../styles/Mainsheet';

const divisionMap: { [key: string]: string } = {
  RESPIRATORY_SYSTEM: '호흡기계',
  DIGESTIVE_SYSTEM: '소화기계',
  CIRCULATORY_SYSTEM: '순환기계',
  NERVOUS_SYSTEM: '정신신경계',
  MUSCULOSKELETAL_SYSTEM: '근골격계',
  INTEGUMENTARY_SYSTEM: '피부피하계',
  UROGENITAL_SYSTEM: '비뇨생식기계',
  DENTAL_SYSTEM: '구강치아계',
  OTORHINOLARYNGOLOGY: '이비인후과계',
  OPHTHALMOLOGY_SYSTEM: '안과계',
  INFECTIOUS_DISEASE: '감염병',
  MENTAL_COUNSELING: '상담',
  OTHER: '기타',
};

const genderMap: { [key: string]: string } = {
  MAN: '남성',
  WOMAN: '여성',
};

function MainSheet() {
  const questionnaires = useCalendarStore((state) => state.questionnaires);

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
        {questionnaires.length ? (
          questionnaires.map((item, idx) => (
            <tr key={item.serialNumber}>
              <S.Td><S.Count>{idx + 1}</S.Count></S.Td>
              <S.Td><S.Class />{item.userName}</S.Td>
              <S.Td><S.Name />{item.schoolNumber}</S.Td>
              <S.Td><S.Gender />{genderMap[item.gender] || item.gender}</S.Td>
              <S.Td><S.Division />{divisionMap[item.division] || item.division}</S.Td>
              <S.Td><S.Symptom />{item.disease}</S.Td>
              <S.Td><S.Handle />{item.treatment}</S.Td>
              <S.Td><S.Guesu />{item.quantity}</S.Td>
              <S.Td><S.Medicine1 />{item.medication1}</S.Td>
              <S.Td><S.Guesu1 />{item.quantity1}</S.Td>
              <S.Td><S.Medicine2 />{item.medication2}</S.Td>
              <S.Td><S.Guesu2 />{item.quantity2}</S.Td>
              <S.Td><S.Bingo />{item.notes}</S.Td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={13} className="p-4 text-center">
              로딩 중이거나 데이터가 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </S.Table>
  );
}

export default MainSheet;