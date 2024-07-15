"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const flags = [
  { code: "us", emoji: "🇺🇸" },
  { code: "ca", emoji: "🇨🇦" },
  { code: "gb", emoji: "🇬🇧" },
  { code: "fr", emoji: "🇫🇷" },
  { code: "de", emoji: "🇩🇪" },
  { code: "jp", emoji: "🇯🇵" },
  { code: "au", emoji: "🇦🇺" },
  { code: "br", emoji: "🇧🇷" },
  { code: "il", emoji: "🇮🇱" },
  { code: "it", emoji: "🇮🇹" },
  { code: "mx", emoji: "🇲🇽" },
  { code: "nl", emoji: "🇳🇱" },
  { code: "nz", emoji: "🇳🇿" },
  { code: "ph", emoji: "🇵🇭" },
  { code: "pl", emoji: "🇵🇱" },
  { code: "ru", emoji: "🇷🇺" },
  { code: "sg", emoji: "🇸🇬" },
  { code: "kr", emoji: "🇰🇷" },
  { code: "es", emoji: "🇪🇸" },
  { code: "se", emoji: "🇸🇪" },
  { code: "ch", emoji: "🇨🇭" },
  { code: "tw", emoji: "🇹🇼" },
  { code: "th", emoji: "🇹🇭" },
  { code: "tr", emoji: "🇹🇷" },
  { code: "ae", emoji: "🇦🇪" },
  { code: "ar", emoji: "🇦🇷" },
  { code: "at", emoji: "🇦🇹" },
  { code: "be", emoji: "🇧🇪" },
  { code: "bg", emoji: "🇧🇬" },
  { code: "cl", emoji: "🇨🇱" },
  { code: "co", emoji: "🇨🇴" },
  { code: "cz", emoji: "🇨🇿" },
  { code: "dk", emoji: "🇩🇰" },
  { code: "eg", emoji: "🇪🇬" },
  { code: "fi", emoji: "🇫🇮" },
  { code: "gr", emoji: "🇬🇷" },
  { code: "hk", emoji: "🇭🇰" },
  { code: "ee", emoji: "🇪🇪" },
  { code: "lv", emoji: "🇱🇻" },
  { code: "lt", emoji: "🇱🇹" },
  { code: "sk", emoji: "🇸🇰" },
  { code: "si", emoji: "🇸🇮" },
  { code: "hr", emoji: "🇭🇷" },
  { code: "ba", emoji: "🇧🇦" },
  { code: "rs", emoji: "🇷🇸" },
  { code: "me", emoji: "🇲🇪" },
  { code: "mk", emoji: "🇲🇰" },
  { code: "al", emoji: "🇦🇱" },
  { code: "ro", emoji: "🇷🇴" },
];

const shuffleArray = (
  array: { code: string; emoji: string }[],
  selectCount: number = 8
): { code: string; emoji: string }[] => {
  // First, shuffle the entire array
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Select the first 'selectCount' flags
  const selected = shuffled.slice(0, selectCount);

  // Create pairs and shuffle again
  const pairs = [...selected, ...selected];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  return pairs;
};

const TwoPlayerMemoryGame = () => {
  const [cards, setCards] = useState<{ code: string; emoji: string }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState<{ player1: number; player2: number }>({
    player1: 0,
    player2: 0,
  });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setCards(shuffleArray(flags));
    setFlippedIndices([]);
    setMatchedPairs([]);
    setCurrentPlayer(1);
    setScores({ player1: 0, player2: 0 });
    setGameOver(false);
  };

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(cards[index].code) ||
      gameOver
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex].code === cards[secondIndex].code) {
        setMatchedPairs([...matchedPairs, cards[firstIndex].code]);
        setScores((prevScores) => ({
          ...prevScores,
          [`player${currentPlayer}` as keyof typeof prevScores]:
            prevScores[`player${currentPlayer}` as keyof typeof prevScores] + 1,
        }));

        if (matchedPairs.length + 1 === flags.length) {
          setGameOver(true);
        }
      } else {
        setTimeout(() => setCurrentPlayer(currentPlayer === 1 ? 2 : 1), 1000);
      }
      setTimeout(() => setFlippedIndices([]), 1000);
    }
  };

  const getWinner = () => {
    if (scores.player1 > scores.player2) return "Player 1";
    if (scores.player2 > scores.player1) return "Player 2";
    return "It's a tie";
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Two-Player Flag Memory Game</h1>
      <div className="mb-4">
        <p>Player 1 Score: {scores.player1}</p>
        <p>Player 2 Score: {scores.player2}</p>
        <p className="font-bold">Current Player: {currentPlayer}</p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="w-16 h-16 flex items-center justify-center cursor-pointer"
            onClick={() => handleCardClick(index)}
          >
            {flippedIndices.includes(index) ||
            matchedPairs.includes(card.code) ? (
              <span className="text-4xl">{card.emoji}</span>
            ) : (
              <span className="text-2xl">?</span>
            )}
          </Card>
        ))}
      </div>
      {gameOver && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Game Over!</h2>
          <p>Winner: {getWinner()}</p>
        </div>
      )}
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
};

export default TwoPlayerMemoryGame;
