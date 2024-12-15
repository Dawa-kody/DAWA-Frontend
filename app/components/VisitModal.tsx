import React, { useState } from "react";
import * as S from "../styles/VisitModal";
import { useRef } from "react";
import axios from "axios";

interface Modalprops {
    onClose: () => void;
}

function VisitModal({ onClose }: Modalprops) {
    const modalBackground = useRef<HTMLDivElement>(null);
    const [content, SetContent] = useState("");

    function handleContentChange(e : React.ChangeEvent<HTMLTextAreaElement>){
        SetContent(e.target.value);
    }

    const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        const contentValue = content;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/recodeAdd`, contentValue, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
                
            );
        } catch (error) {
            console.log("방문기록 작성 실패:", error);
        }
    };

    return (
        <S.background
            ref={modalBackground}
            onClick={e => {
                if (e.target === modalBackground.current) {
                    onClose();
                }
        }}>
            <S.modalcontainer>
                <S.modaltitle>방문 기록 작성</S.modaltitle>
                <S.modalinput
                    placeholder="방문 기록을 작성해주세요."
                    value={content}
                    onChange={handleContentChange}
                    required />
                <S.submitbutton onClick={handleSubmit}>확인</S.submitbutton>
                <S.canclebutton onClick={onClose}>취소</S.canclebutton>
            </S.modalcontainer>
        </S.background>
    );
}

export default VisitModal;
