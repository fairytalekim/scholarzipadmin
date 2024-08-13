"use client"

import "./segmented_control.css";
import { useEffect, useRef, useState } from "react";

export default function SegmentedControl({
    contents,
    defaultIndex,
    onSelect
}: {
    contents: string[],
    defaultIndex?: number,
    onSelect: (content: string) => void
}) {

    const [idx, setIdx] = useState(defaultIndex || 0)
    const labels = contents;
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const [xLocation, setXLocation] = useState(0)
    const [indicatorLength, setIndicatorLength] = useState(0)

    const handleClick = (id: number, content: string) => {
        setIdx(id);
        setXLocation((id * indicatorLength) + 4)
        onSelect(content);
    }

    useEffect(() => {
        setIndicatorLength(indicatorRef.current!.clientWidth)
        setXLocation((idx * indicatorRef.current!.clientWidth) + 4)
    }, [idx])

    return (
        <div className="sc_container">
            {
                labels.map(
                    (content: string, id: number) => (
                        <div
                            key={content}
                            className="sc_content"
                            onClick={() => handleClick(id, content)}
                            style={{ fontWeight: idx === id ? "600" : "500", zIndex: 2 }}
                        >
                            {content}
                        </div>
                    )
                )
            }
            <div
                ref={indicatorRef}
                className="sc_indicator bg-gray-white"
                style={{
                    width: `calc((100% - 8px)/${labels.length})`,
                    left: xLocation
                }}
            />
        </div>
    )
}