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

export const Title = styled.span`
    position: absolute;
    left: 124px;
    top: 225px;

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

export const FormStyledInput = styled.input`
    width: 100%;
    height: 53px;
    top: 461px;

    background: #F2F4F7;
    border-radius: 8px 0px 0px 8px;

    padding-left: 20px;
    font-family: 'Pretendard';

    &::placeholder{
        color: #95979D;
    }
`

export const EmailInput = styled.div`
    width: 100%;
    display: inline-flex;
    flex-direction: row;
`

export const EmailInputButton = styled.button`
    width: 25%;
    border-radius: 0px 8px 8px 0px;
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

export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 63%;
    height: 10vh;
    margin-left: auto;
    margin-right: auto;
    margin-top: -22vh;
`

export const ButtonGap = styled.div`
    height: 8vh;
`

export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
`

export const NextButton = styled.div`
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

export const IconWrapper = styled.div`
  position: absolute;
  margin-top: 42px;
  margin-left: 500px;
  cursor: pointer;
  color: #6948ED;
`;

export const IconWrapper2 = styled.div`
  position: absolute;
  margin-top: 102px;
  margin-left: 500px;
  cursor: pointer;
  color: #6948ED;
`;

export const ReportMessage = styled.span`
    color: #D23B3B;
    font-family: Pretendard;
    margin-left: 210px;
`