import React from "react";
import * as S from "../styles/RentDataAdmin";

export interface RentAdminDatas {
    id: number;
    count: string;
    formattedDate: string;
    rental: string;
    rentaled: boolean;
    name: string;
}

function RentDataAdmin({ count, formattedDate, rental, rentaled, name }: Omit<RentAdminDatas, "id">) {
    return (
        <S.Container>
            <S.ItemName>{rental}</S.ItemName>
            <S.Line />
            {rentaled ? (
                <S.ReturnTrue>반납완료</S.ReturnTrue>
            ) : (
                <S.ReturnFalse>미반납</S.ReturnFalse>
            )}
            <S.ListDiv>
                <S.NumberTitle>개수</S.NumberTitle>
                <S.DateTitle>날짜</S.DateTitle>
                <S.student>학생</S.student>
                <S.Number>{count}개</S.Number>
                <S.Date>{formattedDate}</S.Date>
                <S.StudentName>{name}</S.StudentName>
            </S.ListDiv>
            <S.BottomDiv />
        </S.Container>
    );
}

export default RentDataAdmin;