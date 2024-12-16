'use client'

import React from "react";
import * as S from "../styles/Main";
import VisitModal from "../components/VisitModal";
import { useState } from "react";

function Main(){
    const [modalOpen, setModalOpen] = useState(false);

    function click(){
        setModalOpen(true);
    }

    return(
        <>
            {/* {modalOpen  && (
                <VisitModal onClose={() => setModalOpen(false)} />
            )}
            <button onClick={click}>button</button> */}
            <S.Container>
                <S.TeacherSection>
                    <S.TeacherIconDiv>
                        <S.TeacherIcon src={"/people.svg"} />
                    </S.TeacherIconDiv>
                    <S.TeacherState>선생님 부재중</S.TeacherState>
                </S.TeacherSection>

                <S.VisitModalDiv>
                    <S.ModalTitle>방문 기록 작성</S.ModalTitle>
                    <S.ModalButton>방문기록 작성</S.ModalButton>
                </S.VisitModalDiv>

                <S.RentDiv>
                    <S.RentTitle>대여기록</S.RentTitle>
                    <S.RentNonActiveSpan>대여한 기록이 존재하지 않습니다.</S.RentNonActiveSpan>
                </S.RentDiv>

                <S.VisitDiv>
                    <S.VisitTitle>방문기록</S.VisitTitle>
                    <S.VisitNonActiveSpan>방문한 기록이 존재하지 않습니다.</S.VisitNonActiveSpan>
                </S.VisitDiv>

                <S.BedDiv>
                    <S.BedTitle>침대 현황</S.BedTitle>
                    <S.BedMenNonActiveDiv>
                        <S.BedIcon src={"/Bed.svg"} />
                    </S.BedMenNonActiveDiv>

                    <S.BedWomenNonActiveDiv>
                        <S.BedIcon src={"/Bed.svg"} />
                    </S.BedWomenNonActiveDiv>
                </S.BedDiv>
            </S.Container>
        </>
    );
}

export default Main;