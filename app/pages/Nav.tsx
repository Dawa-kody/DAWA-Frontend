  'use client';

  import React, { useState } from 'react';
  import { useRouter } from 'next/router';
  import * as S from '../styles/Nav';

  function Nav() {
    const [Homeactive, HomesetActive] = useState<boolean>(false);
    const [Dangerousactive, DangeroussetActive] = useState<boolean>(false);


  const handleHome = () => {
    HomesetActive(!Homeactive);
  };
  
  const handleDangerous = () => {
    DangeroussetActive(!Dangerousactive);
  };
  
      
    return (
      <>
        <S.Component>
          <S.LogoHap>
            <S.LogoText>다와</S.LogoText>
            <S.Logo src={'Logo.png'} alt="로고" />
          </S.LogoHap>

          <S.HomeHap onClick={handleHome}>
            <S.HomeText active={Homeactive}>대시보드</S.HomeText>
            <S.Home
              src={Homeactive ? 'HomePurplr.png' : 'HomeWhite.png'}
              alt="홈"
            />
          </S.HomeHap>

          <S.DangerousHap onClick={handleDangerous}>
            <S.DangerousText active={Dangerousactive}>응급처치</S.DangerousText>
            <S.Dangerous
              src={Dangerousactive ? 'ActivityPurple.png' : 'UnActivityWhit.png'}
              alt="응급사항"
            />
          </S.DangerousHap>

          <S.Login src={'./PersonPurple.png'} alt="프로필" />
        </S.Component>

      </>
    );
  }

  export default Nav;
