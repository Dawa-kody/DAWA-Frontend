'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { ICON } from '@/constants';

interface mailDTO {
  content: string;
  item: string;
  count: string;
  createAt: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;
const MAIL_API = `${BASE_URL}/mail`;

export function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); 
  const [MailOver, setMailOver] = useState(false);
  const [activeIcon, setActiveIcon] = useState<'home' | 'folder' | 'setting' | 'graduation'>('home');
  const [isAdmin, setIsAdmin] = useState('학생');
  const [mailList, setMailList] = useState<mailDTO[]>([]);

  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mailContainer = document.getElementById('MailContainer');
      const mailIcon = document.getElementById('MailIcon');
      if (
        mailContainer &&
        !mailContainer.contains(event.target as Node) &&
        mailIcon &&
        !mailIcon.contains(event.target as Node)
      ) {
        setMailOver(false);
      }
    };

    if (MailOver) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [MailOver]); 


  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const fetchMailList = async () => {
    const token = window.localStorage.getItem('accessToken');
    try {
      const response = await axios.get<mailDTO[]>(MAIL_API, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  const handlelogout = () => router.push('/Signin');
  const handlepw = () => router.push('/Password');
  const gotohome = () => router.push('/');

  return (
    <div className="w-full h-[10vh] bg-white user-select-none flex justify-between items-center pl-[10vw] pr-[10vw]">
      <div className="flex items-center cursor-pointer" onClick={gotohome}>
        <img className="w-[3.5rem] h-[2.2rem] mb-[0.5rem]" src={`${ICON.SVG_ICON}/Logo.svg`} />
        <span className="font-pretendard font-[700] text-[1.6rem] text-primaryPurple ml-[1vw]">다와</span>
      </div>

      {isAdmin === '선생님' && (
        <div className="w-[36rem] h-[4rem] flex items-center gap-[2.5rem]">
          {(['home', 'folder', 'setting', 'graduation'] as const).map((icon) => (
            <div
              key={icon}
              className="w-[4rem] h-full cursor-pointer flex justify-center items-center"
              onClick={() => handleIconClick(icon)}
            >
              <img
                className="w-[2.2rem] h-[2.2rem]"
                src={
                  activeIcon === icon
                    ? `${ICON.SVG_ICON}/Clicked${capitalize(icon)}.svg`
                    : `${ICON.SVG_ICON}/Unclicked${capitalize(icon)}.svg`
                }
              />
            </div>
          ))}
        </div>
      )}

      {isAdmin === '학생' && (
        <>
          <img
            id="MailIcon"
            className="w-[2.3rem] h-[2.5rem] absolute right-[10vw] sm:right-[20vw] cursor-pointer"
            src={mailList.length === 0 ? `${ICON.SVG_ICON}/Mail.svg` : `${ICON.SVG_ICON}/mailPoint.svg`}
            onClick={() => setMailOver((prev) => !prev)}
          />
          {MailOver && (
            <div
              id="MailContainer"
              className={`w-[90vw] max-w-[28rem] min-w-[16rem] max-h-[22vh] ${
                mailList.length >= 8 ? 'max-h-[40rem] overflow-y-auto' : 'min-h-[6rem]'
              } bg-white absolute right-[6vw] top-[4rem] z-[3000] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] rounded-[0.5rem] flex flex-col pb-4`}
            >
              <div id="MailTop" className="w-full pl-[0.9rem] pt-[0.8rem] pr-[0.9rem]">
                <span className="text-black text-[0.9rem] font-[700] font-pretendard">알림함</span>
                <div
                  id="mailscroll"
                  className={`w-full ${mailList.length >= 8 ? 'max-full overflow-y-auto' : ''} min-h-[6rem] flex flex-col gap-2 mt-2`}
                >
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

      {/* 프로필 아이콘 클릭으로 메뉴 토글 */}
      <img
        className="w-[3.5rem] h-[3.5rem] absolute right-[8vw] cursor-pointer"
        onClick={() => setMenuOpen((prev) => !prev)}
        src={`${ICON.SVG_ICON}/PersonPurple.svg`}
        alt="프로필"
      />
      {menuOpen && (
        <div ref={menuRef} className="flex flex-col items-center gap-[0.5rem] absolute top-[70px] right-[5vw] z-[10] bg-white border-[1px] border-[#e0e0e0] rounded-[8px] shadow-md p-[2rem]"
        >
          <div className="flex flex-col items-center gap-[0.5rem]">
            <span className="font-[400] text-[1rem] text-black cursor-pointer" onClick={handlelogout}>로그아웃</span>
            <span className="font-[400] text-[1rem] text-black cursor-pointer" onClick={handlepw}>비밀번호 변경</span>
          </div>
        </div>
      )}
    </div>
  );
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
