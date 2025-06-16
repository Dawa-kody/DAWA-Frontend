import React, { useState } from "react";
import axios from "axios";
import * as S from "../../styles/RentDataAdmin";

export interface RentAdminDatas {
    rentalId: number; // id → rentalId로 변경
    count: string;
    formattedDate: string;
    rental: string;
    rentaled: boolean;
    name: string;
}

// rentalId를 props로 받도록 수정
export function RentDataAdmin({ rentalId, count, formattedDate, rental, rentaled, name }: RentAdminDatas) {
    const [isReturned, setIsReturned] = useState(rentaled);

    const handleReturn = async () => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rental/${rentalId}`);
            setIsReturned(true);
        }
        
        catch (error) {
            console.error(error);
            alert("반납 요청 중 오류가 발생했습니다.");
        }
    };

    return (
        <S.Container>
            <S.ItemName>{rental}</S.ItemName>
            <S.Line />
            {isReturned ? (
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
            {!isReturned && <S.Switch onClick={handleReturn}>반납 완료</S.Switch>}
            <S.BottomDiv />
        </S.Container>
    );
}
