import React, { useState } from 'react';
import Nav from '../components/Nav';
import SubSheet from '../components/subSheet';
import StudentLog from '@/components/StudentLog';
import BackupModal from '@/components/BackupModal';
import MainSheet from '@/components/Mainsheet';
import Calendar from '@/components/Calendar';
import * as S from "../styles/backup"

function Sheet() {
    const [saveModalOpen, setSaveModalOpen] = useState(false);

    function saveModalClick() {
        setSaveModalOpen(true);
      }

    return (
        <>
        <Nav />
        <div className=" p-10">
            <MainSheet />
            <SubSheet />
        </div>
        <StudentLog />
        <Calendar />
        <div className='z-30'>
        <S.Wrapper>
                <S.saveBtn>저장하기</S.saveBtn>
                <S.backupBtn onClick={saveModalClick}>백업파일</S.backupBtn>
        </S.Wrapper>

        </div>

        {saveModalOpen && (
            <BackupModal onClose={() => setSaveModalOpen(false)} />
        )}
        </>
    );
}

export default Sheet;