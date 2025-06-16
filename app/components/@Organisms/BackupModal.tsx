import React, { useState, useRef } from "react";
import * as S from "../../styles/backup"
import axios from "axios";

interface Modalprops {
    onClose: () => void;
}

export function BackupModal({ onClose }: Modalprops){
    const modalBackground = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState<1 | 2>(1);
    const [date, setDate] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = async () => {
        try {
            if (!isChecked) {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/excel`,
                    {
                        responseType: 'blob', // 바이너리 응답으로 받기
                        headers: {
                            'ngrok-skip-browser-warning': '69420',
                        }
                    }
                );

                // 브라우저에서 파일 다운로드 처리
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;

                // 파일 이름은 백엔드에서 header로 내려주거나 직접 지정
                link.setAttribute('download', 'downloaded_excel.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();
            }

            else {
                const Date = date.split("-").slice(1).join(".");
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/excel`, { date: Date },
                    {
                        responseType: 'blob', // 바이너리 응답으로 받기
                        headers: {
                            'Content-Type': 'application/json',
                            'ngrok-skip-browser-warning': '69420',
                        }
                    }
                );

                // 브라우저에서 파일 다운로드 처리
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;

                // 파일 이름은 백엔드에서 header로 내려주거나 직접 지정
                link.setAttribute('download', 'downloaded_excel.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };  

    return(
        <S.background
            ref={modalBackground}
            onClick={e => {
                if (e.target === modalBackground.current) {
                    onClose();
                }
            }}
        >
            <S.ModalContainer>
                {step === 1 && (
                    <>
                        <S.Title>백업파일</S.Title>
                        <S.Cancle src="/X.svg" onClick={onClose} />

                        <S.Choose>
                            <S.ChooseImg src="/DownCloud.svg" />
                            <S.ChooseSpan>백업파일 저장하기</S.ChooseSpan>
                        </S.Choose>
                        <S.Choose onClick={() => setStep(2)}>
                            <S.ChooseImg src="/UpCloud.svg" />
                            <S.ChooseSpan>백업파일 불러오기</S.ChooseSpan>
                        </S.Choose>
                    </>
                )}

                {step === 2 && (
                    <>
                        <S.Title>백업파일 불러오기</S.Title>
                        <S.Cancle src="/X.svg" onClick={onClose} />
                        <S.Des>백업파일을 불러오기 위한 상세설정을 해주세요.</S.Des>
                        <S.yoso>날짜로 백업하기</S.yoso>
                        <input
                            className="absolute top-[368px] left-[680px]"
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        {isChecked && (
                            <>
                                <S.Line />
                                <S.IT>날짜</S.IT>
                                <S.DateInput
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </>
                        )}
                        <S.Submit
                            onClick={handleSubmit}
                        >
                            불러오기
                        </S.Submit>
                    </>
                )}
            </S.ModalContainer>
        </S.background>
    )
}