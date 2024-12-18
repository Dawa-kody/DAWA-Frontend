'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../styles/FirstAid";
import FilterTag from "../components/FilterTag";
import Card from "../components/Card";

function FirstAid(){

    return(
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
    );
}

export default FirstAid;