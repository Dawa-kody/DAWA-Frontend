import React, { useState, useRef } from "react";
import * as S from "../styles/backup"
import axios from "axios";

interface Modalprops {
    onClose: () => void;
}

function BackupModal({ onClose }: Modalprops){
    const modalBackground = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState<1 | 2>(1);
    const [date, setDate] = useState("");
    const [isChecked, setIsChecked] = useState(false);

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
                            onClick={async () => {
                                try {
                                    if (isChecked) {
                                        // 날짜 입력이 없는 경우 방어 처리
                                        if (!date) {
                                            alert("날짜를 선택해주세요.");
                                            return;
                                        }

                                        // 체크박스 체크된 경우: 날짜와 함께 요청
                                        await axios.post("/api/backup-by-date", {
                                            date: date
                                        });
                                        alert("날짜 기반 백업 완료!");
                                    } else {
                                        // 체크 안 된 경우: 기본 요청
                                        await axios.post("/api/backup-full");
                                        alert("전체 백업 완료!");
                                    }
                                } catch (error) {
                                    alert("에러 발생: " + (error as any).message);
                                }
                            }}
                        >
                            불러오기
                        </S.Submit>
                    </>
                )}
            </S.ModalContainer>
        </S.background>
    )
}

export default BackupModal