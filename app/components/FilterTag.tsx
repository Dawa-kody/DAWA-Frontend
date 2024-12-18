import React, { useState, useEffect } from "react";
import * as S from "../styles/FilterTag";
import axios from "axios";

interface unHealth {
    Name: string;
}

function FilterTag() {
    const [Disease, SetDisease] = useState<unHealth[]>([]);
    const [Active, setActive] = useState(false);

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

    return (
        <>
            <S.FilterTagBox Active={Active}>
                {Disease.length > 0 ? (
                    Disease.map((disease, index) => (
                        <S.FilterTag key={index}>{`#${disease.Name}`}</S.FilterTag>
                    ))
                ) : (
                    <div />
                )}

                <S.TrinangleButton
                    src={"/TriangleButton.svg"}
                    Active={Active}
                    onClick={() => setActive(!Active)}
                />
            </S.FilterTagBox>
        </>
    );
}

export default FilterTag;
