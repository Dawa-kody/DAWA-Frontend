import React from "react";
import * as S from '../styles/VisitsData';

export interface VisitDatas {
    id: number,
    Date: string,
    Week: string,
    Content: string,
}

function VisitData({Date, Week, Content}: Omit<VisitDatas, "id">){
    return(
        <S.Container>
            <S.Date>{Date}</S.Date>
            <S.Week>{Week}</S.Week>
            <S.ContentLine />
            <S.ContentBox maxLength={83} readOnly disabled>{Content}</S.ContentBox>
        </S.Container>
    );
}

export default VisitData;