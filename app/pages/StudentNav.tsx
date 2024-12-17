'use client';
import React, { useState } from 'react';
import * as S from '../styles/Nav';

function Nav() {

  const [activeMenu, setActiveMenu] = useState<string>('home');

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <S.Component>
      <div>
        <S.Logo src={'./LogoText.png'} alt="로고" />
      </div>

      <S.Homehap onClick={() => handleMenuClick('home')}>
        <S.HomeText isActive={activeMenu === 'home'}>대시보드</S.HomeText>
        <S.Home src={activeMenu === 'home' ? './HomePurple.png' : './HomeWhite.png'} alt="홈" />
      </S.Homehap>

      <S.Dangeroushap onClick={() => handleMenuClick('dangerous')}>
        <S.DangerousText isActive={activeMenu === 'dangerous'}>응급사항</S.DangerousText>
        <S.Dangerous
          src={activeMenu === 'dangerous' ? './ActivityPurple.png' : './UnActivityWhit.png'}
          alt="응급사항"
        />
      </S.Dangeroushap>
<S.Person src={'/PersonPurple.png'}></S.Person>
    </S.Component>
  );
}

export default Nav;
