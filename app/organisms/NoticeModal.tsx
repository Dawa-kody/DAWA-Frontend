import React from "react";

interface NoticeModalProps {
  onClose: () => void; // 모달 닫기 함수
  noticeTitle: string; // 공지사항 제목
  noticeDate: string; // 공지사항 날짜
  noticeContent: string; // 공지사항 내용
}

function NoticeModal({ onClose, noticeTitle, noticeDate, noticeContent }: NoticeModalProps) {
  return (
    <>
      {/* 흐릿한 배경 */}
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-[999]"></div>

      {/* 모달 */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[30rem] pl-[2.5rem] pr-[2.5rem] pt-[2rem] bg-white p-[2rem] rounded-[0.625rem] text-black z-[1000] shadow-lg">
        <div id="header" className="w-full flex flex-row justify-between">
          <span className="text-[1.8rem] font-[700]">공지사항</span>
          <img src="/X.svg"
            className="cursor-pointer size-8" alt="닫기" onClick={onClose}/>
        </div>
        <div id="content" className="w-full h-[20rem] flex flex-col border border-NoticeModal rounded-[0.625rem] mt-[2rem]">
          <div id="content-header" className="w-full h-[3rem] flex flex-row justify-between items-center">
            <span id="title">{noticeTitle}</span>
            <div className="flex flex-row gap-[2rem]">
              <span>보건선생님</span>
              <span id="date" className="text-[1.2rem] text-NoticeModal">{noticeDate}</span>
            </div>
          </div>
          <hr className="w-full border-NoticeModal"/>
          <div id="content-content">
            <div className="text-black">{noticeContent}</div>
          </div>  
        </div>
      </div>
    </>
  );
}

export default NoticeModal;