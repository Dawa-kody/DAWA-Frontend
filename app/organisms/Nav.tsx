'use client';

import React, { useState, useEffect } from 'react';
import * as S from '../styles/Nav';
import { useRouter, usePathname } from 'next/navigation';

function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const [MouseOver, setMouseOver] = useState(false);
  const [activeIcon, setActiveIcon] = useState<'home' | 'folder' | 'setting' |'graduation'>('home');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (pathname === '/') {
      setActiveIcon('home');
    } 
    
    else if (pathname === '/Sheet') {
      setActiveIcon('folder');
    }
    
    else if (pathname === '/Management') {
      setActiveIcon('setting');
    }
    
    else if (pathname === '/Student') {
      setActiveIcon('graduation');
    }
    
  }, [pathname]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if(role === "ROLE_TEACHER") {
      setIsAdmin(true);
    }
  }, []);

  const handleIconClick = (icon: 'home' | 'folder' | 'setting' | 'graduation') => {
    switch (icon) {
      case 'home':
        router.push('/');
        break;
      case 'folder':
        router.push('/Sheet');
        break;
      case 'setting':
        router.push('/Management');
        break;
      case 'graduation':
        router.push('/Student');
        break;
    }
  };

  const handlelogout = () => {
    router.push('/Login');
  };

  const handlepw = () => {
    router.push('/Password');
  };

  const gotohome = () => {
    router.push('/');
  }

  return (
    <S.Component>
        <S.NavContainer>
        <S.Logo src="/Logo.svg" onClick={gotohome} />
        <S.LogoText onClick={gotohome}>다와</S.LogoText>

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

            <S.GradiWrapper onClick={() => handleIconClick('graduation')}>
              <S.GradiIcon
                src={activeIcon === 'graduation' ? '/ClickedGradi.svg' : '/UnclickedGradi.svg'}
              />
            </S.GradiWrapper>
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
