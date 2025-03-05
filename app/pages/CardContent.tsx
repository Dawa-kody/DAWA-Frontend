'use client';

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as S from "../styles/CardContent";
import axios from "axios";
import Nav from "@/components/Nav";

interface Tag {
    name: string;
}

interface RelatedFirstAid {
    title: string;
    tags: Tag[];
    firstAidId: number;
}

interface CardContent {
    title: string;
    emoji: string;
    tags: Tag[];
    diseaseName: string;
    firstAidId: number;
    description: string;
    content: string;
    relatedFirstAids?: RelatedFirstAid[];
}

function CardContent() {
    const { id } = useParams(); // URL에서 id 가져오기
    const [data, setData] = useState<CardContent | null>(null);

    console.log("현재 id:", id); // id가 정상적으로 가져와지는지 확인


    useEffect(() => {
        async function fetchCardData() {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/firstaid/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "ngrok-skip-browser-warning": "69420",
                        },
                    }
                );
    
                console.log("API 응답 데이터:", response.data); // 데이터 확인용 로그
                
                if (response.data) {
                    setData(response.data);
                } else {
                    console.error("데이터가 올바르지 않습니다.");
                }
            } catch (error) {
                console.error("데이터를 불러오는 중 에러 발생:", error);
            }
        }
    
        fetchCardData();
    }, [id]); // id가 변경될 때마다 요청
    

    if (!data) return null;

    return (
        <>
            <Nav />
            <S.Header>
                <S.diseaseName>{data.diseaseName || "증상 없음"}</S.diseaseName>
                <S.CardTitle>{data.title || "제목 없음"}</S.CardTitle>

                <S.TagBox>
                    {data.tags?.length ? (
                        data.tags.map((tag, index) => (
                            <S.diseaseTag key={index}>{`#${tag.name}`}</S.diseaseTag>
                        ))
                    ) : (
                        <S.diseaseTag>#기본태그</S.diseaseTag>
                    )}
                </S.TagBox>

                <S.screen>
                    <S.emoji src={data.emoji || "/default.svg"} alt="응급처치 이모지" />
                </S.screen>
            </S.Header>

            <S.ContentBox>
                <S.DiseaseBox>
                    <S.DiseaseContent disabled>
                        {data.content || "내용 없음"}
                    </S.DiseaseContent>
                </S.DiseaseBox>

                <S.Ment>그래도 만약 머리가 깨질 듯이 아프다면 해야 할 것은? {'->'} 보건실 방문</S.Ment>
            </S.ContentBox>

            <S.SimilarData>
                <S.SimilarTitle>비슷하지만 다른 증상</S.SimilarTitle>
                <S.DataLine />
                {data.relatedFirstAids && data.relatedFirstAids.length > 0 ? (
                    data.relatedFirstAids.map((item, index) => (
                        <S.DatasBox className={index === 0 ? 'first-box' : 'other-box'} key={item.firstAidId}>
                            <S.DataTitle>{item.title || "비슷한 증상"}</S.DataTitle>
                            <S.DataTagBox>
                                {item.tags.map((tag, tagIndex) => (
                                    <S.DataTag key={tagIndex}>{`#${tag.name}`}</S.DataTag>
                                ))}
                            </S.DataTagBox>
                            <S.BottomLine />
                        </S.DatasBox>
                    ))
                ) : (
                    <S.DatasBox>
                        <S.DataTitle>관련된 응급처치 정보가 없습니다.</S.DataTitle>
                    </S.DatasBox>
                )}
            </S.SimilarData>

        </>
    );
}

export default CardContent;
