'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../styles/FirstAid";
import FilterTag from "../components/FilterTag";
import Card from "../components/Card";

function FirstAid(){
    const token = localStorage.getItem('access');
    const role = localStorage.getItem('role');
    const [Admin, setAdmin] = useState(false);

    useEffect(() => {
            if (role == "teacher") {
                setAdmin(true);
            } else {
                setAdmin(false);
            }
        });

    return(
        // 둘이 서로 뒤바꿔 놓음 개발할 때 불편해서
        <> 
            {Admin ? (
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
            ) : (
                <S.Container>
                    <S.AdminTextBox>
                        <S.AdminGridColumn>
                            
                        </S.AdminGridColumn>
                    </S.AdminTextBox>
                </S.Container>
            )}
        </>
    );
}

export default FirstAid;
/*
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
*/