import React, { useRef, useState } from "react";
import axios from "axios";

interface Modalprops {
    onClose: () => void;
    onSubmit: (reason: string) => void;
}

function RentCancleModal({ onClose, onSubmit  }: Modalprops){
    const modalBackground = useRef<HTMLDivElement>(null);
    const [reason, setReason] = useState("");

    function SetReasonChange(e: React.ChangeEvent<HTMLTextAreaElement>){
        setReason(e.target.value)
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSubmit(reason); // reason을 부모로 넘김
        onClose(); // 모달 닫기
    };

    return(
        <div
            id="back"
            className="fixed w-full h-full top-0 left-0 bg-[#3A3D4350] flex items-center justify-center z-[3000]"
            ref={modalBackground}
            onClick={(e) => {
                if (e.target === modalBackground.current) {
                    onClose();
                }
            }}
        >
            <div
                id="Container"
                className="absolute w-[620px] h-[360px] top-[260px] ml-auto mr-auto bg-white rounded-[10px]"
            >
                <div className="flex flex-col">
                    <p className="font-[pretendard] font-bold text-[1.5rem] mt-[1.3rem] ml-[1.8rem]">이 학생의 대여 신청을 취소하시겠습니까?</p>
                    <p className="font-[pretendard] font-medium mt-[1rem] ml-[1.9rem]">대여 신청 거절 사유</p>
                    <textarea
                        className="w-[92%] h-[160px] bg-slategray mt-[1rem] ml-auto mr-auto rounded-[10px] resize-none pt-[0.8rem] pl-[1rem] placeholder:text-[#98A2B3]"
                        placeholder="대여신청을 거절한 사유를 적어주세요."
                        value={reason}
                        onChange={SetReasonChange}
                    />
                    <div className="w-[92%] ml-auto mr-auto mt-[1rem] flex flex-row justify-end gap-[1rem] font-[pretendard] font-bold text-[18px]">
                        <button className="text-black w-[100px] h-[50px] rounded-[5px] bg-slategray">취소</button>
                        <button onClick={handleSubmit} className="text-white w-[100px] h-[50px] rounded-[5px] bg-primaryPurple">확인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentCancleModal