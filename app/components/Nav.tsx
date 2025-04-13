'use client';

import React, { useState, useEffect } from 'react';
import * as S from '../styles/Nav';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../components/AuthContext';

function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  const [activeMenu, setActiveMenu] = useState<'home' | 'dangerous' | 'moonjin' | null>(null);
  const [MouseOver, setMouseOver] = useState(false);
  const [activeIcon, setActiveIcon] = useState<'home' | 'folder' | 'setting'>('home');

  useEffect(() => {
    if (pathname === '/') {
      setActiveMenu('home');
    } else if (pathname === '/FirstAid') {
      setActiveMenu('dangerous');
    } else if (pathname === '/Sheet') {
      setActiveMenu('moonjin');
    } else {
      setActiveMenu(null);
    }
  }, [pathname]);

  const handleIconClick = (icon: 'home' | 'folder' | 'setting') => {
    setActiveIcon(icon);
  
    switch (icon) {
      case 'home':
        router.push('/');
        break;
      case 'folder':
        router.push('/Sheet');
        break;
      case 'setting':
        router.push('/FirstAid');
        break;
    }
  };

  const handlelogout = () => {
    router.push('/Login');
  };

  const handlepw = () => {
    router.push('/Password');
  };

  return (
    <S.Component>
        <S.NavContainer>
        <S.Logo src="/Logo.svg" />
        <S.LogoText>다와</S.LogoText>

        {isAdmin && (
          <S.IconContainer>
          <S.HomeWrapper onClick={() => handleIconClick('home')}>
            <S.HomeIcon
              src={activeIcon === 'home' ? '/ClickedHome.svg' : '/UnclickedHome.svg'}
            />
          </S.HomeWrapper>
        
          <S.FolderWrapper onClick={() => handleIconClick('folder')}>
            <S.FolderIcon
              src={activeIcon === 'folder' ? '/ClickedFolder.svg' : '/UnclikedFolder.svg'}
            />
          </S.FolderWrapper>
        
          <S.SettingWrapper onClick={() => handleIconClick('setting')}>
            <S.SettingIcon
              src={activeIcon === 'setting' ? '/ClickedSetting.svg' : '/UnclikedSetting.svg'}
            />
            </S.SettingWrapper>
          </S.IconContainer>
        )}

        <S.Login
          onMouseLeave={() => setMouseOver(false)}
          onMouseEnter={() => setMouseOver(true)}
          src={'/PersonPurple.svg'}
          alt="프로필"
        />

        {MouseOver && (
          <S.LoginHoverBox
            onMouseLeave={() => setMouseOver(false)}
            onMouseEnter={() => setMouseOver(true)}
          >
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
