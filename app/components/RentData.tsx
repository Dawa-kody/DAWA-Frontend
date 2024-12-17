import React from "react";
import * as S from "../styles/RentData";

export interface RentDatas {
    Number: string,
    Date: string,
    Item: string
}

function RentData({Number, Date, Item}: RentDatas){
    return(
        <>
            <S.Container>
                <S.ItemName>{Item}</S.ItemName>
                <S.Line />

                <S.ListDiv>
                    <S.NumberTitle>개수</S.NumberTitle>
                    <S.DateTitle>날짜</S.DateTitle>
                    <S.Number>{Number}</S.Number>
                    <S.Date>{Date}</S.Date>
                </S.ListDiv>

                <S.BottomDiv />
            </S.Container>
        </>
    );
}

export default RentData;