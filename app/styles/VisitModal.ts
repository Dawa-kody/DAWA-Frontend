import styled from "styled-components";
  
export const modalcontainer = styled.div`
    position: absolute;
    width: 700px;
    height: 400px;
    left: calc(50% - 700px/2);
    top: calc(50% - 400px/2 - 40px);

    background: #FFFFFF;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(58, 61, 67, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const modaltitle = styled.span`
    position: absolute;
    width: 170px;
    height: 36px;
    left: calc(50% - 170px/2 - 219px);
    top: 27px;

    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;

    color: #000000;
`

export const modalinput = styled.textarea`
    background-color: #F2F4F7;
    color: #98A2B3;
    width: 608px;
    height: 216px;
    border-radius: 8px;
    padding: 20px;
    resize: none;
`

export const submitbutton = styled.button`
    position: absolute;
    width: 106.4px;
    height: 56px;
    left: 547.6px;
    top: 321px;
    background-color: #6948ED;
    border-radius: 5px;

    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    color: #FFFFFF;
`

export const canclebutton = styled.button`
    position: absolute;
    width: 106.4px;
    height: 56px;
    left: 421px;
    top: 321px;
    background-color: #F2F4F7;
    border-radius: 5px;

    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    color: #000000;

`