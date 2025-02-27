"use client";
import React from 'react';
import * as S from "../styles/sheet";

interface CountDateProps {
  categoryCounts: CategoryCounts;
}

interface CategoryCounts {
  일계: GenderCounts;
  월계: GenderCounts;
  누계: GenderCounts;
}

interface GenderCounts { //성별 카운트
  남성: {
    호흡기계?: number; 
    소화기계?: number;
    순환기계?: number;
    정신신경계?: number;
    피부피하계?: number;
    비뇨생식기계?: number;
    구강치아계?: number;
    이비인후과계?: number;
    안과계?: number;
    감염병?: number;
    상담?: number;
    기타?: number;
  };
  여성: {
    호흡기계?: number;
    소화기계?: number;
    순환기계?: number;
    정신신경계?: number;
    피부피하계?: number;
    비뇨생식기계?: number;
    구강치아계?: number;
    이비인후과계?: number;
    안과계?: number;
    감염병?: number;
    상담?: number;
    기타?: number;
  };
}

const GenderCategoryRow = ({ label, counts }: { label: string; counts: GenderCounts }) => (
  <>
    <tr>
      <S.TotalTd rowSpan={2}><S.TdText>{label}</S.TdText></S.TotalTd>
      <S.TotalTd><S.TdText>남</S.TdText></S.TotalTd>
      <S.RespiratoryCount><S.TdText>{counts.남성.호흡기계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.남성.소화기계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.남성.순환기계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.남성.정신신경계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.남성.피부피하계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.남성.비뇨생식기계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.남성.구강치아계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.남성.이비인후과계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.남성.안과계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.남성.감염병 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.남성.상담 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.남성.기타 ?? 0}</S.TdText></S.RespiratoryCount>
    </tr>
    <tr>
      <S.TotalTd><S.TdText>여</S.TdText></S.TotalTd>
      <S.RespiratoryCount><S.TdText>{counts.여성.호흡기계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.여성.소화기계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.여성.순환기계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.여성.정신신경계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.여성.피부피하계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.여성.비뇨생식기계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.여성.구강치아계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.여성.이비인후과계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.여성.안과계 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.여성.감염병 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.여성.상담 ?? 0}</S.TdText></S.RespiratoryCount>
      <S.RespiratoryCount><S.TdText>{counts.여성.기타 ?? 0}</S.TdText></S.RespiratoryCount>
    </tr>
  </>
);

const CountDate: React.FC<CountDateProps> = ({ categoryCounts }) => {
  return (
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
        <GenderCategoryRow label="일계" counts={categoryCounts.일계} />
        <GenderCategoryRow label="월계" counts={categoryCounts.월계} />
        <GenderCategoryRow label="누계" counts={categoryCounts.누계} />
      </tbody>
    </S.TotalTable>
  );
};

export default CountDate;
