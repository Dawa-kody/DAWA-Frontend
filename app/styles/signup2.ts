import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`;

export const LeftSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: #FFFFFF;
`;

export const RightSection = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const GradientOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(105, 72, 237, 0.3) 0%, #6948ED 100%);
    z-index: 1;
`;

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
`

export const HelloText = styled.span`
 position: absolute;
    left: 105px;
    top: 174px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;

    color: #000000;
`

export const SubText = styled.span`
    position: absolute;
    left: 105px;
    top: 218px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;

    color: #000000;
`

export const GoLogin = styled.span`
    position: absolute;
    left: 251px;
    top: 218.5px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;

    color: #6948ED;
    cursor: pointer;
`

export const Title = styled.span`
    position: absolute;
    left: 124px;
    top: 285px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;

    color: #000000;
`

export const InputGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 7px;
`

export const InputLabel = styled.label`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;

    color: #000000;
`

export const StyledInput = styled.input`
    width: 100%;
    height: 53px;
    top: 461px;

    background: #F2F4F7;
    border-radius: 8px;
    
    padding-left: 20px;
    font-family: 'Pretendard';

    &::placeholder{
        color: #95979D;
    }
`
export const ButtonGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 7px;
`


export const Buttons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`

export const MenButton = styled.div<{ isSelected: boolean }>`
    width: 45%;
    height: 53px;
    top: 461px;
    margin-right: auto;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    font-family: 'Pretendard';
    font-weight: 500;

    background: ${(props) => (props.isSelected ? "#E4E7EC" : "#F2F4F7")};
    border-radius: 8px;
`

export const WomenButton = styled.div<{ isSelected: boolean }>`
    width: 45%;
    height: 53px;
    top: 461px;
    margin-left: auto;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    background: ${(props) => (props.isSelected ? "#E4E7EC" : "#F2F4F7")};
    border-radius: 8px;
`

export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 63%;
    height: 10vh;
    margin-left: auto;
    margin-right: auto;
    margin-top: -8vh;
`

export const Count1page = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #D9D6FE;
`

export const Count2page = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #6948ED;
`

export const Pages = styled.div`
    display: flex;
    flex-direction: row;
    gap: 9px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 30px;
`

export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
`

export const NextButton = styled.button`
    width: 98px;
    height: 43px;
    border-radius: 10px;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    background-color: #6948ED;
    color: white;

    font-family: 'Pretendard';
    font-weight: 600;
    font-size: 18px;
    align-items: center;
    justify-content: center;
`