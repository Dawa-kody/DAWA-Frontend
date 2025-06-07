import styled from "styled-components";


export const Background = styled.div`
  background-color: #F2F4F7;
  height: 87.5rem; /* 1400px */
`

export const Container = styled.div`
  position: absolute;
  width: 75rem; /* 1200px */
  height: 78.75rem; /* 1260px */
  left: 50%;
  top: 50rem; /* 800px */
  gap: 0.625rem; /* 10px */
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  border-radius: 0.625rem; /* 10px */
`

export const Label = styled.div`
  position: absolute;
  width: 2rem; /* 32px */
  height: 1.3125rem; /* 21px */
  left: 40.875rem; /* 670px */
  top: 5rem; /* 70px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const NameInput = styled.input`
  position: relative;
  left: 2.375rem; /* 70px */
  top: 6.8rem; /* 110px */
  width: 32.5rem; /* 520px */
  height: 3.25rem; /* 52px */
  background: #F2F4F7;
  border-radius: 0.25rem; /* 4px */
  color: black;
  outline: none;
  padding-left: 0.625rem; /* 10px */
`


export const NameText = styled.span`
  position: absolute;
  width: 2rem; /* 32px */
  height: 1.3125rem; /* 21px */
  left: 4.875rem; /* 670px */
  top: 5rem; /* 70px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user

  `

  export const DivisionText = styled.span`
  position: absolute;
  width: 2rem; /* 32px */
  height: 1.3125rem; /* 21px */
  left: 41.875rem; /* 670px */
  top: 4.375rem; /* 70px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const DivisionSelect = styled.select`
  position: relative;
  left: -3.75rem; /* 140px */
  top: 6.875rem; /* 110px */
  width: 31.25rem; /* 500px */
  padding: 0.625rem 0.75rem; /* 10px 12px */
  border: 1px solid #ccc;
  border-radius: 0.5rem; /* 8px */
  font-size: 1rem; /* 16px */
  margin-bottom: 1.25rem; /* 20px */
  outline: none;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  menuPlacement="bottom"
`

export const ClassText = styled.span`
  position: absolute;
  width: 2rem; /* 32px */
  height: 1.3125rem; /* 21px */
  left: 5rem; /* 70px */
  top: 12rem; /* 180px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const ClassInput = styled.input`
  position: relative;
  left: -18rem; /* 70px */
  top: 10rem; /* 160px */
  width: 32.5rem; /* 520px */
  height: 3.25rem; /* 52px */
  background: #F2F4F7;
  border-radius: 0.25rem; /* 4px */
  color: black;
  outline: none;
  padding: 0.625rem; /* 10px */
`

export const HandleText = styled.span`
  position: absolute;
  left: 40.875rem; /* 670px */
  top: 11.7rem; /* 180px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const HandleInput = styled.input`
  position: relative;
  left: 15.375rem; /* 150px */
  top: 6.7rem; /* 160px */
  width: 27.5rem; /* 440px */
  height: 3.25rem; /* 52px */
  background: #F2F4F7;
  border-radius: 0.25rem; /* 4px */
  color: black;
  outline: none;
  padding-left: 0.625rem; /* 10px */
`

export const HandleButton = styled.button<{ isClicked: boolean }>`
  width: 1.5rem; /* 24px */
  height: 1.5rem;
  border-radius: 0.3125rem; /* 5px */
  border: 1px solid #676D79;
  background-color: ${({ isClicked }) => (isClicked ? '#ffffff' : '#6948ED')};
  position: relative;
  left: 31.625rem; /* 170px */
  top: 4.6rem; /* 160px */
`

export const DiseaseText = styled.span`
  position: absolute;
  left: 4.375rem; /* 70px */
  top: 18.75rem; /* 300px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`
export const Option=styled.option`
margin-left: 7.375rem; /* 70px */
margin-top:18.75rem;
`

export const DiseaseInput = styled.input`
  position: relative;
  left: -0.6rem; /* 70px */
  top: 9rem; /* 220px */
  width: 66.875rem; /* 1070px */
  height: 3.25rem; /* 52px */
  background: #F2F4F7;
  border-radius: 0.25rem; /* 4px */
  color: black;
  outline: none;
  padding-left: 0.625rem; /* 10px */
`

export const GenderText = styled.span`
  position: absolute;
  width: 2rem; /* 32px */
  height: 1.3125rem; /* 21px */
  left: 4.375rem; /* 70px */
  top: 25.25rem; /* 420px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`


export const GenderMan = styled.div<{ isActive: boolean }>`
  width: 15.625rem; /* 250px */
  height: 3.25rem; /* 52px */
  position: relative;
  left: -26.375rem; /* 70px */
  top: 12.75rem; /* 300px */
  border-radius: 0.25rem; /* 4px */
  color: black;
  outline: none;
  padding-left: 0.625rem; /* 10px */
  background-color: ${({ isActive }) => (isActive ? '#E4E7EC' : '#F2F4F7')};
  cursor: pointer;

  &::placeholder {
    text-align: center;
  }
