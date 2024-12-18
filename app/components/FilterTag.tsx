import React, { useState, useEffect } from "react";
import * as S from "../styles/FirstAid";
import axios from "axios";

interface unHealth {
    Name: string;
}

function FilterTag(){
    const [Disease, SetDisease] = useState<unHealth[]>([]);

    useEffect(() => {
            async function fetchDiseaseData() {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/무언가`);
                    SetDisease(response.data);
                } catch (error) {
                    console.error("병명 데이터를 불러오는 중 에러 발생:", error);
                }
            }
            fetchDiseaseData();
        }, []);

    return(
        <>
            <S.KeywordTitle>증상 키워드를 골라보세요</S.KeywordTitle>
                <S.Line />
                <S.FilterTagBox>
                    {Disease.length > 0 ? (
                        Disease.map((disease, index) => (
                            <S.FilterTag key={index}>{`#${disease.Name}`}</S.FilterTag>
                        ))
                    ) : (
                        <div />
                    )}
            </S.FilterTagBox>
        </>
    );
}

export default FilterTag;