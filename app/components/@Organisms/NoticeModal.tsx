import React, { useEffect, useState } from "react";
import axios from "axios";
import { ICON } from "@/constants";

interface NoticeModalProps {
  onClose: () => void;
  id: number;
}

interface NoticeData {
  title: string;
  content: string;
  yearMonthDay: string;
}

export function NoticeModal({ onClose, id }: NoticeModalProps) {
  const [notice, setNotice] = useState<NoticeData | null>(null);

  useEffect(() => {
    console.log("받은 id:", id);

    async function fetchNotice() {
      try {
        const response = await axios.get<NoticeData>(
          `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/notice/${id}`,
          {
            headers:{
              'ngrok-skip-browser-warning': '69420',
            }
          }
        );
        console.log("받은 공지사항 데이터:", response.data);
        console.log(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/notice/${id}`);
        setNotice(response.data); // ✅ 상태에 저장
      } catch (error) {
        console.error("공지사항 불러오기 실패:", error);
      }
    }

    if (id) {
      fetchNotice();
    }
  }, [id]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-[3000]"></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[30rem] pl-[2.5rem] pr-[2.5rem] pt-[2rem] bg-white p-[2rem] rounded-[0.625rem] text-black z-[3000] shadow-lg">
        <div id="header" className="w-full flex flex-row justify-between ">
          <span className="text-[1.8rem] font-[700]">공지사항</span>
          <img src={`${ICON.SVG_ICON}/X.svg`}
            className="cursor-pointer size-8" alt="닫기" onClick={onClose} />
        </div>

        <div id="content" className="w-full h-[20rem] flex flex-col border border-NoticeModal rounded-[0.625rem] mt-[2rem]">
          <div id="content-header" className="w-full h-[3rem] flex flex-row justify-between items-center pl-[2rem] pr-[2rem]">
            <span id="title" className="text-[1.5rem] text-black font-[400]">
              {notice?.title ?? "제목 불러오는중"}
            </span>
            <div className="flex flex-row gap-[2rem]">
              <span className="text-[1.2rem] text-NoticeModal text-black">보건선생님</span>
              <span id="date" className="text-[1.2rem] text-Not iceModal">
                {notice?.yearMonthDay ?? "날짜 불러오는중"}
              </span>
            </div>
          </div>

          <hr className="w-full border-NoticeModal" />
          <div id="content-content" className="p-4">
            <div className="text-black">{notice?.content ?? "내용 불러오는중중"}</div>
          </div>
        </div>
      </div>
    </>
  );
}