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
