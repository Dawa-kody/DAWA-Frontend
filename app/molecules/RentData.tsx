import React from "react";
import * as S from "../styles/RentData";

export interface RentDatas {
    id: number;
    count: string;
    formattedDate: string;
    accepted: boolean;
    rental: string;
    rentaled: boolean;
}

function RentData({ count, formattedDate, rental, rentaled, accepted }: Omit<RentDatas, "id">) {
    return (
        <S.Container>
            <S.ItemName>{rental}</S.ItemName>
            <S.Line />
            {!accepted && !rentaled ? (
                <S.Accept>신청중</S.Accept>
            ) : accepted && !rentaled ? (
                <S.ReturnFalse>미반납</S.ReturnFalse>
            ) : (
                <S.ReturnTrue>반납완료</S.ReturnTrue>
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