`

export const GenderManText = styled.span`
  position: absolute;
  left: 6.875rem; /* 110px */
  top: 0.875rem; /* 14px */
  display: flex;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const GenderWoman = styled.div<{ isActive: boolean }>`
  width: 15rem; /* 240px */
  height: 3.25rem; /* 52px */
  position: relative;
  left: -9.375rem; /* 70px */
  top: 9.5rem; /* 300px */
  border-radius: 0.25rem; /* 4px */
  color: black;
  outline: none;
  padding-left: 0.625rem; /* 10px */
  background-color: ${({ isActive }) => (isActive ? '#E4E7EC' : '#F2F4F7')};
  cursor: pointer;

  &::placeholder {
    text-align: center;
  }
`

export const GenderWomanText = styled.span`
  position: absolute;
  width: 2rem; /* 32px */
  height: 1.3125rem; /* 21px */
  left: 7.75rem; /* 124px */
  top: 1.0625rem; /* 17px */
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const GuesuText = styled.span`
  position: absolute;
  width: 2rem; /* 32px */
  height: 1.3125rem; /* 21px */
  top: 25.6rem; /* 420px */
  left: 41.3rem; /* 670px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const GuesuInput = styled.input`
  position: relative;
  left: 17.875rem; /* 670px */
  top: 6.5rem; /* 200px */
  width: 30.625rem; /* 490px */
  height: 3.25rem; /* 52px */
  background: #F2F4F7;
  border-radius: 0.25rem; /* 4px */
  color: black;
  outline: none;
  padding-left: 0.625rem; /* 10px */
`

export const Dosage1Text = styled.span`
  position: absolute;
  left: 4.375rem; /* 70px */
  top: 34rem; /* 560px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const HandleSelect = styled.select`
  width: 20rem; /* 320px */
  height: 2.5rem; /* 40px */
  position: relative;
  left: 12.375rem; /* 150px */
  top: 7rem; /* 160px */
  padding: 0.5rem; /* 8px */
  border-radius: 0.5rem; /* 8px */
  border: 1px solid #ccc;
  color: #000000;
  z-index: 100;
  overflow: visible;
`

export const Dosage1Input = styled.input`
  position: relative;
  left: -0.375rem; /* 70px */
  top: 11.875rem; /* 270px */
  width: 67.8125rem; /* 1085px */
  height: 3.25rem; /* 52px */
  background: #F2F4F7;
  border-radius: 0.25rem; /* 4px */
  color: black;
  outline: none;
  padding-left: 0.625rem; /* 10px */
`

export const Guesu1Text = styled.span`
  position: absolute;
  left: 4.375rem; /* 70px */
  top: 41.875rem; /* 670px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const Guesu1Input = styled.input<{ $active: boolean }>`
  position: relative;
  left: -0.375rem; /* 70px */
  top: 15.875rem; /* 270px */
  width: 67.8125rem; /* 1085px */
  height: 3.25rem; /* 52px */
  background: #F2F4F7;
  border-radius: 0.25rem; /* 4px */
  color: black;
  outline: none;
  padding-left: 0.625rem; /* 10px */
  gap: 0.625rem; /* 10px */
  margin-bottom: ${({ $active }) => ($active ? '0.25rem' : '1rem')}; /* 4px or 16px */
`

export const Dosage2Text = styled.span`
  position: absolute;
  left: 4.375rem; /* 70px */
  top: 49.375rem; /* 790px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const Dosage2Input = styled.input`
  position: relative;
  left: 2.375rem; /* 70px */
  top: 20rem; /* 400px */
  width: 67.8125rem; /* 1085px */
  height: 3.25rem; /* 52px */
  background: #F2F4F7;
  border-radius: 0.25rem; /* 4px */
  color: black;
  outline: none;
  padding-left: 0.625rem; /* 10px */
`


export const Guesu2Text = styled.span`
  position: absolute;
  left: 4.375rem; /* 70px */
  top: 56.5625rem; /* 905px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const Guesu2Input = styled.input`
  position: relative;
  left: 2.375rem; /* 70px */
  top: 23.75rem; /* 460px */
  width: 67.8125rem; /* 1085px */
  height: 3.25rem; /* 52px */
  background: #F2F4F7;
  border-radius: 0.25rem; /* 4px */
  color: black;
  outline: none;
  padding-left: 0.625rem; /* 10px */
`

export const Checkbutton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#6948ED' : '#DEDEDE')};
  position: relative;
  width: 66.875rem; /* 1070px */
  height: 3.5rem; /* 56px */
  left: 0.5rem; /* 8px */
  top: 33.125rem; /* 530px */
  margin-left: auto;
  margin-right: auto;
  display: block;
  border-radius: 0.5rem; /* 8px */
  cursor: pointer;
`

export const CheckbuttonText = styled.span`
  left: 4.375rem; /* 70px */
  top: 43.75rem; /* 700px */
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem; /* 18px */
  line-height: 1.3125rem; /* 21px */
  color: #ffffff;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const Cancelbutton = styled.button`
  position: relative;
  width: 66.875rem; /* 1070px */
  height: 3.5rem; /* 56px */
  left: 0.5rem; /* 8px */
  top: 35rem; /* 560px */
  margin-left: auto;
  margin-right: auto;
  display: block;
  background: #E4E7EC;
  border-radius: 0.5rem; /* 8px */
`

export const CancelbuttonText = styled.span`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 1.25rem; /* 20px */
  line-height: 1.5rem; /* 24px */
  color: #000000;

  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -3.125rem; /* -50px */
`
