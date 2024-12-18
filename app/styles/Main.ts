import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    
    display: flex;
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

export const TeacherState = styled.span<{ Active : boolean }>`
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

    color: ${({ Active }) => (Active ? '#6948ED' : '#98A2B3')};
`

/* 선생님 현황 */

export const VisitModalDiv = styled.div`
    position: absolute;
    width: 335px;
    height: 178px;
    left: 30px;
    top: 262px;

    display: flex;
    align-items: center;
    flex-direction: column;

    background: #FFFFFF;
    border-radius: 9.43792px;
`

/* 방문 기록 작성 */

export const ModalTitle = styled.span`
position: absolute;
    width: 170px;
    height: 36px;
    top: 24px;
    left: 24px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 36px;
    /* identical to box height */

    color: #000000;
`

/* 버튼 */

export const ModalButton = styled.button`
    position: absolute;
    width: 292px;
    height: 40px;
    top: 100px;

    background: #6948ED;
    border-radius: 10px;

    color: white;
    font-family: Pretendard;
    font-weight: 600;
    font-size: 18;
`

/* 대여기록  */

export const RentDiv = styled.div`
    position: absolute;

    width: 1284px;
    height: 305px;
    left: 393px;
    top: 135px;

    display: flex;
    flex-direction: row;
    gap: 15px;

    background: #FFFFFF;
    border-radius: 10px;
`

/* 대여기록 제목 */

export const RentTitle = styled.span`
    position: absolute;
    height: 42px;
    left: 34px;
    top: 29px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    font-size: 31px;
    line-height: 42px;
    /* identical to box height */

    color: #000000;
`

/* 대여한 기록이 존재하지 않습니다. */

export const RentNonActiveSpan = styled.span`
    position: absolute;
    width: 314px;
    height: 29px;
    left: 500px;
    top: 140px;

    font-family: Pretendard Variable;
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 29px;
    /* identical to box height */

    color: #98A2B3;
`

/* 방문기록 */

export const VisitDiv = styled.div`
    position: absolute;
    width: 1284px;
    height: 406px;
    left: 30px;
    top: 473px;

    display: flex;
    flex-direction: row;
    gap: 15px;

    background: #FFFFFF;
    border-radius: 10px;
`

/* 방문기록 */

export const VisitTitle = styled.span`
    position: absolute;
    height: 42px;
    left: 35px;
    top: 29px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    font-size: 31px;
    line-height: 42px;
    /* identical to box height */

    color: #000000;
`

/* 방문한 기록이 존재하지 않습니다. */
export const VisitNonActiveSpan = styled.span`
    position: absolute;
    width: 314px;
    height: 29px;
    left: 500px;
    top: 205px;

    font-family: Pretendard Variable;
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 29px;
    /* identical to box height */

    color: #98A2B3;
`

/* 침대 현황 */
export const BedDiv = styled.div`
    position: absolute;
    width: 335px;
    height: 405px;
    left: 1341px;
    top: 473px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: #FFFFFF;
    border-radius: 15px;
`

/* 침대 현황 */

export const BedTitle = styled.span`
    position: absolute;
    width: 111px;
    height: 36px;
    left: 26px;
    top: 28px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 36px;
    /* identical to box height */

    color: #000000;
`

/* 침대현황 비활성화 */

export const BedMenNonActiveDiv = styled.div<{ Active : boolean }>`
    position: absolute;
    width: 284px;
    height: 140px;
    left: 26px;
    top: 85px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background: ${({ Active }) => (Active ? '#7CD4FD' : '#F2F4F7')};
    border-radius: 12.5839px;
`

export const BedWomenNonActiveDiv = styled.div<{ Active : boolean }>`
    position: absolute;
    width: 284px;
    height: 140px;
    left: 26px;
    top: 245px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background: ${({ Active }) => (Active ? '#FEA3B4' : '#F2F4F7')};
    border-radius: 12.5839px;
`

/* 침대 svg */
export const BedIcon = styled.img`
    width: 152px;
    height: 76px;
`

/* 침대 사용 허락 문구 */
export const BedIsFree = styled.span`
    position: relative;
    font-size: 18px;
    font-family: Pretendard;
    font-weight: bolder;
    top: 10px;

    color: white;
`













