import React from "react";
import * as S from '../styles/VisitsData';

export interface VisitDatas {
    id: number,
    formattedDate : string,
    dayOfWeek: string,
    content: string,
}

function VisitData({formattedDate , dayOfWeek, content}: Omit<VisitDatas, "id">){
    return(
        <S.Container>
            <S.Date>{formattedDate}</S.Date>
            <S.Week>{dayOfWeek}</S.Week>
            <S.ContentLine />
            <S.ContentBox maxLength={83} readOnly disabled>{content}</S.ContentBox>
        </S.Container>
    );
}

export default VisitData;