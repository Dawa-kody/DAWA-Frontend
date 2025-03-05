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
  
  const shandleNavigation = (menuName: 'home' | 'dangerous' | 'moonjin', path: string) => {
    setActiveMenu(menuName);
    router.push(path);
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

        {isAdmin && <S.AdminText>선생님, 안녕하세요!</S.AdminText>}

        {isAdmin && (
          <S.MoonjinHap
            onClick={() => shandleNavigation('moonjin', '/Sheet')}
            Active={activeMenu === 'moonjin'}
          >
            <S.Moonjin
              src={activeMenu === 'moonjin' ? 'moonjinPurple.svg' : 'moonjinWhite.svg'}
              alt="문진표"
            />
            <S.MoonjinText active={activeMenu === 'moonjin'}>문진표 작성</S.MoonjinText>
          </S.MoonjinHap>
        )}

        <S.HomeHap
          onClick={() => shandleNavigation('home', '/')}
          Active={activeMenu === 'home'}
        >
          <S.Home
            src={activeMenu === 'home' ? '/HomePurple.svg' : '/HomeWhite.svg'}
            alt="홈"
          />
          <S.HomeText active={activeMenu === 'home'}>대시보드</S.HomeText>
        </S.HomeHap>

        <S.DangerousHap
          onClick={() => shandleNavigation('dangerous', '/FirstAid')}
          Active={activeMenu === 'dangerous'}
        >
          <S.Dangerous
            src={activeMenu === 'dangerous' ? '/ActivityPurple.svg' : '/ActivityWhite.svg'}
            alt="응급사항"
          />
          <S.DangerousText active={activeMenu === 'dangerous'}>응급처치</S.DangerousText>
        </S.DangerousHap>

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
