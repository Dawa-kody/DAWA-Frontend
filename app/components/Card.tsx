'use client'

import React, { useState, useEffect } from "react";
import * as S from "../styles/Card";
import axios from "axios";

interface CardContent {
    Title: string;
    Tag: string;
}

function Card() {
    const [CardDataList, setCardDataList] = useState<CardContent[]>([]); //카드 내용 데이터

    const truncateText = (text: string | undefined) => {
        if (!text) return "";
        return text.length > 20 ? text.slice(0, 20) + "..." : text;
    };

    useEffect(() => {
        async function fetchCardData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/아무거나`);
                // 배열인지 확인 후 설정
                if (Array.isArray(response.data)) {
                    setCardDataList(response.data);
                } else {
                    console.error("응답 데이터가 배열이 아닙니다.");
                }
            } catch (error) {
                console.error("응급처치 카드 기록 데이터를 불러오는 중 에러 발생:", error);
            }
        }
        fetchCardData();
    }, []);

    if (CardDataList.length === 0) {
        return (
            <>
                <S.CapsuleSvg src={"/BrokenCapsule.svg"} />
                <S.Notice>응급처치를 찾을 수 없습니다.</S.Notice>
            </>
        );
    }

    return (
        <S.CardContainer>
            <S.Screen>
                <S.Emoji src={"/Headache.svg"} /> {/* 나중에 선생님 부분 만들어지면 사진 정보 받아와서 적용하는 로직으로 변경 예정 */}
            </S.Screen>
            <S.CardTitle>{CardDataList.length > 0 ? truncateText(`#${CardDataList[0].Title}`) : "데이터 없음"}</S.CardTitle>
            <S.CardTagBox>
                {CardDataList.map((card, index) => (
                    <S.CardTag key={index}>{`#${card.Tag}`}</S.CardTag>
                ))}
            </S.CardTagBox>
        </S.CardContainer>
    );
}

export default Card;
