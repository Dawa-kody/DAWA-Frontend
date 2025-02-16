import React from 'react'
import * as S from "../styles/Today"; 

const today=new Date();
const format=`오늘은 ${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일입니다`
function Today() {
  return (
    <>
    <S.Today>{format}</S.Today>
    </>
  )
}

export default Today