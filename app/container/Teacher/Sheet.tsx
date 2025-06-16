import React, { useState } from 'react';
import { Nav, SubSheet, StudentLog, BackupModal, MainSheet, Calendar } from '@/components/@Organisms';
import * as S from "../../styles/backup"


export function Sheet() {
    const [saveModalOpen, setSaveModalOpen] = useState(false);

    function saveModalClick() {
        setSaveModalOpen(true);
    } 

    return (
        <>
            <Nav />
            {/*시트 부분 */}
            <div className='w-full h-[90vh] flex pt-[5vh] pl-[2.06rem] pr-[2.44rem] pb-[5vh] gap-[1.5rem]'>
                <div className=" w-[68vw] flex flex-col justify-between h-full">
                    <MainSheet />
                    <SubSheet />
                </div>
                <div className=' w-[28vw] h-full flex flex-col gap-[1vh]'>
                    <Calendar />
                    <div className=' mt-[4vh]'>
                        <StudentLog />  
                    </div>
                    <div className='w-full flex flex-row gap-[1rem] mt-[1rem]'>
                        <S.backupBtn onClick={saveModalClick}>백업파일</S.backupBtn>
                    </div>
                    {saveModalOpen && (
                        <BackupModal onClose={() => setSaveModalOpen(false)} />
                    )}
                </div>
            </div>
        </>
    );
}