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
            </S.Container>
        </>
    );
}

export default Main;