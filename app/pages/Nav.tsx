'use client';

import React, { useState } from 'react';
import * as S from '../styles/Nav';

function Nav() {
  const [activeMenu, setActiveMenu] = useState<'home' | 'dangerous' | null>(null);
  const [MouseOver, setMouseOver] = useState(false); 

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
            <S.Dangerous
              src={activeMenu === 'dangerous' ? 'ActivityPurple.png' : 'UnActivityWhite.png'} alt="응급사항" />
            <S.DangerousText active={activeMenu === 'dangerous'}>응급처치</S.DangerousText>
         </S.DangerousHap>
 
         <S.Login onMouseLeave={()=>setMouseOver(false) } onMouseEnter={()=>setMouseOver(true)} src={'./PersonPurple.png'}alt="프로필"/>
         {MouseOver && (
        <S.LoginHoverBox onMouseLeave={() => setMouseOver(false)} 
                         onMouseEnter={() => setMouseOver(true)}>
            <S.TextContainer>
                <S.Text>로그아웃</S.Text>
                <S.Text>비밀번호 변경</S.Text>
            </S.TextContainer>
        </S.LoginHoverBox>
  )}
</S.Component>

    </>
  );
}

export default Nav;
