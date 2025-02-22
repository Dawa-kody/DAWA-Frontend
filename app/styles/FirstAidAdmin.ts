import styled from "styled-components";

/* 큰 컨테이너 */
    export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    
    display: flex;
    justify-content: center;
    `

/* 선생님이 알려주시는 약, 질병 관련 꿀TIPS ~  : 페이지 소개문 */
    export const Title = styled.span`
    position: absolute;
    width: 871px;
    height: 60px;
    left: 58px;
    top: 132px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 44px;
    line-height: 60px;
    /* identical to box height */

    color: #000000;
    `

/* 증상 키워드 필터 박스 틀 */
export const FilterBoxContainter = styled.div`
    position: absolute;
    width: 1590px;
    height: 120px;
    top: 225px;
    
    border-radius: 16px;
    background-color: white;
`

/* 증상 키워드를 골라보세요 : 필터 키워드 박스 소개문 */
export const KeywordTitle = styled.span`
    position: absolute;
    height: 28px;
    left: 47px;
    top: 14px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 29px;
    display: flex;
    align-items: center;

    color: #98A2B3;

    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
`

/* 필터 요소와 소개문의 구분선 */
export const Line = styled.div`
    position: absolute;
    width: 1515px;
    height: 0px;
    left: 14px;
    top: 53px;
    
    transform: scaleY(0.5);
    border: 1px solid #E4E7EC;
`

/* 카드 컴포넌트 모을 틀 */
export const CardBox = styled.div`
    position: absolute;
    width: 1590px;
    height: auto;
    top: 355px;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 47.5px;
`

/* 선생님 화면 작성 탭 컨테이너 */
export const AdminTextBox = styled.div`
    position: absolute;
    width: 960px;
    height: 710px;
    top: 160px;

    display: grid;
    grid-template-rows: 1fr 1fr 2fr 2fr 14fr;

    border: 0.1px solid black;
    border-radius: 15px;
    background-color: white;
    overflow: hidden;
`


/* 응급처치 작성 탭 grid layout 가로 비율 묶음용 div */
export const AdminGridColumn = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 6fr;
`
/* 탭 요소 맨 위 제목 박스 */
export const TabTitleBox = styled.div`
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 300;
    color:#000;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.1px solid black;
    border-right: 0.1px solid black;
`

/* 인풋 박스 */
export const InputBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color:#000;
    border-bottom: 0.1px solid black;
`

/* 인풋 */
export const Input = styled.input`
    width: 95%;
    height: 70%;
    color:#000;
    border: 1px solid black;
`

/* 선생님 페이지 필터 박스 가운데 모음용 div */
export const AdminFilterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 0.1px solid black;
`

/* 선생님 페이지 증상 키워드 필터 박스 틀 */
export const AdminFilterBoxContainter = styled.div`
    width: 100%;
    height: 50px;
    
    border-radius: 16px;
    background-color: white;
`

/* 태그를 선택해 주세요 : 선생님 페이지필터 키워드 박스 소개문 */
export const AdminKeywordTitle = styled.span`
    position: relative;
    left: 27px;

    font-family: Pretendard;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 29px;
    display: flex;
    align-items: center;

    color: #98A2B3;
`

/* 선생님 페이지 필터 요소와 소개문의 구분선 */
export const AdminLine = styled.div`
    position: relative;
    width: 765px;
    height: 0px;
    top: -3px;
    left: 26px;
    
    transform: scaleY(0.5);
    border: 1px solid #95979D;
`

/* 선생님 페이지 썸네임 탭 내용 부분 div */
export const SubnailDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    border-bottom: 0.1px solid black;
`

/* 선생님 페이지 썸네일 배경 */
export const subnail = styled.div`
    position: relative;
    width: 83px;
    height: 47px;
    left: 24px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    background-color: #6948ED;
`

/* 선생님 페이지 썸네일 세로 구분선 */
export const ColumnLine = styled.div`
    position: relative;
    width: 58px;
    height: 0px;

    border: 1px solid #E4E7EC;
    transform: rotate(-90deg);
`

/* 이모지 선택 박스 */
export const EmojiBox = styled.div`
    position: relative;
    width: 383px;
    height: 47px;
    left: -20px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

export const Emoji = styled.img<{ selected?: boolean }>`
    width: 30px;
    height: 30px;
    cursor: pointer;
    position:relative;
    left:120px;
    ${({ selected }) =>
        selected &&
        `
            transform: scale(1.2);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        `}
`;

export const TextConatiner = styled.div`
    width: 100%;
    height: 100%;
`

/* 폰트 크기 탭 div */
export const FontBox = styled.div`
    width: 100%;
    height: 30px;

    display: flex;
    align-items: center;

    border-bottom: 0.1px solid black;
`

/* 글자 크기 : */
export const FontSpan = styled.span`
    position: relative;
    left: 20px;
    color:#000;
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 200;
`

/* select box */
export const SelectBox = styled.select`
    position: relative;
    width: 60px;
    height: 15px;
    left: 30px;
    display: flex;
    align-items: center;
    font-size: 10px;
    padding-left: 40px;
    border: 1px solid #ccc;
    color:#000;
    appearance: none;
    background-color: #fff;
    cursor: pointer;
`;

export const PreviewBox = styled.textarea<{ fontSize: string }>`
    position: relative;
    width: 95%;
    height: 90%;
    left: 15px;
    top: 5px;

    border: 0.1px solid black;
    resize: none;
    color:#000;
    font-size: ${(props) => props.fontSize || "16px"};
`;

/* 확인 버튼*/
export const SubmitButton = styled.button`
    position: relative;
    width: 126px;
    height: 56px;
    top: 803px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Pretendard;
    font-size: 21px;
    font-weight: 500;

    color: white;
    background: #6948ED;
    border-radius: 5px;
`

    export const SelectedThumbnail=styled.img`
    width:80px;
    height: 50px;
    background-color:#6948ED;
    border-radius:15px;
    position:relative;
    left:20px;
    `

    export const Option=styled.option`
    font-size:14px;
    `