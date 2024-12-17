'use client'

import React, { useState, useEffect } from "react";
import * as S from "../styles/Main";
import axios from "axios";

import VisitModal from "../components/VisitModal";
import VisitData from "../components/VisitData";
import RentData from "../components/RentData";

import { VisitDatas } from "../components/VisitData";
import { RentDatas } from "../components/RentData";

function Main(){
    const [modalOpen, setModalOpen] = useState(false);
    const [TActive, setTActive] = useState(false); //선생님 부재중, 출근중 상태
    const [BActive, setBActive] = useState(true); //침대 현황 상태
    const [visitDataList, setVisitDataList] = useState<VisitDatas[]>([]); //방문 기록 데이터
    const [rentDataList, setRentDataList] = useState<RentDatas[]>([]); //대여 기록 데이터

    useEffect(() => {
        async function fetchVisitData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/recodeGet`);
                setVisitDataList(response.data);
            } catch (error) {
                console.error("방문 기록 데이터를 불러오는 중 에러 발생:", error);
            }
        }
        fetchVisitData();
    }, []);

    useEffect(() => {
        async function fetchRentData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/cocGet`);
                setRentDataList(response.data);
            } catch (error) {
                console.error("대여 기록 데이터를 불러오는 중 에러 발생:", error);
            }
        }
        fetchRentData();
    }, []);

    function click(){
        setModalOpen(true);
    }

    function TeacherActive(){
        setTActive(true);
    }

    function BedActive(){
        setBActive(false);
    }

    return(
        <>
            {modalOpen  && (
                <VisitModal onClose={() => setModalOpen(false)} />
            )}

            <S.Container>
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

                <S.VisitModalDiv>
                    <S.ModalTitle>방문 기록 작성</S.ModalTitle>
                    <S.ModalButton onClick={click}>방문기록 작성</S.ModalButton>
                </S.VisitModalDiv>

                <S.RentDiv>
                    <S.RentTitle>대여기록</S.RentTitle>
                    {rentDataList.length > 0 ? (
                        rentDataList.map((rent, index) => (
                            <RentData
                                key={index}
                                Date={rent.Date}
                                Item={rent.Item}
                                Number={`${rent.Number}개`}
                            />
                        ))
                    ) : (
                        <S.RentNonActiveSpan>대여한 기록이 존재하지 않습니다.</S.RentNonActiveSpan>
                    )}
                </S.RentDiv>

                <S.VisitDiv>
                    <S.VisitTitle>방문기록</S.VisitTitle>
                    {visitDataList.length > 0 ? (
                        visitDataList.map((visit, index) => (
                            <VisitData
                                key={index}
                                Date={visit.Date}
                                Week={visit.Week}
                                Content={visit.Content}
                            />
                        ))
                    ) : (
                        <S.VisitNonActiveSpan>방문한 기록이 존재하지 않습니다.</S.VisitNonActiveSpan>
                    )}

                </S.VisitDiv>

                <S.BedDiv>
                    <S.BedTitle>침대 현황</S.BedTitle>
                    {BActive ? (
                        <>
                            <S.BedMenNonActiveDiv Active={true}>
                                <S.BedIcon src={"/Bed.svg"} />
                                {BActive  && (
                                    <S.BedIsFree>침대 사용 가능</S.BedIsFree>
                                )}
                            </S.BedMenNonActiveDiv>

                            <S.BedWomenNonActiveDiv Active={true}>
                                <S.BedIcon src={"/Bed.svg"} />
                                {BActive  && (
                                    <S.BedIsFree>침대 사용 가능</S.BedIsFree>
                                )}
                            </S.BedWomenNonActiveDiv>
                        </>
                    ) : (
                        <>
                            <S.BedMenNonActiveDiv Active={false}>
                                <S.BedIcon src={"/Bed.svg"} />  
                            </S.BedMenNonActiveDiv>

                            <S.BedWomenNonActiveDiv Active={false}>
                                <S.BedIcon src={"/Bed.svg"} />
                            </S.BedWomenNonActiveDiv>
                        </>
                    )}
                </S.BedDiv>
            </S.Container>
        </>
    );
}

export default Main;