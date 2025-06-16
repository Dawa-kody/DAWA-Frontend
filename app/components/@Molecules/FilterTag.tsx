"use client";

import React, { useState } from "react";

interface Tag {
  id: number;
  name: string;
}

interface FilterTagProps {
  onSelectTags: (selectedTags: string[]) => void;
}

export function FilterTag({ onSelectTags }: FilterTagProps) {
  const [active, setActive] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags: Tag[] = [
    { id: 1, name: "1-1" },
    { id: 2, name: "1-2" },
    { id: 3, name: "1-3" },
    { id: 4, name: "1-4" },
    { id: 5, name: "2-1" },
    { id: 6, name: "2-2" },
    { id: 7, name: "2-3" },
    { id: 8, name: "2-4" },
    { id: 9, name: "3-1" },
    { id: 10, name: "3-2" },
    { id: 11, name: "3-3" },
    { id: 12, name: "3-4" },
    { id: 13, name: "선생님" }
  ];

  const toggleTag = (tagName: string) => {
    const updatedTags = selectedTags.includes(tagName)
      ? selectedTags.filter(tag => tag !== tagName)
      : [...selectedTags, tagName];

    setSelectedTags(updatedTags);
    onSelectTags(updatedTags);
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <div
        className={`flex gap-2 flex-wrap transition-all duration-300 overflow-hidden ${
          active ? "max-h-[300px]" : "max-h-[48px]"
        }`}
      >
        {tags.map(tag => {
          const isSelected = selectedTags.includes(tag.name);
          return (
            <div
              key={tag.id}
              onClick={() => toggleTag(tag.name)}
              className={`flex items-center justify-center h-10 px-4 rounded-full font-medium text-base cursor-pointer transition-all duration-200
                ${
                  isSelected
                    ? "bg-[#6948ED] text-white hover:bg-[#5a3fe0]"
                    : "bg-[#F2F4F7] text-gray-800 hover:bg-gray-300"
                }
              `}
            >
              {tag.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
