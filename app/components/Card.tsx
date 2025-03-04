'use client';

import React from 'react';
import * as S from '../styles/Card';
import { useRouter } from 'next/navigation';

interface CardContent {
    title: string;
    emoji: string;
    tags: { name: string }[];
    firstAidId: number;
}

interface CardProps {
    selectedTags: string[]; // 선택된 태그 목록
    cardDataList: CardContent[]; // FirstAid에서 전달한 데이터
}

const Card: React.FC<CardProps> = ({ selectedTags, cardDataList }) => {
    const router = useRouter();
    
    const truncateText = (text: string) => {
        return text.length > 20 ? text.slice(0, 20) + '...' : text;
    };

    // 선택된 태그를 포함하는 카드만 필터링
    const filteredCards = selectedTags.length > 0
        ? cardDataList.filter(card => selectedTags.some(tag => card.tags.some(t => t.name === tag)))
        : cardDataList;

    if (filteredCards.length === 0) {
        return (
            <>
                <S.CapsuleSvg src={'/BrokenCapsule.svg'} />
                <S.Notice>선택한 태그와 일치하는 응급처치 정보를 찾을 수 없습니다.</S.Notice>
            </>
        );
    }

    return (
        <>
            {filteredCards.map((card, index) => (
                <S.CardContainer key={index} onClick={() => router.push(`/FirstAid/${card.firstAidId}`)}>
                    <S.Screen>
                        <S.Emoji src={card.emoji} alt="emoji" />
                    </S.Screen>
                    <S.CardTitle>{truncateText(`#${card.title}`)}</S.CardTitle>
                    <S.CardTagBox>
                        {card.tags.map((tag, idx) => (
                            <S.CardTag key={idx}>{`#${tag.name}`}</S.CardTag>
                        ))}
                    </S.CardTagBox>
                </S.CardContainer>
            ))}
        </>
    );
};

export default Card;
