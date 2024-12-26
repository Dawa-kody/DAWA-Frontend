import React, { useState } from "react";
import * as S from "../styles/RentModal";
import { useRef } from "react";
import axios from "axios";

interface Modalprops {
    onClose: () => void;
}

function RentModal({ onClose }: Modalprops) {
    const modalBackground = useRef<HTMLDivElement>(null);
    

    const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rent/write`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
                
            );
        } catch (error) {
            console.log("대여물품 기록 작성 실패:", error);
        }

        onClose();
    };

    return (
        <S.background
            ref={modalBackground}
            onClick={e => {
                if (e.target === modalBackground.current) {
                    onClose();
                }
        }}>
            <S.ModalContainer>
                <S.Title>보건실 물품 대여하기</S.Title>
                <S.SubTitle>대여할 물품을 선택해주세요.</S.SubTitle>

                <S.CardsDiv>
                    <S.RentCard>아이스팩</S.RentCard>
                    <S.RentCard>핫팩</S.RentCard>
                    <S.RentCard>부목</S.RentCard>
                    <S.RentCard>아이스팩</S.RentCard>
                </S.CardsDiv>

                <S.submitbutton onClick={handleSubmit}>확인</S.submitbutton>
                <S.canclebutton onClick={onClose}>취소</S.canclebutton>
            </S.ModalContainer>
        </S.background>
    );
}

export default RentModal;

// 대충 정해진 컴포넌트 몇가지를 고르면 거기에 적혀있는 string을 보내버리는 형식 ㄱㄱ