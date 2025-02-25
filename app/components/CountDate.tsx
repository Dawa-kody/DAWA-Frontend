import React from 'react';
import * as S from "../styles/sheet";

interface CountDateProps {
  categoryCounts: {
    일계: {
      남성: Record<string, number>;
      여성: Record<string, number>;
    };
    월계: {
      남성: Record<string, number>;
      여성: Record<string, number>;
    };
    누계: {
      남성: Record<string, number>;
      여성: Record<string, number>;
    };
  };
}

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
        <tr>
          <S.TotalTd rowSpan={2}><S.TdText>일계</S.TdText></S.TotalTd>
          <S.TotalTd><S.TdText>남</S.TdText></S.TotalTd>
          <S.RespiratoryCount><S.TdText>{categoryCounts.일계.남성.호흡기계}</S.TdText></S.RespiratoryCount>
        </tr>
        <tr>
          <S.TotalTd><S.TdText>여</S.TdText></S.TotalTd>
          <S.RespiratoryCount><S.TdText>{categoryCounts.일계.여성.호흡기계}</S.TdText></S.RespiratoryCount>
        </tr>
        <tr>
          <S.TotalTd rowSpan={2}><S.TdText>월계</S.TdText></S.TotalTd>
          <S.TotalTd><S.TdText>남</S.TdText></S.TotalTd>
          <S.RespiratoryCount><S.TdText>{categoryCounts.월계.남성.호흡기계}</S.TdText></S.RespiratoryCount>
        </tr>
        <tr>
          <S.TotalTd><S.TdText>여</S.TdText></S.TotalTd>
          <S.RespiratoryCount><S.TdText>{categoryCounts.월계.여성.호흡기계}</S.TdText></S.RespiratoryCount>
        </tr>
        <tr>
          <S.TotalTd rowSpan={2}><S.TdText>누계</S.TdText></S.TotalTd>
          <S.TotalTd><S.TdText>남</S.TdText></S.TotalTd>
          <S.RespiratoryCount><S.TdText>{categoryCounts.누계.남성.호흡기계}</S.TdText></S.RespiratoryCount>
        </tr>
        <tr>
          <S.TotalTd><S.TdText>여</S.TdText></S.TotalTd>
          <S.RespiratoryCount><S.TdText>{categoryCounts.누계.여성.호흡기계}</S.TdText></S.RespiratoryCount>
        </tr>
      </tbody>
    </S.TotalTable>
  );
};

export default CountDate;
