"use client";
import React, { useState,useEffect } from 'react'
import * as S from "../styles/Writepage";
import axios from 'axios';
import Nav from "../organisms/Nav";
import { useRouter } from 'next/navigation';

function Writepage() {
  const [serialNumber, setserialNumber] = useState('');
  const [Name, setName] = useState('');
  const [Division, setDivision] = useState('');
  const [Class, setClass] = useState('');
  const [Handle, setHandle] = useState('');
  const [Guesu, setGuesu] = useState('');
  const [Dosage1, setDosage1] = useState('');
  const [Guesu1, setGuesu1] = useState('');
  const [Bigo, setBigo] = useState('');
  const [giveMedicine, setGiveMedicine] = useState(false);
  const [GenderManColor,setGenderManColor]=useState(false);
  const [GenderWomanColor,setGenderWomanColor]=useState(false);
  const [Dosage2, setDosage2] = useState('');
  const [Guesu2, setGuesu2] = useState('');
  const [Disease,setDisease] = useState('');
  const [handleButtonClicked, setHandleButtonClicked] = useState(true);
  const router = useRouter(); 

  const CheckbuttonColor = Name || Division || Class || Handle || Guesu || Dosage1 || Guesu1;

  const [Gender, setGender] = useState('');
  const handleGenderManClick = () => {
    setGenderManColor(true);
    setGenderWomanColor(false);
    setGender('남성');
  };
  const handleGenderWomanClick = () => {
    setGenderWomanColor(true);
    setGenderManColor(false);
    setGender('여성');
  };
  
  const categoryOptions: { [key: string]: string[] } = {
    소화기계: ['훼스탈플러스', '베나치오액', '닥터베아제','스멕타','알마겔',
      '부스코판','핫백적용','안정요법','병원의뢰','상담','대증요법','주의사항 교육',
      '병원검징권위','상담','관찰','메디락에스','훼스탈','알마겔',
      '멕시롱','까스명수','스타빅현탁액'
    ],
    호흡기계: ['모드콜S/타세놀콜드', '모드코S','콜대원기침','타이레놀500',
      '덱시피드','스트렙실','씨즈날/쎄로테정','쌍화천','안정요법',
      '병원의뢰','베타딘인후스프레이','KF마스크배부','1회용마스크지급','대증요법',
      '주의사항교육','상담','관찰','등교중지','이지엔6','신속항원검사','인펙신/쎄파렉신','리놀/미놀',
    ],
    근골격계: ['파스적용','냉적용','지지대적용','냉적용/지지대','파스/지지대',
      '타이레놀','덱시피드','병원검진권유','안정요법','병원의뢰','주의사항교육','상담','관찰',
    ],
    피부피하계:['드레싱','버물리','안정요법','병원의뢰','상담','주의사항교육','냉적용','관찰',
      '마로이신','씨즈날/쎄로테정',
    ],
    비뇨생식기계: ['타이레놀500','덱시피드','핫백적용','생리대','안정요법','병원의뢰','상담','주의사항교육','관찰','이지엔6',
    ],
    구강치아계:['바크로비','유고오라케어','구강세척액','냉적용','타이레놀500','병원의뢰','상담','덱시피드','주의사항교육',
      '바셀린적용','관찰','베타딘인후스프레이','알보칠','아시클로버','오라메디','마로이신','냉적용',
    ],
    이비인후과계:['스트렙실','씨즈날/쎄로테정','덱스피드','타이레놀500','주의사항교육',
      '미지근한 물','냉적용','타이레놀500','병원의뢰','상담','구강가글','병원검진권유','쌍화천',
      '마로이신','지혈','리놀/미놀','인펙신/쎄파렉신', 
       ],
    안과계:['안과계','인공눈물','알러콘액','마로이신','신도톱점안액','냉적용',
      '안정요법','병원검진권유','상담','병원의뢰','주의사항교육','관찰','신도톱점안액','안대적용',
       ],
    기타:['타이레놀500','모드콜S/타세놀콜드', '모드코S','화콜C콜드','콜대원기침','리놀/미놀','씨즈날/쎄로테정',
      '스트렙실','마로이신','인펙신/쎄파렉신','훼스탈','부스코판','스타빅현탁액','메디락에스','알마겔','멕시롱',
      '덱시피드','쌍화천','이지엔6','까스명수','감염병 예방물품','드레싱용품','파스류','바셀린','알러콘','인공눈물',
      '알보칠','버물리','마데카솔','신도톱점안액','KF마스크배부','일회용마스크','안정요법','병원검진권유','상담','관찰',
      '귀가조치','신속항원검사',
    ]

  };

  useEffect(() => {
    // localStorage에서 현재 연번 불러오기
    const currentSerial = localStorage.getItem('serialNumber');
    const nextSerial = currentSerial ? parseInt(currentSerial) + 1 : 1;
    setserialNumber(String(nextSerial));
  }, []);
  

  const handleButtonClick = () => {
    setHandleButtonClicked(prev => !prev);
  };
  
  const handleSubmit = async () => {
    const dto = {
      serialNumber: serialNumber, 
      userName: Name,
      schoolNumber: Class,
      gender: Gender,
      division: Division,
      disease:Disease,
      treatment: Handle,
      quantity: Guesu,
      medication1: Dosage1,
      quantity1: Guesu1,
      medication2: Dosage2,
      quantity2: Guesu2,
      notes: Bigo,
    }
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/questionnaire/write`, dto,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
          withCredentials: true,
        }
      );
      localStorage.setItem('serialNumber', String(Number(serialNumber) + 1));
      router.push('/Sheet');
    } catch (error) {
      console.error("post 에러생김");
    }
  }
  const handleCancel=()=>{
    router.back();
  }

  return (
    <>
    <Nav/>
    <S.Background>
      <S.WhiteNemo>
        <S.NameText>이름</S.NameText>
        <S.NameInput value={Name} onChange={(e)=>setName(e.target.value)} placeholder='이름입력' required></S.NameInput>
        <S.DivisionText>구분</S.DivisionText>
        <S.DivisionSelect value={Division} onChange={(e) => setDivision(e.target.value)} required>
            <option value="" disabled hidden>구분을 선택하세요</option>
            <option value="소화기계">소화기계</option>
            <option value="호흡기계">호흡기계</option>
            <option value="근골격계">근골격계</option>
            <option value="피부피하계">피부피하계</option>
            <option value="구강치아계">구강치아계</option>
            <option value="이비인후과계">이비인후과계</option>
            <option value="안과계">안과계</option>
            <option value="기타">기타</option>
        </S.DivisionSelect>
        <S.ClassText>학번</S.ClassText>
        <S.ClassInput value={Class} onChange={(e) => setClass(e.target.value)} placeholder='학번 입력'></S.ClassInput>
        <S.HandleText>처치상황</S.HandleText>
        {handleButtonClicked ? (
            <S.HandleInput value={Handle} onChange={(e) => setHandle(e.target.value)} placeholder='처치상황에 적을 약을 골라주세요' required />
            ) : (
              <S.Dosage1Select value={Dosage1} onChange={(e) => setDosage1(e.target.value)}>
              <option value="" disabled hidden>처치상황에 적을 약을 적어주세요</option>
              { categoryOptions[Division]?.map((item, index) => {
                console.log("Rendering item:", item);  // 항목이 잘 렌더링되는지 확인
                return <option key={index} value={item}>{item}</option>;
              })}
            </S.Dosage1Select> )}  
            <S.HandleButton onClick={handleButtonClick} isClicked={handleButtonClicked}>
              <img src='./checkbutton.svg' alt='확인버튼'></img>
            </S.HandleButton>
        <S.DiseaseText>증상</S.DiseaseText>
        <S.DiseaseInput value={Disease} onChange={(e)=>setDisease(e.target.value)} placeholder='증상'></S.DiseaseInput>
        <S.GenderText>성별</S.GenderText>
        <S.GenderMan  isActive={GenderManColor} onClick={handleGenderManClick}><S.GenderManText>남성</S.GenderManText></S.GenderMan>
        <S.GenderWoman isActive={GenderWomanColor} onClick={handleGenderWomanClick}><S.GenderManText>여성</S.GenderManText></S.GenderWoman>

        <S.GuesuText>수량</S.GuesuText>
        <S.GuesuInput value={Guesu} onChange={(e)=>setGuesu(e.target.value)} placeholder='숫자만 써주세요'></S.GuesuInput>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}></div>
        <S.Dosage1Text>투약1</S.Dosage1Text>
        <S.Dosage1Input value={Dosage1} onChange={(e) => setDosage1(e.target.value)} placeholder="약 이름을 써주세요" />     
        <S.Guesu1Text>수량1</S.Guesu1Text>
        <S.Guesu1Input value={Guesu1} onChange={(e) => setGuesu1(e.target.value)} placeholder="숫자만 써주세요" $active={!!Dosage1 && !!Guesu1}/>
        
        {Dosage1 && Guesu1 && (
          <>
          <div style={{ display: Dosage1 && Guesu1 ? 'block' : 'none' }}>
          <S.Dosage2Text>투약2</S.Dosage2Text>
          <S.Dosage2Input value={Dosage2} onChange={(e) => setDosage2(e.target.value)} placeholder="약 이름을 써주세요"/>
          <S.Guesu2Text>수량2</S.Guesu2Text>
          <S.Guesu2Input value={Guesu2} onChange={(e) => setGuesu2(e.target.value)} placeholder="숫자만 써주세요"/>
          </div>
        </>
        )}
        <S.ButtonContainer>
        
            <S.Checkbutton onClick={handleSubmit} isActive={!!CheckbuttonColor}>
                <S.CheckbuttonText>확인</S.CheckbuttonText>
            </S.Checkbutton>
            <S.Cancelbutton onClick={handleCancel}><S.CancelbuttonText>취소</S.CancelbuttonText></S.Cancelbutton>
        </S.ButtonContainer>
      </S.WhiteNemo>
    </S.Background>


    </>
  )
}

export default Writepage