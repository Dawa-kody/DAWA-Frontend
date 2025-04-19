import React, { useState } from 'react';
import Nav from '../organisms/Nav';
import SubSheet from '../organisms/subSheet';
import StudentLog from '@/organisms/StudentLog';
import BackupModal from '@/organisms/BackupModal';
import MainSheet from '@/organisms/Mainsheet';
import Calendar from '@/organisms/Calendar';
import * as S from "../styles/backup"
import Mainsheet from "../components/Mainsheet";

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