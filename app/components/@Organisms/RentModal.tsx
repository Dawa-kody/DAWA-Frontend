import React, { useState, useRef } from "react";
import axios from "axios";

interface Modalprops {
  onClose: () => void;
}

interface CardState {
  name: string;
  count: number;
  selected: boolean;
}

export function RentModal({ onClose }: Modalprops) {
  const modalBackground = useRef<HTMLDivElement>(null);

  const [cards, setCards] = useState<CardState[]>([
    { name: "아이스팩", count: 0, selected: false },
    { name: "핫팩", count: 0, selected: false },
    { name: "부목", count: 0, selected: false },
    { name: "찜질팩", count: 0, selected: false },
  ]);

  const handleCardClick = (index: number) => {
    setCards((prev) =>
      prev.map((card, i) =>
        i === index
          ? {
              ...card,
              selected: !card.selected,
              count: !card.selected ? 1 : 0,
            }
          : card
      )
    );
  };

  const handleIncrement = (index: number) => {
    setCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, count: card.count + 1, selected: true } : card
      )
    );
  };

  const handleDecrement = (index: number) => {
    setCards((prev) =>
      prev.map((card, i) =>
        i === index
          ? {
              ...card,
              count: Math.max(card.count - 1, 0),
              selected: card.count - 1 > 0,
            }
          : card
      )
    );
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    // 선택된 아이템 필터링
    const selectedItems = cards.filter((card) => card.selected);

    try {
      for (const item of selectedItems) {
        // 각 아이템별로 요청 전송
        await axios.post(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/rental/request`,
          {
            rental: item.name,
            count: item.count,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      }

      // /mail로 알림 전송
      await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/mail`,
        {
          message: "학생이 대여를 신청했습니다.",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("대여물품 기록 작성 및 알림 전송 성공");

      // SSE 연결 시작
      listenForTeacherResponse();
    } catch (error) {
      console.error("대여물품 기록 작성 또는 알림 전송 실패:", error);
    }
  };

  const listenForTeacherResponse = () => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/mail/sse`,
      {
        withCredentials: true,
      }
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("선생님 응답:", data);

      if (data.status === "accepted") {
        alert("대여가 승인되었습니다.");
      } else if (data.status === "rejected") {
        alert("대여가 거절되었습니다.");
      }

      // SSE 연결 종료
      eventSource.close();
      onClose();
    };

    eventSource.onerror = (error) => {
      console.error("SSE 연결 오류:", error);
      eventSource.close();
    };
  };

  return (
    <div id="background" data-testid="modal-background" className="w-full h-full bg-[rgba(58,61,67,0.5)] fixed top-0 left-0 z-[3000] flex justify-center items-center"
      ref={modalBackground}
      onClick={(e) => {
        if (e.target === modalBackground.current) { onClose(); }
      }}>
      <div id="ModalContainer" data-testid="modal-container" className="w-[620px] h-[438px] absolute top-[20vh] bg-white rounded-[10px] pl-[40px] pr-[40px]">
        <div id="titleContainer" data-testid="title-container" className=" mt-[1.3rem] flex flex-col text-black font-[pretendard]">
          <span id="title" data-testid="title" className="font-[700] text-[1.5rem]">보건실 물품 대여하기</span>
          <span id="subtitle" data-testid="subtitle" className="font-[400] text-[1rem] text-[#98A2B3]">대여할 물품을 선택해주세요.</span>
        </div>

        <div id="cardsContainer" data-testid="cards-container" className="relative mt-[5vh] max-w-[580px] flex flex-row gap-[15px] overflow-x-scroll overflow-y-hidden">
          <style jsx>{`
            #cardsContainer::-webkit-scrollbar {
              height: 8px;
            }
            #cardsContainer::-webkit-scrollbar-thumb {
              border-radius: 10px;
              background-color: #D9D9D9;
            }
          `}</style>
          {cards.map((card, index) => (
            <div id="rent-card" key={card.name} data-testid={`rent-card-${index}`}
              className={`w-[150px] h-[180px] font-[pretendard] font-[500] text-[22px] flex flex-col justify-center items-center rounded-[16px] cursor-pointer ${
                card.selected ? 'bg-[#6948ED] text-white' : 'bg-[#E4E7EC] text-[#98A2B3]'
              }`} onClick={() => handleCardClick(index)}>

              <div id="card-name" data-testid={`card-name-${index}`}>{card.name}</div>

              <div id="countContainer" className=" mt-[1.3rem] flex justify-center w-full gap-[8px]">
                <button id="minusCount" data-testid={`decrement-button-${index}`} onClick={(e) => {
                    e.stopPropagation();
                    handleDecrement(index);
                  }} className="w-[30px] h-[30px] rounded-[5px] border-none font-bold flex justify-center items-center hover:bg-[#ddd]">-</button>
                <span id="count" data-testid={`card-count-${index}`} className="text-[18px] font-bold">{card.count}</span>
                <button id="plusCount" data-testid={`increment-button-${index}`} onClick={(e) => {
                    e.stopPropagation();
                    handleIncrement(index);
                  }} className="w-[30px] h-[30px] rounded-[5px] border-none font-bold flex justify-center items-center hover:bg-[#ddd]">+</button>
              </div>
            </div>
          ))}
        </div>
        <div id="buttonContainer" data-testid="button-container" className="mt-[5vh] flex justify-end gap-[1rem]">
          <button id="submit-button" data-testid="submit-button" onClick={handleSubmit}
            className="w-[99px] h-[50px] bg-[#6948ED] rounded-[5px] font-[pretendard] font-[700] text-[18px] text-white">확인</button>
          <button id="cancel-button" data-testid="cancel-button" onClick={onClose}
            className="w-[99px] h-[50px] bg-[#E4E7EC] rounded-[5px] font-[pretendard] font-[700] text-[18px] text-black">취소</button>
        </div>
      </div>
    </div>
  );
}