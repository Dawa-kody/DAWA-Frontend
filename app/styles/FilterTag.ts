import styled from "styled-components";

interface FilterTagProps {
    isSelected?: boolean;
}

/* 필터 태그를 나열할 안 보이는 틀 */
export const FilterTagBox = styled.div<{ Active: boolean }>`
    position: absolute;
    width: 1515px;
    height: ${({ Active }) => (Active ? "auto" : "45px")};
    left: 14px;
    top: 63px;

    display: flex;
    flex-direction: row;
    flex-wrap: ${({ Active }) => (Active ? "wrap" : "nowrap")};
    gap: 12px;

    transition: height 0.3s ease-in-out;
`;

/* 필터 틀 */
// export const FilterTag = styled.div`
//     position: relative;
//     height: 34px;
//     left: 25px;
//     top: 8px;

//     display: inline-block;
//     padding: 5px 15px 0px 15px;
//     justify-content: center;
//     align-items: center;
    
//     font-family: Pretendard;

//     background: #F2F4F7;
//     border-radius: 16.8889px;
// `

/* 새로운 필터 틀 */
export const FilterTag = styled.div<FilterTagProps>`
    position: relative;
    height: 34px;
    left: 25px;
    top: 8px;

    display: inline-block;
    padding: 5px 15px 0px 15px;
    justify-content: center;
    align-items: center;

    font-family: Pretendard;

    background: ${({ isSelected }) => (isSelected ? "#007bff" : "#F2F4F7")};
    color: ${({ isSelected }) => (isSelected ? "#ffffff" : "#333")};
    border-radius: 16.8889px;

    transition: background 0.3s ease, color 0.3s ease;
    
    &:hover {
        background: ${({ isSelected }) => (isSelected ? "#0056b3" : "#ccc")};
    }
`;


/* 삼각형 버튼 */
export const TrinangleButton = styled.img<{ Active: boolean }>`
    position: absolute;
    width: 12px;
    height: 12px;
    left: 1530px;
    top: 10px;

    transform: ${({ Active }) => (Active ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease-in-out;
`;