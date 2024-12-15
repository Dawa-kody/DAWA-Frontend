import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;

    background-color: #F2F4F7;
`

/* 선생님 현황 */
export const TeacherSection = styled.div`
    position: absolute;
    width: 335px;
    height: 105px;
    left: 30px;
    top: 135px;

    background: #FFFFFF;
    border-radius: 9.43792px;

    display: flex;
    align-items: center;
`

/* 프로필 아이콘 넣을 곳 */
export const TeacherIconDiv = styled.div`
    position: absolute;
    width: 68px;
    height: 68px;
    left: 22px;

    background-color: #6948ED;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
`

/* 사람 아이콘 */

export const TeacherIcon = styled.img`
    width: 48px;
    height: 48px;
`

/* 선생님 상태 */

export const TeacherState = styled.span`
    position: absolute;
    width: 136px;
    height: 30px;
    left: 185px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 30px;
    /* identical to box height */

    color: #98A2B3;
`




