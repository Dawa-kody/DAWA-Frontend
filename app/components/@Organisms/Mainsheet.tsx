'use client';

import { useCalendarStore } from '@/store/useCalendarStore';
import * as S from '../../styles/Mainsheet';

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

export function MainSheet() {
  const questionnaires = useCalendarStore((state) => state.questionnaires);

  return (
    <S.TableWrapper>
      <S.Table>
        <thead>
          <tr>
            <S.Th scope="col">연번</S.Th>
            <S.Th scope="col">학년반</S.Th>
            <S.Th scope="col">이름</S.Th>
            <S.Th scope="col">성별</S.Th>
            <S.Th scope="col">구분</S.Th>
            <S.Th scope="col">증상</S.Th>
            <S.Th scope="col">처치상황</S.Th>
            <S.Th scope="col">수량</S.Th>
            <S.Th scope="col">투약1</S.Th>
            <S.Th scope="col">수량 1</S.Th>
            <S.Th scope="col">투약 2</S.Th>
            <S.Th scope="col">수량 2</S.Th>
            <S.Th scope="col">비고</S.Th>
          </tr>
        </thead>
        <tbody>
          {questionnaires.length ? (
            questionnaires.map((item, idx) => (
              <tr key={item.serialNumber}>
                <S.Td><S.Cell>{idx + 1}</S.Cell></S.Td>
                <S.Td><S.Cell>{item.userName}</S.Cell></S.Td>
                <S.Td><S.Cell>{item.schoolNumber}</S.Cell></S.Td>
                <S.Td><S.Cell>{genderMap[item.gender] || item.gender}</S.Cell></S.Td>
                <S.Td><S.Cell>{divisionMap[item.division] || item.division}</S.Cell></S.Td>
                <S.Td><S.Cell>{item.disease}</S.Cell></S.Td>
                <S.Td><S.Cell>{item.treatment}</S.Cell></S.Td>
                <S.Td><S.Cell>{item.quantity}</S.Cell></S.Td>
                <S.Td><S.Cell>{item.medication1}</S.Cell></S.Td>
                <S.Td><S.Cell>{item.quantity1}</S.Cell></S.Td>
                <S.Td><S.Cell>{item.medication2}</S.Cell></S.Td>
                <S.Td><S.Cell>{item.quantity2}</S.Cell></S.Td>
                <S.Td><S.Cell>{item.notes}</S.Cell></S.Td>
              </tr>
            ))
          ) : (
            <tr>
              <S.Td colSpan={13}>로딩 중이거나 데이터가 없습니다.</S.Td>
            </tr>
          )}
        </tbody>
      </S.Table>
    </S.TableWrapper>
  );
}
