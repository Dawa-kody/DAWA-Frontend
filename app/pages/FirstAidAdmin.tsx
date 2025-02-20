'use client'

import React, { useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import * as S from "../styles/FirstAidAdmin";
import FilterTag from "../components/FilterTag";

const FirstAidAdmin = () => {
    const [title, setTitle] = useState("");
    const [disease, setDisease] = useState("");
    const [tag, setTag] = useState("");
    const [content, setContent] = useState("");
    const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");
    const [fontSize, setFontSize] = useState("16px");
    const SelectedThumbnail = S.SelectedThumbnail;
    const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFontSize(event.target.value);
    };

    const handleThumbnailClick = (svgPath: string) => {
        setSelectedThumbnail(svgPath);
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const dto = {
            title,
            disease,
            tags: tag,
            subnail: selectedThumbnail,
            content,
            font: fontSize,
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/firstaid`,
                dto,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log("응답 성공:", response.data);
        } catch (error) {
            console.error("제출 실패:", error);
        }
    };

    return (
        <>
            <Nav />
            <S.Container>
                <S.AdminTextBox>
                    <S.AdminGridColumn>
                        <S.TabTitleBox>제목</S.TabTitleBox>
                        <S.InputBox>
                            <S.Input value={title} onChange={(e) => setTitle(e.target.value)} />
                        </S.InputBox>
                    </S.AdminGridColumn>

                    <S.AdminGridColumn>
                        <S.TabTitleBox>병명</S.TabTitleBox>
                        <S.InputBox>
                            <S.Input value={disease} onChange={(e) => setDisease(e.target.value)} />
                        </S.InputBox>
                    </S.AdminGridColumn>

                    <S.AdminGridColumn>
                        <S.TabTitleBox>태그</S.TabTitleBox>
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
                        {selectedThumbnail && (<SelectedThumbnail src={selectedThumbnail} alt="선택한 썸네일" />)}
                            <S.EmojiBox>
                            <S.Emoji src="/dizzyface.svg" onClick={() => handleThumbnailClick("/dizzyface.svg")} selected={selectedThumbnail === "/dizzyface.svg"} />
                            <S.Emoji src="/cryingface.svg" onClick={() => handleThumbnailClick("/cryingface.svg")}   selected={selectedThumbnail === "/cryingface.svg"}/>
                            <S.Emoji src="/worriedface.svg" onClick={() => handleThumbnailClick("/worriedface.svg")} selected={selectedThumbnail === "/worriedface.svg"}/>
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

                <S.SubmitButton onClick={handleSubmit}>작성 완료</S.SubmitButton>
            </S.Container>
        </>
    );
};

export default FirstAidAdmin;
