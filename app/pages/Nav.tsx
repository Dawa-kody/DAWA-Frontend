'use client';
import React from 'react'
import { useRouter } from 'next/router';
import * as S from'../styles/Nav';
function Nav() {
  return (
 <>

<S.Component>
<div>
<S.LogoText>대시보드</S.LogoText>
 <S.Logo src={'./Logo.png'} alt='로고' ></S.Logo>
</div>

<div>
<S.HomeText>응급처치 변경사항</S.HomeText>
 <S.Home src={'./HomeWhite.png '} alt='홈'></S.Home>
</div>

<div>
<S.DangerousText>프로필</S.DangerousText>
 <S.Dangerous src={'./ActivityPurple.png'} alt='응급사항'></S.Dangerous>
</div>


 <S.Login src={'./PersonPurple.png '} alt='프로필'></S.Login>




</S.Component>

<S.Momoka src={'./mokoko.png'} />
 </>
  )
}

export default Nav





