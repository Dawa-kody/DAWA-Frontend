'use client'

import React, { useState } from "react";
import axios from "axios";
import Nav from "../organisms/Nav";
import * as S from "../styles/FirstAidAdmin";
import FilterTag from "../molecules/FilterTag";
import { useRouter } from "next/navigation";

const FirstAidAdmin = () => {
    const [title, setTitle] = useState("");
    const [diseaseName, setDiseaseName] = useState("");
    const [tag, setTag] = useState("");
    const [content, setContent] = useState("");
    const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");
    const [fontSize, setFontSize] = useState("16px");
    const SelectedThumbnail = S.SelectedThumbnail;
    const router = useRouter();

    const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFontSize(event.target.value);
    };

    const handleThumbnailClick = (svgPath: string) => {
        setSelectedThumbnail(svgPath);
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const tagArray = tag.split(",").map((name) => ({ name }));

        const emojiMap: Record<string, string> = {
            "/dizzyface.svg": "emoji_1",
            "/cryingface.svg": "emoji_2",
            "/worriedface.svg": "emoji_3",
            "/happyface.svg": "emoji_4",
            "/inconcenientface.svg": "emoji_5",
            "/marskface.svg": "emoji_6",
            "/shockedface.svg": "emoji_7",
        }; 

        e.preventDefault();
        const dto = {
            title,
            diseaseName,
            tags: tagArray,
            emoji: emojiMap[selectedThumbnail] || "emoji_default",
            content,
            font: fontSize,
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/firstaid`, dto, {
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",
                    },
                    withCredentials: true,
                }
            );
            console.log("응답 성공:", response.data);
            router.push("/");
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
                            <S.Input value={diseaseName} onChange={(e) => setDiseaseName(e.target.value)} />
                        </S.InputBox>
                    </S.AdminGridColumn>

                    <S.AdminGridColumn>
                        <S.TabTitleBox>태그</S.TabTitleBox>
                        <S.AdminFilterContainer>
                            <S.AdminFilterBoxContainter className="Admin">
                                <S.AdminKeywordTitle>태그를 선택해주세요.</S.AdminKeywordTitle>
                                <S.AdminLine />
                                <FilterTag onSelectTags={(selectedTags) => setTag(selectedTags.join(","))} />
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
                            <S.Emoji src="/happyface.svg" onClick={() => handleThumbnailClick("/happyface.svg")} selected={selectedThumbnail === "/happyface.svg"}/>
                            <S.Emoji src="/inconcenientface.svg" onClick={() => handleThumbnailClick("/inconcenientface.svg")} selected={selectedThumbnail === "/inconcenientface.svg"}/>
                            <S.Emoji src="/marskface.svg" onClick={() => handleThumbnailClick("/marskface.svg")} selected={selectedThumbnail === "/marskface.svg"}/>
                            <S.Emoji src="/shockedface.svg" onClick={() => handleThumbnailClick("/shockedface.svg")} selected={selectedThumbnail === "/shockedface.svg"}/>
                            </S.EmojiBox> 
                        </S.SubnailDiv>
                    </S.AdminGridColumn>

                    <S.AdminGridColumn>
                        <S.TabTitleBox>내용</S.TabTitleBox>
                        <S.TextConatiner>
                            <S.FontBox>
                                <S.FontSpan>글자 크기:</S.FontSpan>
                                <S.SelectBox value={fontSize} onChange={handleFontSizeChange}>
                                    <S.Option value="12px">12</S.Option>
                                    <S.Option value="14px">14</S.Option>
                                    <S.Option value="16px">16</S.Option>
                                    <S.Option value="18px">18</S.Option>
                                    <S.Option value="20px">20</S.Option>
                                </S.SelectBox>
                            </S.FontBox>
                            <S.PreviewBox maxLength={1000} value={content} onChange={(e) => setContent(e.target.value)} fontSize={fontSize} />
                        </S.TextConatiner>
                    </S.AdminGridColumn>
                </S.AdminTextBox>

                <S.SubmitButton onClick={handleSubmit}>작성 완료</S.SubmitButton>
            </S.Container>
        </>
    );
};

export default FirstAidAdmin;
