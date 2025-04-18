import React from "react";
import * as S from '../styles/VisitDataAdmin';

export interface VisitAdminDatas {
    id: number,
    formattedDate : string,
    dayOfWeek: string,
    content: string,
    name: string,
}

function VisitDataAdmin({formattedDate , dayOfWeek, content, name}: Omit<VisitAdminDatas, "id">){
    return(
        <S.Container>
            <S.Date>{formattedDate}</S.Date>
            <S.Week>{dayOfWeek}</S.Week>
            <S.ContentLine />
            <S.Student>학생</S.Student>
            <S.StudentName>{name}</S.StudentName>
            <S.ContentBox maxLength={83} readOnly disabled>{content}</S.ContentBox>
        </S.Container>
    );
}

export default VisitDataAdmin;