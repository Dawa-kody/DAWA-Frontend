import React from "react";
import * as S from "../styles/RentData";

export interface RentDatas {
    id: number;
    count: string;
    formattedDate: string;
    rental: string;
    Return: boolean;
}

function RentData({ count, formattedDate, rental, Return }: Omit<RentDatas, "id">) {
    return (
        <S.Container>
            <S.ItemName>{rental}</S.ItemName>
            <S.Line />
            {Return ? (
                <S.ReturnTrue>반납완료</S.ReturnTrue>
            ) : (
                <S.ReturnFalse>미반납</S.ReturnFalse>
            )}
            <S.ListDiv>
                <S.NumberTitle>개수</S.NumberTitle>
                <S.DateTitle>날짜</S.DateTitle>
                <S.Number>{count}개</S.Number>
                <S.Date>{formattedDate}</S.Date>
            </S.ListDiv>
            <S.BottomDiv />
        </S.Container>
    );
}

export default RentData;