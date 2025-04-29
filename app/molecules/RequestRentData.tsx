import React, { useState, useEffect } from "react";
import RentCancleModal from "@/organisms/RentCancleModal";
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
  const [rentCancleModalOpen, setRentCancleModalOpen] = useState(false);

  useEffect(() => {
    const access = window.localStorage.getItem("accessToken");
    setToken(access);
  }, []);

  useEffect(() => {
    const storedRole = window.localStorage.getItem("role");
    if (storedRole === "ROLE_TEACHER") {
      setAdmin(true);
    }
  }, []);

  function rentCancleModalClick() {
    setRentCancleModalOpen(true);
  }

  const handleRequest = async (accepted: boolean, content: string) => {
    const dto = {
      accepted,
      content,
      schoolNumber,
    };
  
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rental/rentalAccept/${rentalId}`,
        dto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
          withCredentials: true,
        }
      );
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
    <>
      {rentCancleModalOpen && (
        <RentCancleModal
          onClose={() => setRentCancleModalOpen(false)}
          onSubmit={(reason) => {
            handleRequest(false, reason);
          }}
        />
      )}


      <S.RequestRentDataContainer>
        <S.item>{rental}</S.item>
        <S.count>{count}개</S.count>
        <S.line />
        <S.requester>신청인</S.requester>
        <S.student>{schoolNumber} {name}</S.student>
        <S.denyBtn onClick={rentCancleModalClick}>거절</S.denyBtn>
        <S.acceptBtn onClick={() => {handleRequest(true, "수락되었습니다");}}>수락</S.acceptBtn>
      </S.RequestRentDataContainer>
    </>
  );
}

export default RequestRentData;