'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

interface mailDTO {
  content: string;
  item: string;
  count: string;
  createAt: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;
const MAIL_API = `${BASE_URL}/mail`;

function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const [MouseOver, setMouseOver] = useState(false);
  const [MailOver, setMailOver] = useState(false);
  const [activeIcon, setActiveIcon] = useState<'home' | 'folder' | 'setting' | 'graduation'>('home');
  const [isAdmin, setIsAdmin] = useState('학생');
  const [mailList, setMailList] = useState<mailDTO[]>([]);

  useEffect(() => {
    if (pathname === '/') setActiveIcon('home');
    else if (pathname === '/Sheet') setActiveIcon('folder');
    else if (pathname === '/Management') setActiveIcon('setting');
    else if (pathname === '/Student') setActiveIcon('graduation');
  }, [pathname]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'ROLE_TEACHER') setIsAdmin('선생님');
    fetchMailList();
  }, []);

  const fetchMailList = async () => {
    const token = window.localStorage.getItem('accessToken');
    try {
      const response = await axios.get<mailDTO[]>(MAIL_API, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      setMailList(response.data);
    } catch (error) {
      console.error('메일 데이터를 불러오는 중 에러 발생:', error);
    }
  };

  const handleIconClick = (icon: 'home' | 'folder' | 'setting' | 'graduation') => {
    const routes = {
      home: '/',
      folder: '/Sheet',
      setting: '/Management',
      graduation: '/Student',
    };
    router.push(routes[icon]);
  };

  const handlelogout = () => router.push('/Login');
  const handlepw = () => router.push('/Password');
  const gotohome = () => router.push('/');

  return (
    <div className='w-full h-[10vh] bg-white user-select-none flex justify-between items-center pl-[10vw] pr-[10vw]'>
      <div className='flex items-center cursor-pointer' onClick={gotohome}>
        <img className='w-[3.5rem] h-[2.2rem] mb-[0.5rem]' src="/Logo.svg"/>
        <span className=' font-pretendard font-[700] text-[1.6rem] text-primaryPurple ml-[1vw]'>다와</span>
      </div>

        {isAdmin === '선생님' && (
          <div className='w-[36rem] h-[4rem] flex items-center gap-[2.5rem]'>
            <div className='w-[4rem] h-full cursor-pointer flex justify-center items-center' onClick={() => handleIconClick('home')}>
              <img className='w-[2.2rem] h-[2.2rem]' src={activeIcon === 'home' ? '/ClickedHome.svg' : '/UnclickedHome.svg'} />
            </div>
            <div className='w-[4rem] h-full cursor-pointer flex justify-center items-center' onClick={() => handleIconClick('folder')}>
              <img className='w-[2.2rem] h-[2.2rem]' src={activeIcon === 'folder' ? '/ClickedFolder.svg' : '/UnclikedFolder.svg'} />
            </div>
            <div className='w-[4rem] h-full cursor-pointer flex justify-center items-center' onClick={() => handleIconClick('setting')}>
              <img className='w-[2.2rem] h-[2.2rem]' src={activeIcon === 'setting' ? '/ClickedSetting.svg' : '/UnclikedSetting.svg'} />
            </div>
            <div className='w-[4rem] h-full cursor-pointer flex justify-center items-center' onClick={() => handleIconClick('graduation')}>
              <img className='w-[2.2rem] h-[2.2rem]' src={activeIcon === 'graduation' ? '/ClickedGradi.svg' : '/UnclickedGradi.svg'} />
            </div>
          </div>
        )}

        {isAdmin === '학생' && (
          <>
            <img
            className="w-[2.3rem] h-[2.5rem] absolute right-[10vw] sm:right-[20vw] cursor-pointer" src={mailList.length === 0 ? '/Mail.svg' : '/mailPoint.svg'}
            onClick={() => setMailOver((prev) => !prev)}/>
            {MailOver && (
              <div id="MailContainer" className={`w-[90vw] max-w-[28rem] min-w-[16rem] scrollbar-hide ${
              mailList.length >= 8 ? 'max-h-[30rem] overflow-y-auto scrollbar-hide' : 'min-h-[6rem]'
                } bg-white absolute right-[6vw] top-[4rem] z-[3000] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] rounded-[0.5rem] flex flex-col`}>
                <div id="MailTop" className="w-full pl-[0.9rem] pt-[0.8rem] pr-[0.9rem]">
                  <span className="text-black text-[0.9rem] font-[700] font-pretendard">알림함</span>
                  <div id="mailscroll" className={`w-full ${
                  mailList.length >= 8 ? 'max-full overflow-y-auto scrollbar-hide' : ''
                  } min-h-[6rem] flex flex-col gap-2 mt-2`}>
                    {mailList.length === 0 ? (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">메일 없음</div>
                    ) : (
                      mailList.map((mail, idx) => (
                        <div key={idx} className="border border-gray-200 rounded p-2 bg-gray-50 text-sm text-black">
                          <div className="font-semibold">{mail.content}</div>
                            <div>{`(승인된 대여: ${mail.createAt} ${mail.item} ${mail.count}개)`}</div>
                          </div>
                  ))
                )}
              </div>
            </div>
          </div>
          )}
          </>
        )}

        <img className='w-[3.5rem] h-[3.5rem] absolute right-[8vw] cursor-pointer' onMouseLeave={() => setMouseOver(false)} onMouseEnter={() => setMouseOver(true)} src={'/PersonPurple.svg'} alt="프로필"/>
        {MouseOver && (
          <div className='flex flex-col items-center gap-[0.5rem] absolute top-[70px] right-[5vw] z-[10] bg-white border-[1px] border-[#e0e0e0] rounded-[8px] shadow-md p-[2rem]'
            onMouseLeave={() => setMouseOver(false)}
            onMouseEnter={() => setMouseOver(true)}>
            <div className='flex flex-col items-center gap-[0.5rem]'>
              <span className='font-[400] text-[1rem] text-black cursor-pointer' onClick={handlelogout}>로그아웃</span>
              <span className='font-[400] text-[1rem] text-black cursor-pointer' onClick={handlepw}>비밀번호 변경</span>
            </div>
          </div>
        )}
    </div>
  );
}

export default Nav;
