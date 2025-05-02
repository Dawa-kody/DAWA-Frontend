'use client';

import React, { useState, useEffect } from 'react';
import * as S from '../styles/Nav';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { headers } from 'next/headers';

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
    <S.Component>
      <S.NavContainer>
        <S.Logo src="/Logo.svg" onClick={gotohome} />
        <S.LogoText onClick={gotohome}>다와</S.LogoText>

        {isAdmin === '선생님' && (
          <S.IconContainer>
            <S.HomeWrapper onClick={() => handleIconClick('home')}>
              <S.HomeIcon src={activeIcon === 'home' ? '/ClickedHome.svg' : '/UnclickedHome.svg'} />
            </S.HomeWrapper>
            <S.FolderWrapper onClick={() => handleIconClick('folder')}>
              <S.FolderIcon src={activeIcon === 'folder' ? '/ClickedFolder.svg' : '/UnclikedFolder.svg'} />
            </S.FolderWrapper>
            <S.SettingWrapper onClick={() => handleIconClick('setting')}>
              <S.SettingIcon src={activeIcon === 'setting' ? '/ClickedSetting.svg' : '/UnclikedSetting.svg'} />
            </S.SettingWrapper>
            <S.GradiWrapper onClick={() => handleIconClick('graduation')}>
              <S.GradiIcon src={activeIcon === 'graduation' ? '/ClickedGradi.svg' : '/UnclickedGradi.svg'} />
            </S.GradiWrapper>
          </S.IconContainer>
        )}

        {isAdmin === '학생' && (
          <>
            <img
            className="w-[37.05px] h-[40px] absolute right-[320px] cursor-pointer" src={mailList.length === 0 ? '/Mail.svg' : '/mailPoint.svg'}
            onClick={() => setMailOver((prev) => !prev)}/>
            {MailOver && (
              <div id="MailContainer" className={`w-[28rem] h-[20rem] scrollbar-hide ${
              mailList.length >= 8 ? 'max-h-[30rem] overflow-y-auto scrollbar-hide' : 'min-h-[6rem]'
                } bg-white absolute right-[120px] top-[60px] z-[3000] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] rounded-[0.5rem] flex flex-col`}>
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

        <S.Login onMouseLeave={() => setMouseOver(false)} onMouseEnter={() => setMouseOver(true)} src={'/PersonPurple.svg'} alt="프로필"/>
        {MouseOver && (
          <S.LoginHoverBox
            onMouseLeave={() => setMouseOver(false)}
            onMouseEnter={() => setMouseOver(true)}>
            <S.TextContainer>
              <S.Text onClick={handlelogout}>로그아웃</S.Text>
              <S.Text onClick={handlepw}>비밀번호 변경</S.Text>
            </S.TextContainer>
          </S.LoginHoverBox>
        )}
      </S.NavContainer>
    </S.Component>
  );
}

export default Nav;
