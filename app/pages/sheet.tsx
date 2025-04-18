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
            {/*시트 부분 */}
            <div className=' flex pt-[3.5rem] pl-[2.06rem] pr-[2.44rem] pb-[3.88rem]'>
                <div className=" flex flex-col justify-between w-[80rem] h-[53.9rem]">
                    <MainSheet />
                    <SubSheet />
                </div>
                <div className=' flex flex-col gap-[2.5rem] ml-[1.5rem]'>
                    <Calendar />
                    <div className=' mt-[2.5rem]'>
                        <StudentLog />  
                        <S.Wrapper>
                            <S.saveBtn>저장하기</S.saveBtn>
                            <S.backupBtn onClick={saveModalClick}>백업파일</S.backupBtn>
                        </S.Wrapper>
                        {saveModalOpen && (
                            <BackupModal onClose={() => setSaveModalOpen(false)} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sheet;