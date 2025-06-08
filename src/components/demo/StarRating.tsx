import React, { useState } from "react";

export const StarRating = () => {
    const [rating, setRating] = useState<number>(0);
    const [hoverStar, setHoverStar] = useState<number>(0);
    const star = "✴️";
    const fillStar = "🌟";

    const handleClick = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const isLeftHalf = clickX < rect.width / 2;
        const newRating = isLeftHalf ? i + 0.5 : i + 1;
        setRating(newRating);
    };

    const getStarIcon = (i: number) => {
        if (rating >= i + 1) return fillStar; // full
        if (rating >= i + 0.5) return "🌓"; // half star example
        return star; // empty
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border-2 p-2 cursor-pointer flex" onMouseLeave={() => setHoverStar(0)}>
                {[...Array(10).keys()].map((i) => (
                    <div
                        key={i}
                        className="text-3xl px-1 select-none"
                        onClick={(e) => handleClick(e, i)}
                        onMouseEnter={() => setHoverStar(i + 1)}
                    >
                        {(hoverStar > 0 ? (hoverStar >= i + 1 ? fillStar : star) : getStarIcon(i))}
                    </div>
                ))}
            </div>
        </div>
    );
};
