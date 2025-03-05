'use client';

import React, { useState, useEffect } from "react";
import * as S from "../styles/Main";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Nav from "../components/Nav";

import VisitModal from "../components/VisitModal";
import RentModal from "../components/RentModal";
import VisitData from "../components/VisitData";
import RentData from "../components/RentData";
import VisitDataAdmin from "../components/VisitDataAdmin";
import RentDataAdmin from "../components/RentDataAdmin";

import { VisitDatas } from "../components/VisitData";
import { VisitAdminDatas } from "../components/VisitDataAdmin";
import { RentDatas } from "../components/RentData";
import { RentAdminDatas } from "../components/RentDataAdmin";

function MainAdmin() { 
    const [TActive, setTActive] = useState(false); // 선생님 부재중, 출근중 상태
    const [BActive, setBActive] = useState(true); // 침대 현황 상태
    
    const [visitAdminDataList, setVisitAdminDataList] = useState<VisitAdminDatas[]>([]);
    const [rentAdminDataList, setRentAdminDataList] = useState<RentAdminDatas[]>([]);
    const [bedStatus, setBedStatus] = useState<{ bed1: boolean; bed2: boolean }>({
        bed1: true,
        bed2: true,
      }); // 침대 상태 관리
    return(
        <>
        <S.Container>
            <Nav />
            <S.TeacherSection>
                <S.TeacherIconDiv>
                    <S.TeacherIcon src={"/people.svg"} />
                </S.TeacherIconDiv>

                {TActive ? (
                    <S.TeacherState Active={true}>선생님 출근중</S.TeacherState>
                ) : (
                    <S.TeacherState Active={false}>선생님 부재중</S.TeacherState>
                )}
            </S.TeacherSection>

            <S.WriteListContainer>
                <S.WriteTitle>문진표 작성</S.WriteTitle>
                <S.WriteButton>문진표 작성</S.WriteButton>
            </S.WriteListContainer>

            <S.RentDiv>
                <S.RentTitle>학생들의 가장 최근 대여</S.RentTitle>

                {rentAdminDataList.length === 0 && (
                    <S.RentNonActiveSpan>대여한 기록이 존재하지 않습니다.</S.RentNonActiveSpan>
                )}

                <S.RentDataCards>
                    {rentAdminDataList.map(({ id, ...rent }) => (
                    <RentDataAdmin key={id} {...rent} />
                    ))}
                </S.RentDataCards>
            </S.RentDiv>

            <S.VisitDiv>
                <S.VisitTitle>학생들의 가장 최근 방문기록</S.VisitTitle>
                
                {visitAdminDataList.length === 0 && (
                    <S.VisitNonActiveSpan>방문한 기록이 존재하지 않습니다.</S.VisitNonActiveSpan>
                )}
                
                <S.VisitDataCards>
                    {visitAdminDataList.map(({ id, ...visit }) => (
                    <VisitDataAdmin key={id} {...visit} />
                    ))}
                </S.VisitDataCards>
            </S.VisitDiv>

            <S.BedDiv>
            <S.BedTitle>침대 사용 여부</S.BedTitle>
            {BActive ? (
                <>
                <S.AdminBedMenNonActiveDiv Active={bedStatus.bed1}>
                    <S.BedIcon src={"/Bed.svg"} />
                    {bedStatus.bed1 ? <S.BedIsFree>침대 사용 가능</S.BedIsFree> : <S.BedIsFree>침대 사용 중</S.BedIsFree>}
                    </S.AdminBedMenNonActiveDiv>

                <S.ManToggleContainer onClick={() => toggleBed("M")}>
                    <S.ManToggleCircle Active={bedStatus.bed1} />
                </S.ManToggleContainer>

                <S.AdminBedWomenNonActiveDiv Active={bedStatus.bed2}>
                    <S.BedIcon src={"/Bed.svg"} />
                    {bedStatus.bed2 ? <S.BedIsFree>침대 사용 가능</S.BedIsFree> : <S.BedIsFree>침대 사용 중</S.BedIsFree>}
                </S.AdminBedWomenNonActiveDiv>

                <S.WomanToggleContainer onClick={() => toggleBed("W")}>
                    <S.WomanToggleCircle Active={bedStatus.bed2} />
                </S.WomanToggleContainer>
                </>
            ) : (
                <>
                <S.BedMenNonActiveDiv Active={bedStatus.bed1}>
                    <S.BedIcon src={"/Bed.svg"} />
                    {bedStatus.bed1 ? <S.BedIsFree>침대 사용 가능</S.BedIsFree> : <S.BedIsFree>침대 사용 중</S.BedIsFree>}
                </S.BedMenNonActiveDiv>

                <S.BedWomenNonActiveDiv Active={bedStatus.bed2}>
                    <S.BedIcon src={"/Bed.svg"} />
                    {bedStatus.bed2 ? <S.BedIsFree>침대 사용 가능</S.BedIsFree> : <S.BedIsFree>침대 사용 중</S.BedIsFree>}
                </S.BedWomenNonActiveDiv>
                </>
            )}
            </S.BedDiv>
        </S.Container>
        </>
    )
}

export default MainAdmin