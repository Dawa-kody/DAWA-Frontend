"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Nav } from '@/components/@Organisms';
import { useRouter } from 'next/navigation';
import { ICON } from '@/constants';

export function Write() {
  const [serialNumber, setserialNumber] = useState('');
  const [Name, setName] = useState('');
  const [Division, setDivision] = useState('');
  const [Class, setClass] = useState('');
  const [Handle, setHandle] = useState('');
  const [count, setCount] = useState('');
  const [medications, setMedications] = useState([{ dosage: '', count: '' }]);
  const [Bigo, setBigo] = useState('');
  const [GenderManColor, setGenderManColor] = useState(false);
  const [GenderWomanColor, setGenderWomanColor] = useState(false);
  const [Disease, setDisease] = useState('');
  const [handleButtonClicked, setHandleButtonClicked] = useState(true); // true: 직접입력, false: 목록선택

  const router = useRouter();

  // 모든 투약/수량 입력란이 채워졌는지 확인
  const allMedicationsFilled = medications.every(m => m.dosage && m.count);
  const CheckbuttonColor = Name && Division && Class && Handle && count && allMedicationsFilled;

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

  // 진료과별 약 목록
  const categoryOptions: { [key: string]: string[] } = {
    DIGESTIVE_SYSTEM: ['훼스탈플러스', '베나치오액', '닥터베아제', '스멕타', '알마겔', '부스코판', '핫백적용', '안정요법', '병원의뢰', '상담', '대증요법', '주의사항 교육', '병원검징권위', '상담', '관찰', '메디락에스', '훼스탈', '멕시롱', '까스명수', '스타빅현탁액'],
    RESPIRATORY_SYSTEM: ['모드콜S/타세놀콜드', '모드코S', '콜대원기침', '타이레놀500', '덱시피드', '스트렙실', '씨즈날/쎄로테정', '쌍화천', '안정요법', '병원의뢰', '베타딘인후스프레이', 'KF마스크배부', '1회용마스크지급', '대증요법', '주의사항교육', '상담', '관찰', '등교중지', '이지엔6', '신속항원검사', '인펙신/쎄파렉신', '리놀/미놀'],
    MUSCULOSKELETAL_SYSTEM: ['파스적용', '냉적용', '지지대적용', '냉적용/지지대', '파스/지지대', '타이레놀', '덱시피드', '병원검진권유', '안정요법', '병원의뢰', '주의사항교육', '상담', '관찰'],
    INTEGUMENTARY_SYSTEM: ['드레싱', '버물리', '안정요법', '병원의뢰', '상담', '주의사항교육', '냉적용', '관찰', '마로이신', '씨즈날/쎄로테정'],
    ROGENITAL_SYSTEM: ['타이레놀500', '덱시피드', '핫백적용', '생리대', '안정요법', '병원의뢰', '상담', '주의사항교육', '관찰', '이지엔6'],
    DENTAL_SYSTEM: ['바크로비', '유고오라케어', '구강세척액', '냉적용', '타이레놀500', '병원의뢰', '상담', '덱시피드', '주의사항교육', '바셀린적용', '관찰', '베타딘인후스프레이', '알보칠', '아시클로버', '오라메디', '마로이신', '냉적용'],
    OTORHINOLARYNGOLOGY: ['스트렙실', '씨즈날/쎄로테정', '덱스피드', '타이레놀500', '주의사항교육', '미지근한 물', '냉적용', '타이레놀500', '병원의뢰', '상담', '구강가글', '병원검진권유', '쌍화천', '마로이신', '지혈', '리놀/미놀', '인펙신/쎄파렉신'],
    OPHTHALMOLOGY_SYSTEM: ['안과계', '인공눈물', '알러콘액', '마로이신', '신도톱점안액', '냉적용', '안정요법', '병원검진권유', '상담', '병원의뢰', '주의사항교육', '관찰', '신도톱점안액', '안대적용'],
    OTHER: ['타이레놀500', '모드콜S/타세놀콜드', '모드코S', '화콜C콜드', '콜대원기침', '리놀/미놀', '씨즈날/쎄로테정', '스트렙실', '마로이신', '인펙신/쎄파렉신', '훼스탈', '부스코판', '스타빅현탁액', '메디락에스', '알마겔', '멕시롱', '덱시피드', '쌍화천', '이지엔6', '까스명수', '감염병 예방물품', '드레싱용품', '파스류', '바셀린', '알러콘', '인공눈물', '알보칠', '버물리', '마데카솔', '신도톱점안액', 'KF마스크배부', '일회용마스크', '안정요법', '병원검진권유', '상담', '관찰', '귀가조치', '신속항원검사'],
  };

  // serialNumber 초기화
  useEffect(() => {
    const currentSerial = localStorage.getItem('serialNumber');
    const nextSerial = currentSerial ? parseInt(currentSerial) + 1 : 1;
    setserialNumber(String(nextSerial));
  }, []);

  // Division 또는 handleButtonClicked 변경 시 Handle 초기화
  useEffect(() => {
    setHandle('');
  }, [Division, handleButtonClicked]);

  // 체크박스(버튼) 토글 함수
  const handleButtonClick = () => {
    setHandleButtonClicked(prev => !prev);
  };

  // 제출 함수
  const handleSubmit = async () => {
    // 유효성 검사
    if (!Name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!Division) {
      alert('구분을 선택해주세요.');
      return;
    }
    if (!Class.trim()) {
      alert('학번을 입력해주세요.');
      return;
    }
    if (!Gender) {
      alert('성별을 선택해주세요.');
      return;
    }
    if (!Handle.trim()) {
      alert(handleButtonClicked ? '처치상황을 입력해주세요.' : '처치상황에 적을 약을 선택해주세요.');
      return;
    }
    // 기타 필요한 필드도 필요시 유효성 검사 추가 가능

    const dto = {
      userName: Name,
      division: Division,
      schoolNumber: Class,
      serialNumber: serialNumber,
      gender: Gender,
      disease: Disease,
      treatment: Handle,
      quantity: count,
      medications: medications.filter(m => m.dosage && m.count), // 빈 값 제외
      notes: Bigo,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/api/questionnaire/write`,
        dto,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      localStorage.setItem('serialNumber', String(Number(serialNumber) + 1));
      router.push('/Sheet');
    } catch (error) {
      console.error("post 에러생김", error);
      alert('서버 전송 중 오류가 발생했습니다.');
    }
  };

  // 취소 버튼
  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Nav />
      <div id='background' className=" w-full h-auto bg-slate-gray flex flex-col justify-center items-center">
        <div className=" mt-[5vh] w-[68vw] h-full bg-white flex flex-col px-[3vw] gap-[1rem] py-[4vh]">

          {/*header */}
          <div id='header' className='flex flex-row gap-[1rem] justify-between items-center'>
            {/*headerLeft */}
            <div id='headerLeft' className='flex flex-col w-[50%] gap-4'>
              {/*이름 작성 */}
              <div id='nameBox'>
                <p id='nameText' className='text-[1.2rem] text-black font-[pretendard] font-[500]'>이름</p>
                <input type="text" value={Name} onChange={(e) => setName(e.target.value)} placeholder='이름 입력' className='w-[100%] h-[3rem] bg-slate-gray text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[1rem] outline-none'/>
              </div>

              {/*학번 작성 */}
              <div id='classBox'>
                <p id='classText' className='text-[1.2rem] text-black font-[pretendard] font-[500]'>학번</p>
                <input type="text" value={Class} onChange={(e) => setClass(e.target.value)} placeholder='학번 입력' className='w-[100%] h-[3rem] bg-slate-gray text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[1rem] outline-none'/>
              </div>
              
              {/*성별 선택 */}
              <div id='genderBox'>
                <p id='genderText' className='text-[1.2rem] text-black font-[pretendard] font-[500]'>성별</p>
                <div id='genderButtonBox' className='flex flex-row justify-between w-[100%]'>
                  <button onClick={handleGenderManClick} className={`w-[48%] h-[3rem] ${GenderManColor ? 'bg-manBlue' : 'bg-slate-gray'} text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[0.5rem] outline-none`}>남</button>
                  <button onClick={handleGenderWomanClick} className={`w-[48%] h-[3rem] ${GenderWomanColor ? 'bg-womanPink' : 'bg-slate-gray'} text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[0.5rem] outline-none`}>여</button>
                </div>
              </div>
            </div> {/*headerLeft */}

            {/*headerRight */}
            <div id='headerRight' className='flex flex-col w-[50%] gap-4'>

              {/*구분 선택 */}
              <div id='divisionBox'>
                <p id='divisionText' className='text-[1.2rem] text-black xfont-[pretendard] font-[500]'>구분</p>
                <select value={Division} onChange={(e) => setDivision(e.target.value)} className='w-[100%] h-[3rem] bg-slate-gray text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[1rem] outline-none appearance-none'>
                  <option value="" disabled hidden className='text-slate-gray'>구분을 선택해주세요.</option>
                  <option value="DIGESTIVE_SYSTEM">소화기계</option>
                  <option value="RESPIRATORY_SYSTEM">호흡기계</option>
                  <option value="MUSCULOSKELETAL_SYSTEM">근골격계</option>
                  <option value="INTEGUMENTARY_SYSTEM">피부피하계</option>
                  <option value="DENTAL_SYSTEM">구강치아계</option>
                  <option value="OTORHINOLARYNGOLOGY">이비인후과계</option>
                  <option value="OPHTHALMOLOGY_SYSTEM">안과계</option>
                  <option value="OTHER">기타 </option>
                </select>
              </div>

              {/*처치상황 작성 */}
              <div id='aidBox'>
                <p id='aidText' className='text-[1.2rem] text-black font-[pretendard] font-[500]'>처치상황</p>
                <input type="text" value={Handle} onChange={(e) => setHandle(e.target.value)} placeholder='처치상황 입력' className='w-[100%] h-[3rem] bg-slate-gray text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[1rem] outline-none'/>
              </div>

              {/*수량 선택 */}
              <div id='countBox'>
                <p id='countText' className='text-[1.2rem] text-black font-[pretendard] font-[500]'>수량</p>
                <input type="number" value={count} onChange={(e) => setCount(e.target.value)} placeholder='숫자만 입력해주세요' className="inputNum w-[100%] h-[3rem] bg-slate-gray text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[1rem] outline-none"/>
              </div>

            </div> {/*headerRight */}
          </div> {/*header */}

          {/*content */}
          <div id='content' className='flex flex-col gap-4'>
          
            {/* 증상 */}
            <div id='symptomBox'>
              <p id='symptomText' className='text-[1.2rem] text-black font-[pretendard] font-[500]'>증상</p>
              <input type="text" value={Disease} onChange={(e) => setDisease(e.target.value)} placeholder='증상 입력' className='w-[100%] h-[3rem] bg-slate-gray text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[1rem] outline-none'/>
            </div>

             {/* 투약/수량 동적 입력란 */}
            {/* 투약/수량 입력란 최대 2쌍만 보이게 */}
            <div className="flex flex-row gap-2 items-center">
              <div className="flex-1">
                <p className='text-[1.2rem] text-black font-[pretendard] font-[500]'>투약1</p>
                <input type="text" value={medications[0].dosage}
                  onChange={e => {
                    const newMeds = [...medications];
                    newMeds[0].dosage = e.target.value;
                    if (
                      newMeds.length === 1 &&
                      e.target.value &&
                      newMeds[0].count
                    ) {
                      newMeds.push({ dosage: '', count: '' });
                    }
                    setMedications(newMeds.slice(0, 2));
                  }}
                  placeholder='투약1 입력'
                  className='w-[100%] h-[3rem] bg-slate-gray text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[1rem] outline-none'/>
              </div>
              <div className="flex-1">
                <p className="text-[1.2rem] text-black font-[pretendard] font-[500]">수량1</p>
                <input type="number" value={medications[0].count}
                  onChange={e => {
                    const newMeds = [...medications];
                    newMeds[0].count = e.target.value;
                    if (
                      newMeds.length === 1 &&
                      e.target.value &&
                      newMeds[0].dosage
                    ) {
                      newMeds.push({ dosage: '', count: '' });
                    }
                    setMedications(newMeds.slice(0, 2));
                  }}
                  placeholder='수량1 입력'
                  className="inputNum w-[100%] h-[3rem] bg-slate-gray text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[1rem] outline-none"/>
              </div>
            </div>
            {/* 두 번째 입력란은 첫 번째가 모두 입력됐을 때만 보이게 */}
            {medications.length === 2 && (
              <div className="flex flex-row gap-2 items-center mt-2">
                <div className="flex-1">
                  <p className='text-[1.2rem] text-black font-[pretendard] font-[500]'>투약2</p>
                  <input
                    type="text"
                    value={medications[1].dosage}
                    onChange={e => {
                      const newMeds = [...medications];
                      newMeds[1].dosage = e.target.value;
                      setMedications(newMeds);
                    }}
                    placeholder='투약2 입력'
                    className='w-[100%] h-[3rem] bg-slate-gray text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[1rem] outline-none'
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[1.2rem] text-black font-[pretendard] font-[500]">수량2</p>
                  <input
                    type="number"
                    value={medications[1].count}
                    onChange={e => {
                      const newMeds = [...medications];
                      newMeds[1].count = e.target.value;
                      setMedications(newMeds);
                    }}
                    placeholder='수량2 입력'
                    className="inputNum w-[100%] h-[3rem] bg-slate-gray text-black font-[pretendard] font-[500] border border-none rounded-[8px] pl-[1rem] outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/*footer */}
          <div id='footer' className='mt-[1rem] flex flex-col gap-4'>
            
            {/* 확인 버튼 */}
            <button
              id='submitButton'
              className={`w-[100%] h-[3rem] rounded-[8px] font-[pretendard] font-[700] text-[1rem] transition-colors duration-200 ${allMedicationsFilled ? 'bg-primaryPurple text-white cursor-pointer' : 'bg-[#E4E7EC] text-[#98A2B3] cursor-not-allowed'}`}
              disabled={!allMedicationsFilled}
              onClick={handleSubmit}
            >
              확인
            </button>
            <button id='cancelButton' className='w-[100%] h-[3rem] rounded-[8px] bg-slate-gray text-black text-[1rem] font-[pretendard] font-[700]'>취소</button>
          </div>
        </div>
      </div>
    </>
  );
}
