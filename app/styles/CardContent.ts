import styled from "styled-components";

/* Header div */
export const Header = styled.div`
    position: absolute;
    width: 960px;
    height: 180px;
    left: 195px;
    top: 137px;

    background: #FFFFFF;
    border-radius: 20px;
`

/* 감기증상, 독감 증상 */
export const diseaseName = styled.span`
    position: absolute;
    height: 19px;
    left: 53px;
    top: 32px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */

    color: #6948ED;
`

/* 만약 머리가 깨질 듯이 아프다면? : 카드의 제목 */
export const CardTitle = styled.span`
    position: absolute;
    width: 534px;
    height: 50px;
    left: 48px;
    top: 60px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 37px;
    line-height: 50px;

    color: #000000;
`

/* 태그 묶음용 div */
export const TagBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 12px;
`

/* 태그 */
export const diseaseTag = styled.div`
    position: relative;
    height: 27px;
    left: 47px;
    top: 123px;
    
    display: inline-block;
    padding: 4px 15px 0px 13px;

    font-family: Pretendard;
    font-size: 12px;

    background: #D4C9FF;
    border-radius: 13.5211px;
`

/* card 컴포넌트의 screen */
export const screen = styled.div`
    position: absolute;
    width: 240px;
    height: 130px;
    left: 670px;
    top: 24px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #6948ED;
    border-radius: 16px;
`

/* screen 속 Emoji */
export const emoji = styled.img`
    width: 90px;
    height: 90px;
`

/* 카드 컴포넌트의 내용  적힌 div */
export const ContentBox = styled.div`
    position: absolute;
    width: 960px;
    height: 542px;
    left: 195px;
    top: 338px;
    
    display: flex;
    flex-direction: column;

    background: #FFFFFF;
    border-radius: 20px;
`

/* 병과 관련된 내용을 묶는 Box */
export const DiseaseBox = styled.div`
    position: relative;
    left: 70px;
    top: 40px;

    display: flex;
    flex-direction: column;
`

/* ContentBox 안에 있는 카드 컴포넌트 제목 */
export const DiseaseTitle = styled.span`
    position: relative;

    font-family: Pretendard;
    font-size: 22px;
    font-weight: 500;
`

/* ContentBox에 있는 병에 대한 내용 */
export const DiseaseContent = styled.textarea`
    position: relative;
    width: 650px;
    height: auto;

    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400px;

    overflow: visible;
    resize: none;
`

/* 해결방법과 관련된 내용을 묶는 Box */
export const SolutionBox = styled.div`
    position: relative;
    left: 70px;
    bottom: 40px;

    display: flex;
    flex-direction: column;
`

/* ContentBox 안에 있는 카드 해결 방법 제목 */
export const SolutionTitle = styled.span`
    position: relative;

    font-family: Pretendard;
    font-size: 22px;
    font-weight: 500;
`

/* ContentBox에 있는 해결 방법에 대한 내용 */
export const SolutionContent = styled.textarea`
    position: relative;
    width: 650px;
    height: auto;

    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400px;

    overflow: visible;
    resize: none;
`

/* 그래도 만약 머리가 깨질 듯이 아프다면 해야할건? -> 보건실 방문 : 고정 멘트 */
export const Ment = styled.span`
    position: relative;
    left: 66px;
    bottom: 40px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */

    color: #98A2B3;
`

/* 추천 필터링 박스 div */
export const SimilarData = styled.div`
    position: absolute;
    width: 300px;
    height: auto;
    left: 1210px;
    top: 138px;

    display: inline-block;
    gap: 25px;

    background: #FFFFFF;
    border-radius: 21.7252px;
`

/* 비슷하지만 다른 증상 */
export const SimilarTitle = styled.span`
    position: absolute;
    width: 182px;
    height: 26px;
    left: 30px;
    top: 28px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;

    color: #000000;
`

/* 비슷하지만 다른 증상 글과 데이터들의 구분선 */
export const DataLine = styled.div`
    position: absolute;
    width: 238.98px;
    height: 0px;
    left: 30px;
    top: 62px;

    border: 1.08626px solid #E4E7EC;
`

/* 데이터를 나열할 틀 */
export const DatasBox = styled.div`
    position: relative;
    left: 30px;
    margin-top: 80px;

    display: flex;
    flex-direction: column;
    gap: 5px;

    margin-top: var(--box-margin, 20px); /* 기본 간격 */

    &:first-child {
        --box-margin: 80px; /* 첫 번째 박스만 간격 변경 */
    }
`

/*데이터의 제목 */
export const DataTitle = styled.span`
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 500;
`

/* 태그 모음 */
export const DataTagBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

/*적용된 태그 */
export const DataTag = styled.span`
    position: relative;
    
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 300;

    color: #6948ED;
`

/* 하단 구분선 */
export const BottomLine = styled.div`
    position: relative;
    width: 210px;
    height: 0px;
    top: 11px;

    border: 1px solid #E4E7EC;
`


    
