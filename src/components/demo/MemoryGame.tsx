"use client";
import { useEffect, useState } from "react";

// Generate and shuffle 18 pairs (36 cards)
const generateShuffledCards = (): number[] => {
  const pairs = [...Array(18).keys(), ...Array(18).keys()];
  return pairs.sort(() => Math.random() - 0.5);
};

export const MemoryGame = () => {
  const [shuffledCards, setShuffledCards] = useState<number[]>(
    generateShuffledCards()
  );
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleCardClick = (index: number) => {
    // Prevent clicking same card or clicking more than 2
    if (
      selectedCards.includes(index) ||
      matchedCards.includes(index) ||
      selectedCards.length === 2
    )
      return;

    setSelectedCards((prev) => [...prev, index]);
    setMessage("");
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      const isMatch = shuffledCards[first] === shuffledCards[second];

      setTimeout(() => {
        if (isMatch) {
          setMatchedCards((prev) => [...prev, first, second]);
          setMessage("✅ Both Match!");
        } else {
          setMessage("❌ Not Match!");
        }
        setSelectedCards([]);
      }, 1000);
    }
  }, [selectedCards, shuffledCards]);

  useEffect(() => {
    if (matchedCards.length === 36) {
      setMessage("🎉 You Won!");
    }
  }, [matchedCards]);

  const resetGame = () => {
    setShuffledCards(generateShuffledCards());
    setSelectedCards([]);
    setMatchedCards([]);
    setMessage("");
  };

  const isCardVisible = (index: number) =>
    selectedCards.includes(index) || matchedCards.includes(index);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <p className="font-bold text-2xl mb-4">{message}</p>

      <div className="grid grid-cols-6 gap-4">
        {shuffledCards.map((value, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            disabled={isCardVisible(index)}
            className={`w-16 h-16 rounded border-2 transition-all duration-300
              ${
                isCardVisible(index)
                  ? "bg-green-300 text-black"
                  : "bg-gray-300 text-transparent"
              }`}
          >
            {isCardVisible(index) ? value + 1 : "?"}
          </button>
        ))}
      </div>

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={resetGame}
      >
        🔄 Restart Game
      </button>
    </div>
  );
};
