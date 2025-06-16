'use client';
import React from "react";
import axios from "axios";

interface NoticeWriteProps {
    onClose: () => void;
}

interface NoticeData {
    title: string;
    content: string;
}

export function NoticeWrite({ onClose }: NoticeWriteProps) {
    const [noticeData, setNoticeData] = React.useState<NoticeData>({
        title: "",
        content: "",
    });

    const handleSubmit = async (data: NoticeData) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/notice`,
                data,
                {
                    headers: {
                        'ngrok-skip-browser-warning': '69420',
                    },
                }
            );
            console.log("공지사항 작성 성공:", response.data);
            onClose(); // 작성 후 닫기 (선택 사항)
        } catch (error) {
            console.error("공지사항 작성 실패:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNoticeData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 background-blur-sm z-[3000]" />
            <div className="pl-[2.5rem] pt-[1.5rem] pr-[2.5rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[30rem] bg-white z-[3000] flex flex-col rounded-[0.625rem] text-black">
                <span className="font-[700] text-[1.5rem]">공지사항 작성</span>

                <div className="mt-[0.75rem]">
                    <span className="font-[400] text-[1rem]">제목</span> 
                    <input
                        type="text"
                        name="title"
                        value={noticeData.title}
                        onChange={handleChange}
                        className="w-full h-[2.4rem] border border-NoticeModal rounded-[0.625rem] mt-[0.3rem] mb-[1rem] pl-[1rem]"
                        placeholder="제목을 입력해주세요."
                    />
                </div>
                <div>
                    <span className="font-[400] text-[1rem]">내용</span> 
                    <textarea
                        name="content"
                        value={noticeData.content}
                        onChange={handleChange}
                        className="w-full h-[13rem] border border-NoticeModal rounded-[0.625rem] mt-[0.3rem] mb-[1rem] pl-[1rem] pt-[0.5rem] resize-none"
                        placeholder="내용을 입력해주세요."
                    />
                </div>
                <div className="w-full flex flex-row justify-end gap-[2rem]">
                    <button className="w-[6rem] h-[3rem] bg-[#F2F4F7] rounded-[0.3125rem] text-[1rem] font-[700]" onClick={onClose}>취소</button>
                    <button className="w-[6rem] h-[3rem] bg-[#6948ED] rounded-[0.3125rem] text-[1rem] font-[700] text-white" onClick={() => handleSubmit(noticeData)}>확인</button>
                </div>
            </div>
        </>
    );
}