// { 기존 백엔드에서 태그 목록을 가져오는 방식 }
// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import * as S from "../styles/FilterTag";
// import axios from "axios";

// interface UnHealth {
//     Name: string;
// }

// function FilterTag() {
//     const [diseases, setDiseases] = useState<UnHealth[]>([]);
//     const [active, setActive] = useState(false);

//     useEffect(() => {
//         async function fetchDiseaseData() {
//             try {
//                 // 현재 URL의 쿼리 파라미터 가져오기
//                 const searchParams = new URLSearchParams(window.location.search);
//                 const tags = searchParams.getAll("tags"); // 여러 개의 `tags` 값을 배열로 가져옴

//                 // 백엔드에서 원하는 리스트 형식으로 변환
//                 const tagsList = tags.map(tag => ({ tag }));

//                 // API 요청 (POST 방식 사용)
//                 const response = await axios.post(
//                     `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/firstaid`,
//                     { tags: tagsList },  // JSON 형식으로 전달
//                     { headers: { "Content-Type": "application/json" } }
//                 );

//                 console.log(response.data); // 응답 데이터 구조 확인
//                 if (Array.isArray(response.data)) {
//                     setDiseases(response.data);
//                 } else {
//                     console.error("응답 데이터는 배열이 아닙니다.");
//                 }
//             } catch (error) {
//                 console.error("병명 데이터를 불러오는 중 에러 발생:", error);
//             }
//         }

//         fetchDiseaseData();
//     }, []);    

//     return (
//         <S.FilterTagBox Active={active}>
//             {diseases.length > 0 ? (
//                 diseases.map((disease, index) => (
//                     <S.FilterTag key={index}>{`#${disease.Name}`}</S.FilterTag>
//                 ))
//             ) : (
//                 <div />
//             )}

//             <S.TrinangleButton
//                 src={"/TriangleButton.svg"}
//                 Active={active}
//                 onClick={() => setActive(!active)}
//             />
//         </S.FilterTagBox>
//     );
// }

// export default FilterTag;

// { 현재 프론트에서 직접 태그 목록을 제시하는 방식 }
"use client";

import React, { useState } from "react";
import * as S from "../styles/FilterTag";

interface Tag {
    id: number;
    name: string;
}

interface FilterTagProps {
    onSelectTags: (selectedTags: string[]) => void;  // 선택된 태그 전달 콜백
}

function FilterTag({ onSelectTags }: FilterTagProps) {
    const [active, setActive] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const tags: Tag[] = [
        { id: 1, name: "어지러움" },
        { id: 2, name: "속쓰림" },
        { id: 3, name: "생리통" },
        { id: 4, name: "피로" },
    ];

    const toggleTag = (tagName: string) => {
        const updatedTags = selectedTags.includes(tagName)
            ? selectedTags.filter(tag => tag !== tagName)
            : [...selectedTags, tagName];

        setSelectedTags(updatedTags);
        onSelectTags(updatedTags); // 부모 컴포넌트에 선택된 태그 전달
    };

    return (
        <S.FilterTagBox Active={active}>
            {tags.map(tag => (
                <S.FilterTag
                    key={tag.id}
                    onClick={() => toggleTag(tag.name)}
                    isSelected={selectedTags.includes(tag.name)}
                >
                    {`#${tag.name}`}
                </S.FilterTag>
            ))}

            <S.TrinangleButton
                src={"/TriangleButton.svg"}
                Active={active}
                onClick={() => setActive(!active)}
            />
        </S.FilterTagBox>
    );
}

export default FilterTag;
