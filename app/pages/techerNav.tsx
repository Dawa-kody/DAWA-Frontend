'use client';
import React from 'react'
import { useRouter } from 'next/router';
import * as S from'../styles/Nav';
function Nav() {
  return (
 <>

<S.Component>

<S.Hello>안녕하세요, 선생님!!</S.Hello>  
<div>
 <S.Logo src={'./LogoText.png'} alt='로고' ></S.Logo>
</div>

<div>
<S.HomeText>대시보드</S.HomeText>
 <S.Home src={'./HomeWhite.png '} alt='홈'></S.Home>
</div>

<div>
<S.DangerousText>응급사항</S.DangerousText>
 <S.Dangerous src={'./UnActivityWhit.png'} alt='응급사항'></S.Dangerous>
</div>



 <S.Login src={'./PersonWhite.png '} alt='프로필'></S.Login>




</S.Component>

<S.Momoka src={'./mokoko.png'} />
 </>
  )
}

export default Nav





