import styled from "styled-components";

export const Background = styled.div`
  background-color: #F2F4F7;
  height: 87.5rem;
`

export const Container = styled.div`
  position: absolute;
  width: 75rem;
  height: 78.75rem;
  left: 50%;
  top: 50rem;
  gap: 0.625rem;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  border-radius: 0.625rem;
`

export const Label = styled.div`
  position: absolute;
  width: 2rem;
  height: 1.3125rem;
  left: 40.875rem;
  top: 5rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const NameInput = styled.input`
  position: relative;
  left: 2.375rem;
  top: 6.8rem;
  width: 32.5rem;
  height: 3.25rem;
  background: #F2F4F7;
  border-radius: 0.25rem;
  color: black;
  outline: none;
  padding-left: 0.625rem;
`

export const NameText = styled.span`
  position: absolute;
  width: 2rem;
  height: 1.3125rem;
  left: 4.875rem;
  top: 12rem;
  
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user
`

export const DivisionText = styled.span`
  position: absolute;
  width: 2rem;
  height: 1.3125rem;
  left: 41.875rem;
  top: 4.375rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const DivisionSelect = styled.select`
  position: relative;
  left: -3.75rem;
  top: 6.875rem;
  width: 31.25rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1.25rem;
  outline: none;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  menuPlacement="bottom"
`

export const ClassText = styled.span`
  position: absolute;
  width: 2rem;
  height: 1.3125rem;
  left: 5rem;
  top: 5rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const ClassInput = styled.input`
  position: relative;
  left: -18rem;
  top: 10rem;
  width: 32.5rem;
  height: 3.25rem;
  background: #F2F4F7;
  border-radius: 0.25rem;
  color: black;
  outline: none;
  padding: 0.625rem;
`

export const HandleText = styled.span`
  position: absolute;
  left: 40.875rem;
  top: 11.7rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const HandleInput = styled.input`
  position: relative;
  left: 15.375rem;
  top: 6.7rem;
  width: 27.5rem;
  height: 3.25rem;
  background: #F2F4F7;
  border-radius: 0.25rem;
  color: black;
  outline: none;
  padding-left: 0.625rem;
`

export const HandleButton = styled.button<{ isClicked: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.3125rem;
  border: 1px solid #676D79;
  background-color: ${({ isClicked }) => (isClicked ? '#ffffff' : '#6948ED')};
  position: relative;
  left: 31.625rem;
  top: 4.6rem;
`

export const DiseaseText = styled.span`
  position: absolute;
  left: 4.375rem;
  top: 18.75rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`
export const Option=styled.option`
margin-left: 7.375rem;
margin-top:18.75rem;
`

export const DiseaseInput = styled.input`
  position: relative;
  left: -0.6rem;
  top: 9rem;
  width: 66.875rem;
  height: 3.25rem;
  background: #F2F4F7;
  border-radius: 0.25rem;
  color: black;
  outline: none;
  padding-left: 0.625rem;
`

export const GenderText = styled.span`
  position: absolute;
  width: 2rem;
  height: 1.3125rem;
  left: 4.375rem;
  top: 25.25rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const GenderMan = styled.div<{ isActive: boolean }>`
  width: 15.625rem;
  height: 3.25rem;
  position: relative;
  left: -26.375rem;
  top: 12.75rem;
  border-radius: 0.25rem;
  color: black;
  outline: none;
  padding-left: 0.625rem;
  background-color: ${({ isActive }) => (isActive ? '#E4E7EC' : '#F2F4F7')};
  cursor: pointer;
  &::placeholder {
    text-align: center;
  }
`

export const GenderManText = styled.span`
  position: absolute;
  left: 6.875rem;
  top: 0.875rem;
  display: flex;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const GenderWoman = styled.div<{ isActive: boolean }>`
  width: 15rem;
  height: 3.25rem;
  position: relative;
  left: -9.375rem;
  top: 9.5rem;
  border-radius: 0.25rem;
  color: black;
  outline: none;
  padding-left: 0.625rem;
  background-color: ${({ isActive }) => (isActive ? '#E4E7EC' : '#F2F4F7')};
  cursor: pointer;
  &::placeholder {
    text-align: center;
  }
`

export const GenderWomanText = styled.span`
  position: absolute;
  width: 2rem;
  height: 1.3125rem;
  left: 7.75rem;
  top: 1.0625rem;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const GuesuText = styled.span`
  position: absolute;
  width: 2rem;
  height: 1.3125rem;
  top: 25.6rem;
  left: 41.3rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const GuesuInput = styled.input`
  position: relative;
  left: 17.875rem;
  top: 6.5rem;
  width: 30.625rem;
  height: 3.25rem;
  background: #F2F4F7;
  border-radius: 0.25rem;
  color: black;
  outline: none;
  padding-left: 0.625rem;
`

export const Dosage1Text = styled.span`
  position: absolute;
  left: 4.375rem;
  top: 34rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const HandleSelect = styled.select`
  width: 20rem;
  height: 2.5rem;
  position: relative;
  left: 12.375rem;
  top: 7rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  color: #000000;
  z-index: 100;
  overflow: visible;
`

export const Dosage1Input = styled.input`
  position: relative;
  left: -0.375rem;
  top: 11.875rem;
  width: 67.8125rem;
  height: 3.25rem;
  background: #F2F4F7;
  border-radius: 0.25rem;
  color: black;
  outline: none;
  padding-left: 0.625rem;
`

export const Guesu1Text = styled.span`
  position: absolute;
  left: 4.375rem;
  top: 41.875rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const Guesu1Input = styled.input<{ $active: boolean }>`
  position: relative;
  left: -0.375rem;
  top: 15.875rem;
  width: 67.8125rem;
  height: 3.25rem;
  background: #F2F4F7;
  border-radius: 0.25rem;
  color: black;
  outline: none;
  padding-left: 0.625rem;
  gap: 0.625rem;
  margin-bottom: ${({ $active }) => ($active ? '0.25rem' : '1rem')};
`

export const Dosage2Text = styled.span`
  position: absolute;
  left: 4.375rem;
  top: 49.375rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const Dosage2Input = styled.input`
  position: relative;
  left: 2.375rem;
  top: 20rem;
  width: 67.8125rem;
  height: 3.25rem;
  background: #F2F4F7;
  border-radius: 0.25rem;
  color: black;
  outline: none;
  padding-left: 0.625rem;
`

export const Guesu2Text = styled.span`
  position: absolute;
  left: 4.375rem;
  top: 56.5625rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const Guesu2Input = styled.input`
  position: relative;
  left: 2.375rem;
  top: 23.75rem;
  width: 67.8125rem;
  height: 3.25rem;
  background: #F2F4F7;
  border-radius: 0.25rem;
  color: black;
  outline: none;
  padding-left: 0.625rem;
`

export const Checkbutton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#6948ED' : '#DEDEDE')};
  position: relative;
  width: 66.875rem;
  height: 3.5rem;
  left: 0.5rem;
  top: 33.125rem;
  margin-left: auto;
  margin-right: auto;
  display: block;
  border-radius: 0.5rem;
  cursor: pointer;
`

export const CheckbuttonText = styled.span`
  left: 4.375rem;
  top: 43.75rem;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  color: #ffffff;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const Cancelbutton = styled.button`
  position: relative;
  width: 66.875rem;
  height: 3.5rem;
  left: 0.5rem;
  top: 35rem;
  margin-left: auto;
  margin-right: auto;
  display: block;
  background: #E4E7EC;
  border-radius: 0.5rem;
`

export const CancelbuttonText = styled.span`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: #000000;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -3.125rem;
`
