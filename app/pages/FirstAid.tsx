'use client';

import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Nav from '../components/Nav';
import * as S from '../styles/FirstAid';
import FilterTag from '../components/FilterTag';
import Card from '../components/Card';
import FirstAidAdmin from './FirstAidAdmin';

interface DecodedToken {
    role: string;
    exp?: number;
}

interface CardContent {
    title: string;
    emoji: string;
    tags: { name: string }[];
    firstAidId : number;
}

const ROLE_ADMIN = 'ROLE_TEACHER';

const FirstAid = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]); // 선택된 태그 상태 추가
    const [cardData, setCardData] = useState<CardContent[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('access');
            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                const userRole = decodedToken?.role || 'UNKNOWN';
                setIsAdmin(userRole === ROLE_ADMIN);
            } catch (error) {
                console.error('토큰 디코딩 에러:', error);
                setIsAdmin(false);
            }
        }
    }, [token]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/firstaid`, {
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",
                    },
                    withCredentials: true,
                });
    
                console.log("API 응답 데이터:", response.data);
    
                // response.data 자체가 배열인지 확인
                if (Array.isArray(response.data)) {
                    setCardData(response.data);
                } else {
                    console.error("응답 데이터가 배열이 아닙니다:", response.data);
                }
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
            }
        }
    
        fetchData();
    }, []);    

    if (isAdmin) {
        return <FirstAidAdmin />;
    }

    return (
        <>
            <Nav />
            <S.Container>
                <S.Title>선생님이 알려주시는 약, 질병 관련 꿀TIPS ~</S.Title>
                <S.FilterBoxContainter>
                    <S.KeywordTitle>증상 키워드를 골라보세요</S.KeywordTitle>
                    <S.Line />
                    <FilterTag onSelectTags={setSelectedTags} />
                </S.FilterBoxContainter>

                <S.CardBox>
                    <Card selectedTags={selectedTags} cardDataList={cardData} />
                </S.CardBox>
            </S.Container>
        </>
    );
};

export default FirstAid;
