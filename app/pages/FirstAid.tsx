'use client'

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Nav from "../components/Nav";
import * as S from "../styles/FirstAid";
import FilterTag from "../components/FilterTag";
import Card from "../components/Card";
import FirstAidAdmin from "./FirstAidAdmin";

interface DecodedToken {
    role: string; // JWT에 포함된 'role' 속성
    exp?: number; // 만료 시간 (선택적)
}

const ROLE_ADMIN = "ROLE_TEACHER";

const FirstAid = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // 클라이언트 사이드에서만 localStorage 접근
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("access");
            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                const userRole = decodedToken?.role || "UNKNOWN";
                setIsAdmin(userRole === ROLE_ADMIN);
            } catch (error) {
                console.error("토큰 디코딩 에러:", error);
                setIsAdmin(false);
            }
        }
    }, [token]);

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
                    <FilterTag />
                </S.FilterBoxContainter>

                <S.CardBox>
                    <Card />
                </S.CardBox>
            </S.Container>
        </>
    );
};

export default FirstAid;
