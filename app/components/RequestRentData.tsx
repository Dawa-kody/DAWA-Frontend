import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "../styles/RequestRentData";

export interface RequestRentDatas {
    rentalId: string;
    count: number;
    rental: string;
    name: string;
    schoolNumber: string;
}

function RequestRentData({ rentalId, count, rental, schoolNumber, name, onRemove }: RequestRentDatas & { onRemove: (rentalId: string) => void }) {
  const [Admin, setAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const access = window.localStorage.getItem("access");
    setToken(access);
  }, []);

  useEffect(() => {
    const storedRole = window.localStorage.getItem("role");
    if (storedRole === "ROLE_TEACHER") {
      setAdmin(true);
    }
  }, []);

  const requestSubmit = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rental/rentalAccept/${rentalId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
            withCredentials: true,
          },
        }
      );

      // ✅ 요청 성공 시 부모 컴포넌트에게 삭제 요청
      onRemove(rentalId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios 오류:", error.response?.data || error.message);
      } else {
        console.error("알 수 없는 오류:", error);
      }
    }
  };

  return (
    <S.RequestRentDataContainer>
      <S.item>{rental}</S.item>
      <S.count>{count}개</S.count>
      <S.line />
      <S.requester>신청인</S.requester>
      <S.student>{schoolNumber} {name}</S.student>
      <S.acceptBtn onClick={requestSubmit}>수락</S.acceptBtn>
    </S.RequestRentDataContainer>
  );
}


export default RequestRentData;
