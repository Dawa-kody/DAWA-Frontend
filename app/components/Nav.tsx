'use client';

import React, { useEffect, useState } from 'react';
import * as S from '../styles/Nav';
import { useRouter, usePathname } from 'next/navigation';

function Nav() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기
  const [activeMenu, setActiveMenu] = useState<'home' | 'dangerous' | null>(null);
  const [MouseOver, setMouseOver] = useState(false);

  // 경로에 따라 activeMenu 설정
  useEffect(() => {
    if (pathname === '/') {
      setActiveMenu('home');
    } else if (pathname === '/FirstAid') {
      setActiveMenu('dangerous');
    } else {
      setActiveMenu(null);
    }
  }, [pathname]);

  const handleNavigation = (menuName: 'home' | 'dangerous', path: string) => {
    setActiveMenu(menuName);
    router.push(path); // 페이지 이동
  };

  const handlelogout = () => {
    router.push("/Login")
  }

  const handlepw = () => {
    router.push("/Password")
  }

  return (
    <S.Component>
      <S.LogoHap>
        <S.LogoText>다와</S.LogoText>
        <S.Logo src={'Logo.svg'} alt="로고" />
      </S.LogoHap>

      <S.HomeHap
        onClick={() => handleNavigation('home', '/')}
        Active={activeMenu === 'home'}
      >
        <S.Home
          src={activeMenu === 'home' ? 'HomePurple.svg' : 'HomeWhite.svg'}
          alt="홈"
        />
        <S.HomeText active={activeMenu === 'home'}>대시보드</S.HomeText>
      </S.HomeHap>

      <S.DangerousHap
        onClick={() => handleNavigation('dangerous', '/FirstAid')}
        Active={activeMenu === 'dangerous'}
      >
        <S.Dangerous
          src={
            activeMenu === 'dangerous'
              ? 'ActivityPurple.svg'
              : 'ActivityWhite.svg'
          }
          alt="응급사항"
        />
        <S.DangerousText active={activeMenu === 'dangerous'}>
          응급처치
        </S.DangerousText>
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
    </S.Component>
  );
}

export default Nav;
