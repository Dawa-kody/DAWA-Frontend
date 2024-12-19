'use client';

import React, { useState } from 'react';
import * as S from '../styles/Nav';

function Nav() {
  const [activeMenu, setActiveMenu] = useState<'home' | 'dangerous' | null>(null);

  const handleClick = (menuName: 'home' | 'dangerous') => {
    setActiveMenu(menuName === activeMenu ? null : menuName);
  };

  return (
    <>
      <S.Component>
        <S.LogoHap>
          <S.LogoText>다와</S.LogoText>
          <S.Logo src={'Logo.png'} alt="로고" />
        </S.LogoHap>
        <S.HomeHap onClick={() => handleClick('home')} $active={activeMenu === 'home'}>
  <S.Home src={activeMenu === 'home' ? 'HomePurple.png' : 'HomeWhite.png'} alt="홈" />
  <S.HomeText active={activeMenu === 'home'}>대시보드</S.HomeText>

</S.HomeHap>

<S.DangerousHap onClick={() => handleClick('dangerous')} $active={activeMenu === 'dangerous'}>
  <S.Dangerous src={activeMenu === 'dangerous' ? 'ActivityPurple.png' : 'UnActivityWhite.png'} alt="응급사항" />
  <S.DangerousText active={activeMenu === 'dangerous'}>응급처치</S.DangerousText>
</S.DangerousHap>


        <S.Login src={'./PersonPurple.png'} alt="프로필" />
      </S.Component>
    </>
  );
}

export default Nav;
