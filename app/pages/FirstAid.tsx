'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../styles/FirstAid";
import FilterTag from "../components/FilterTag";
import Card from "../components/Card";

function FirstAid() {
    const token = localStorage.getItem('access');
    const role = localStorage.getItem('role');
    const [Admin, setAdmin] = useState(false);

    const [Title, SetTitle] = useState("");
    const [Disease, SetDisease] = useState("");
    const [Tag, SetTag] = useState("");
    const [Subnail, SetSubnail] = useState("");
    const [Content, SetContent] = useState("");

    const [fontSize, setFontSize] = useState("16px");

    const [selectedSubnail, setSelectedSubnail] = useState<string>("");

    const handleFontSizeChange = (event: any) => {
        setFontSize(event.target.value);
    };

    const handleSubnailClick = (svgPath: string) => {
        setSelectedSubnail(svgPath);
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const dto = {
            title: Title,
            disease: Disease,
            tag: Tag,
            subnail: selectedSubnail,
            content: Content, 
        };
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/응급처치 url`, dto, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("회원가입 실패:", error);
        }
    };

    return (
        <>
            {Admin ? (
                <S.Container>
                    <S.AdminTextBox>
                        <S.AdminGridColumn>
                            <S.TabTitleBox>제목</S.TabTitleBox>
                                <S.InputBox>
                                    <S.Input />
                                </S.InputBox>
                            </S.AdminGridColumn>
                
                        <S.AdminGridColumn>
                            <S.TabTitleBox>병명</S.TabTitleBox>
                            <S.InputBox>
                                <S.Input />
                            </S.InputBox>
                        </S.AdminGridColumn>
                
                        <S.AdminGridColumn>
                            <S.TabTitleBox>증상</S.TabTitleBox>            
                            <S.AdminFilterContainer>
                                <S.AdminFilterBoxContainter>
                                    <S.AdminKeywordTitle>태그를 선택해주세요.</S.AdminKeywordTitle>
                                        <S.AdminLine />
                                        <FilterTag />
                                </S.AdminFilterBoxContainter>
                            </S.AdminFilterContainer>
                        </S.AdminGridColumn>
                
                        <S.AdminGridColumn>
                            <S.TabTitleBox>썸네일</S.TabTitleBox>
                            <S.SubnailDiv>                
                            {selectedSubnail && <S.subnail><img src={selectedSubnail} alt="Selected Thumbnail" /></S.subnail>}
                
                            <S.ColumnLine />
                                <S.EmojiBox>
                                    <S.Emoji src="/dizzyface.svg" onClick={() => handleSubnailClick("/dizzyface.svg")} />
                                    <S.Emoji src="/cryingface.svg" onClick={() => handleSubnailClick("/cryingface.svg")} />
                                    <S.Emoji src="/worriedface.svg" onClick={() => handleSubnailClick("/worriedface.svg")} />
                                </S.EmojiBox>
                            </S.SubnailDiv>
                        </S.AdminGridColumn>
                
                        <S.AdminGridColumn>
                            <S.TabTitleBox>내용</S.TabTitleBox>
                            <S.TextConatiner>
                                <S.FontBox>
                                    <S.FontSpan>글자 크기:</S.FontSpan>
                                    <S.SelectBox value={fontSize} onChange={handleFontSizeChange}>
                                        <option value="12px">12</option>
                                        <option value="14px">14</option>
                                        <option value="16px">16</option>
                                        <option value="18px">18</option>
                                        <option value="20px">20</option>
                                    </S.SelectBox>
                                </S.FontBox>
        
                                <S.PreviewBox fontSize={fontSize} />
                            </S.TextConatiner>
                        </S.AdminGridColumn>
                    </S.AdminTextBox>
                
                    <S.SubmitButton onClick={handleSubmit}>작성완료</S.SubmitButton>
                </S.Container>
            ) : (
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
            )}
        </>
    );
}

export default FirstAid;
