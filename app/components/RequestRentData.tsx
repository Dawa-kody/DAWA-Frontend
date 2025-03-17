import React from "react";
import { useState } from "react";
import axios from "axios";
import * as S from "../styles/RequestRentData";

function RequestRentData(){
    return(
        <S.RequestRentDataContainer>
            <S.item>아이스팩</S.item>
            <S.count>1개</S.count>
            <S.line />
            <S.requester>신청인</S.requester>
            <S.student>3318 진건희</S.student>
            <S.acceptBtn>수락</S.acceptBtn>
        </S.RequestRentDataContainer>
    );
}

export default RequestRentData;