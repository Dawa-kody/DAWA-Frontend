import React, { useState } from "react";
import axios from "axios";

type UsercardProps = {
    name: string;
    gender: string;
    schoolNumber: string;
};

type HealthIssues = {
    allergyImmune?: string;
    chronicMedication?: string;
    emergencyPossible?: string;
    etc?: string;
};

export function Usercard({ name, gender, schoolNumber }: UsercardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [healthData, setHealthData] = useState<HealthIssues | null>(null);

    const handleClick = async () => {
        if (isExpanded) {
            // If already open, just close it
            setIsExpanded(false);
            return;
        }
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/user/healthissues/${schoolNumber}`
            );
            setHealthData(res.data);
            setIsExpanded(true);
        } catch (err) {
            console.error("특이사항 요청 실패:", err);
            alert("특이사항을 불러오지 못했습니다.");
        }
    };


    const renderHealthItem = (label: string, value?: string) => {
        if (!value) return null;
        return (
            <div className="mt-2">
                <p className="font-semibold text-[1rem]">{label}</p>
                <p className="text-[0.9rem] text-[#475467]">{value}</p>
            </div>
        );
    };

    return (
        <div
            className={`w-[23rem] bg-white rounded-[0.5rem] transition-all duration-300 ${
                isExpanded ? "h-auto py-[1.5rem]" : "h-[10.75rem]"
            }`}
        >
            <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-center items-center gap-[0.35rem] font-[pretendard] ml-[1.62rem] mt-[1.63rem]">
                    <p className="font-semibold text-[1.5rem] text-black">{name}</p>
                    <p className="font-regular text-[1.25rem] text-[#98A2B3]">{gender}</p>
                    <p className="font-regular text-[1.25rem] text-[#98A2B3]">{schoolNumber}</p>
                </div>
            </div>

            <div className="w-full flex items-center justify-center mt-[3.5rem] text-black" >
                <button
                    className="h-[2rem] font-[pretendard] border rounded-[0.5rem] border-[#98A2B3] inline-flex text-[1.25rem] px-[5.94rem] py-[0.5rem] justify-center items-center"
                    onClick={handleClick}
                >
                    {isExpanded ? "학생 특이사항 닫기" : "학생 특이사항 확인"}
                </button>
            </div>

            {isExpanded && healthData && (
                <div className="mt-4 px-[1.62rem] text-black">
                    {renderHealthItem("알레르기 및 면역 관련 질환", healthData.allergyImmune)}
                    {renderHealthItem("만성 질환 및 약물관리 필요", healthData.chronicMedication)}
                    {renderHealthItem("응급 상황 발생 가능 질환", healthData.emergencyPossible)}
                    {renderHealthItem("기타", healthData.etc)}
                </div>
            )}
        </div>
    );
}
