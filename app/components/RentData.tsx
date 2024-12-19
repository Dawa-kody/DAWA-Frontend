import React from "react";
import * as S from "../styles/RentData";

export interface RentDatas {
    id: number;
    Number: string;
    Date: string;
    Item: string;
    Return: boolean;
}

function RentData({ Number, Date, Item, Return }: Omit<RentDatas, "id">) {
    return (
        <S.Container>
            <S.ItemName>{Item}</S.ItemName>
            <S.Line />
            {Return ? (
                <S.ReturnTrue>반납완료</S.ReturnTrue>
            ) : (
                <S.ReturnFalse>미반납</S.ReturnFalse>
            )}
            <S.ListDiv>
                <S.NumberTitle>개수</S.NumberTitle>
                <S.DateTitle>날짜</S.DateTitle>
                <S.Number>{Number}</S.Number>
                <S.Date>{Date}</S.Date>
            </S.ListDiv>
            <S.BottomDiv />
        </S.Container>
    );
}

export default RentData;
