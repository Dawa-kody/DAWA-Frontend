import React, { useState } from "react";
import * as S from "../styles/RentModal";
import { useRef } from "react";
import axios from "axios";

interface Modalprops {
    onClose: () => void;
}

interface CardState {
    name: string;
    count: number;
    selected: boolean;
}

function RentModal({ onClose }: Modalprops) {
    const modalBackground = useRef<HTMLDivElement>(null);

    const [cards, setCards] = useState<CardState[]>([
        { name: "아이스팩", count: 0, selected: false },
        { name: "핫팩", count: 0, selected: false },
        { name: "부목", count: 0, selected: false },
        { name: "찜질팩", count: 0, selected: false },
    ]);

    const handleCardClick = (index: number) => {
        setCards((prev) =>
            prev.map((card, i) =>
                i === index
                    ? {
                          ...card,
                          selected: !card.selected,
                          count: !card.selected ? 1 : 0,
                      }
                    : card
            )
        );
    };

    const handleIncrement = (index: number) => {
        setCards((prev) =>
            prev.map((card, i) =>
                i === index ? { ...card, count: card.count + 1, selected: true } : card
            )
        );
    };

    const handleDecrement = (index: number) => {
        setCards((prev) =>
            prev.map((card, i) =>
                i === index
                    ? {
                          ...card,
                          count: Math.max(card.count - 1, 0),
                          selected: card.count - 1 > 0,
                      }
                    : card
            )
        );
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("access_token");

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rent/write`,
                {
                    selectedItems: cards.filter((card) => card.selected),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            console.log("대여물품 기록 작성 성공:", response.data);
        } catch (error) {
            console.log("대여물품 기록 작성 실패:", error);
        }

        onClose();
    };

    return (
        <S.background
            ref={modalBackground}
            onClick={(e) => {
                if (e.target === modalBackground.current) {
                    onClose();
                }
            }}
        >
            <S.ModalContainer>
                <S.Title>보건실 물품 대여하기</S.Title>
                <S.SubTitle>대여할 물품을 선택해주세요.</S.SubTitle>

                <S.CardsDiv>
                    {cards.map((card, index) => (
                        <S.RentCard
                            key={card.name}
                            Click={card.selected}
                            onClick={() => handleCardClick(index)}
                        >
                            <div>{card.name}</div>
                            <S.ControlButtons>
                                <button onClick={(e) => { e.stopPropagation(); handleDecrement(index); }}>-</button>
                                <span>{card.count}</span>
                                <button onClick={(e) => { e.stopPropagation(); handleIncrement(index); }}>+</button>
                            </S.ControlButtons>
                        </S.RentCard>
                    ))}
                </S.CardsDiv>

                <S.submitbutton onClick={handleSubmit}>확인</S.submitbutton>
                <S.canclebutton onClick={onClose}>취소</S.canclebutton>
            </S.ModalContainer>
        </S.background>
    );
}

export default RentModal;
