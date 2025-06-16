import React from "react";

interface WeatherProps {
    title: string;
    svg: string;
    percent: React.ReactNode;
}

export function WeatherField({ title, svg, percent }: WeatherProps){
    return(
        <div className="flex flex-col gap-[4px] font-[pretendard] font-[1.25rem] text-[#98A2B3]">
            <p className="">{title}</p>
            <div className="flex flex-row gap-[3px] items-center">
                <img className="w-[1.75rem] h-[1.75rem]" src={`${svg}`} />
                <p className="text-black font-[1.50rem]">{percent}</p>
            </div>
        </div>
    )
}