'use client'

import React, { useState, useEffect } from "react";
import * as S from "../styles/CardContent";
import axios from "axios";

interface Information {
    Title: string;
    Tag: string;
    Disease: string;
    DContent: string;
    STitle: string;
    SContent: string;
}

function CardContent() {
    const [H, setH] = useState<Information[]>([]);

    useEffect(() => {
        async function fetchCardData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/무언가`);
                setH(response.data); // 응답 데이터가 배열이라고 가정
            } catch (error) {
                console.error("병명 데이터를 불러오는 중 에러 발생:", error);
            }
        }
        fetchCardData();
    }, []);

    return (
        <>
            {H.length > 0 && (
                <>
                    <S.Header>
                        <S.diseaseName>{H[0].Disease}</S.diseaseName>
                        <S.CardTitle>만약 머리가 깨질 듯이 아프다면?</S.CardTitle>

                        <S.TagBox>
                            <S.diseaseTag>{`#${H[0].Tag}`}</S.diseaseTag>
                            <S.diseaseTag>{`#${H[0].Tag}`}</S.diseaseTag>
                        </S.TagBox>

                        <S.screen>
                            <S.emoji src={"/Headache.svg"} />
                        </S.screen>
                    </S.Header>

                    <S.ContentBox>
                        <S.DiseaseBox>
                            <S.DiseaseTitle>{H[0].Title}</S.DiseaseTitle>
                            <S.DiseaseContent
                                cols={30}
                                rows={11}
                                disabled
                            >
                                {H[0].DContent}
                            </S.DiseaseContent>
                        </S.DiseaseBox>

                        <S.SolutionBox>
                            <S.SolutionTitle>{H[0].STitle}</S.SolutionTitle>
                            <S.SolutionContent
                                cols={30}
                                rows={11}
                                disabled
                            >
                                {H[0].SContent}
                            </S.SolutionContent>
                        </S.SolutionBox>

                        <S.Ment>그래도 만약 머리가 깨질 듯이 아프다면 해야할건? {'->'} 보건실 방문</S.Ment>
                    </S.ContentBox>

                    <S.SimilarData>
                        <S.SimilarTitle>비슷하지만 다른 증상</S.SimilarTitle>
                        <S.DataLine />

                        {H.length > 0 && (
                            H.map((item, index) => (
                                <S.DatasBox className={index === 0 ? 'first-box' : 'other-box'} key={index}>
                                    <S.DataTitle>비슷하지만 다른 증상이라면?</S.DataTitle>
                                    <S.DataTagBox>
                                        <S.DataTag>{`#${item.Tag}`}</S.DataTag>
                                        <S.DataTag>{`#${item.Tag}`}</S.DataTag>
                                    </S.DataTagBox>
                                    <S.BottomLine />
                                </S.DatasBox>
                            ))
                        )}
                    </S.SimilarData>
                </>
            )}
        </>
    );
}

export default CardContent;
