

import React, { useState, useEffect } from "react";
import * as S from "../../styles/VisitModal";
import { useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Modalprops {
    onClose: () => void;
}

interface DecodedToken {
    role: string; // JWT에 포함된 'role' 속성
    exp?: number; // 만료 시간 (선택적)
  }

const JWT_EXPIRY_TIME = 24 * 3600 * 100


export function VisitModal({ onClose }: Modalprops) {
    const modalBackground = useRef<HTMLDivElement>(null);
    const [content, SetContent] = useState("");
    const [Admin, setAdmin] = useState(false);
    const [token, setToken] = useState<string | null>(null);
        
        useEffect(() => {
          // 클라이언트 사이드에서만 localStorage에 접근
          if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem('accessToken');
            if (storedToken) {
              setToken(storedToken); // 값이 존재하면 상태 업데이트
            }
          }
        }, []);
    
        useEffect(() => {
          if (token) {
            try {
              const decodedToken = jwtDecode<DecodedToken>(token);
              const userRole = decodedToken?.role || "UNKNOWN";
              console.log("유저 권한:", userRole);
              setAdmin(userRole === "ROLE_TEACHER");
            } catch (error) {
              console.error("토큰 에러:", error);
              setAdmin(false); // 기본값 설정
            }
          } else {
            console.error("토큰 값을 찾지 못했습니다.");
          }
        }, [token]);

    function handleContentChange(e : React.ChangeEvent<HTMLTextAreaElement>){
        SetContent(e.target.value);
    }

    const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault;
        const contentValue = content;
        const token = localStorage.getItem('access');

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/visit/write`, contentValue, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
                
            );
        } catch (error) {
            console.log("방문기록 작성 실패:", error);
        }

        onClose();
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
