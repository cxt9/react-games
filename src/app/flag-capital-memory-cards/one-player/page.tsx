"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const countries = [
  {
    code: "us",
    name: "United States",
    capital: "Washington, D.C.",
    emoji: "🇺🇸",
  },
  { code: "gb", name: "United Kingdom", capital: "London", emoji: "🇬🇧" },
  { code: "fr", name: "France", capital: "Paris", emoji: "🇫🇷" },
  { code: "de", name: "Germany", capital: "Berlin", emoji: "🇩🇪" },
  { code: "jp", name: "Japan", capital: "Tokyo", emoji: "🇯🇵" },
  { code: "ca", name: "Canada", capital: "Ottawa", emoji: "🇨🇦" },
  { code: "au", name: "Australia", capital: "Canberra", emoji: "🇦🇺" },
  { code: "br", name: "Brazil", capital: "Brasília", emoji: "🇧🇷" },
  { code: "ru", name: "Russia", capital: "Moscow", emoji: "🇷🇺" },
  { code: "in", name: "India", capital: "New Delhi", emoji: "🇮🇳" },
  { code: "cn", name: "China", capital: "Beijing", emoji: "🇨🇳" },
  { code: "it", name: "Italy", capital: "Rome", emoji: "🇮🇹" },
  { code: "es", name: "Spain", capital: "Madrid", emoji: "🇪🇸" },
  { code: "mx", name: "Mexico", capital: "Mexico City", emoji: "🇲🇽" },
  { code: "kr", name: "South Korea", capital: "Seoul", emoji: "🇰🇷" },
  { code: "za", name: "South Africa", capital: "Pretoria", emoji: "🇿🇦" },
  { code: "ar", name: "Argentina", capital: "Buenos Aires", emoji: "🇦🇷" },
  { code: "se", name: "Sweden", capital: "Stockholm", emoji: "🇸🇪" },
  { code: "nl", name: "Netherlands", capital: "Amsterdam", emoji: "🇳🇱" },
  { code: "ch", name: "Switzerland", capital: "Bern", emoji: "🇨🇭" },
  { code: "sg", name: "Singapore", capital: "Singapore", emoji: "🇸🇬" },
  { code: "no", name: "Norway", capital: "Oslo", emoji: "🇳🇴" },
  { code: "nz", name: "New Zealand", capital: "Wellington", emoji: "🇳🇿" },
  { code: "ie", name: "Ireland", capital: "Dublin", emoji: "🇮🇪" },
  { code: "dk", name: "Denmark", capital: "Copenhagen", emoji: "🇩🇰" },
  { code: "fi", name: "Finland", capital: "Helsinki", emoji: "🇫🇮" },
  { code: "be", name: "Belgium", capital: "Brussels", emoji: "🇧🇪" },
  { code: "at", name: "Austria", capital: "Vienna", emoji: "🇦🇹" },
  { code: "pt", name: "Portugal", capital: "Lisbon", emoji: "🇵🇹" },
  { code: "cz", name: "Czech Republic", capital: "Prague", emoji: "🇨🇿" },
  { code: "hu", name: "Hungary", capital: "Budapest", emoji: "🇭🇺" },
  { code: "pl", name: "Poland", capital: "Warsaw", emoji: "🇵🇱" },
  { code: "gr", name: "Greece", capital: "Athens", emoji: "🇬🇷" },
  { code: "ro", name: "Romania", capital: "Bucharest", emoji: "🇷🇴" },
  { code: "ua", name: "Ukraine", capital: "Kyiv", emoji: "🇺🇦" },
  { code: "tr", name: "Turkey", capital: "Ankara", emoji: "🇹🇷" },
  { code: "sa", name: "Saudi Arabia", capital: "Riyadh", emoji: "🇸🇦" },
  {
    code: "ae",
    name: "United Arab Emirates",
    capital: "Abu Dhabi",
    emoji: "🇦🇪",
  },
  { code: "il", name: "Israel", capital: "Jerusalem", emoji: "🇮🇱" },
  { code: "eg", name: "Egypt", capital: "Cairo", emoji: "🇪🇬" },
  { code: "id", name: "Indonesia", capital: "Jakarta", emoji: "🇮🇩" },
  { code: "my", name: "Malaysia", capital: "Kuala Lumpur", emoji: "🇲🇾" },
  { code: "th", name: "Thailand", capital: "Bangkok", emoji: "🇹🇭" },
  { code: "ph", name: "Philippines", capital: "Manila", emoji: "🇵🇭" },
  { code: "vn", name: "Vietnam", capital: "Hanoi", emoji: "🇻🇳" },
  { code: "pk", name: "Pakistan", capital: "Islamabad", emoji: "🇵🇰" },
  { code: "bd", name: "Bangladesh", capital: "Dhaka", emoji: "🇧🇩" },
  { code: "lk", name: "Sri Lanka", capital: "Colombo", emoji: "🇱🇰" },
  { code: "np", name: "Nepal", capital: "Kathmandu", emoji: "🇳🇵" },
  { code: "mm", name: "Myanmar", capital: "Naypyidaw", emoji: "🇲🇲" },
  { code: "la", name: "Laos", capital: "Vientiane", emoji: "🇱🇦" },
  { code: "kh", name: "Cambodia", capital: "Phnom Penh", emoji: "🇰🇭" },
  { code: "bg", name: "Bulgaria", capital: "Sofia", emoji: "🇧🇬" },
  { code: "hr", name: "Croatia", capital: "Zagreb", emoji: "🇭🇷" },
  { code: "cy", name: "Cyprus", capital: "Nicosia", emoji: "🇨🇾" },
  { code: "ee", name: "Estonia", capital: "Tallinn", emoji: "🇪🇪" },
  { code: "lv", name: "Latvia", capital: "Riga", emoji: "🇱🇻" },
  { code: "lt", name: "Lithuania", capital: "Vilnius", emoji: "🇱🇹" },
  { code: "lu", name: "Luxembourg", capital: "Luxembourg", emoji: "🇱🇺" },
  { code: "mt", name: "Malta", capital: "Valletta", emoji: "🇲🇹" },
  { code: "si", name: "Slovenia", capital: "Ljubljana", emoji: "🇸🇮" },
  { code: "sk", name: "Slovakia", capital: "Bratislava", emoji: "🇸🇰" },
  { code: "va", name: "Vatican City", capital: "Vatican City", emoji: "🇻🇦" },
  { code: "al", name: "Albania", capital: "Tirana", emoji: "🇦🇱" },
  {
    code: "ba",
    name: "Bosnia and Herzegovina",
    capital: "Sarajevo",
    emoji: "🇧🇦",
  },
  { code: "mk", name: "North Macedonia", capital: "Skopje", emoji: "🇲🇰" },
  { code: "me", name: "Montenegro", capital: "Podgorica", emoji: "🇲🇪" },
  { code: "rs", name: "Serbia", capital: "Belgrade", emoji: "🇷🇸" },
  { code: "me", name: "Montenegro", capital: "Podgorica", emoji: "🇲🇪" },
];

const shuffleAndSelectCountries = (
  array: { code: string; emoji: string; name: string; capital: string }[],
  selectCount: number = 8
): { code: string; emoji: string; name: string; capital: string }[] => {
  // Create a copy of the array to avoid modifying the original
  const shuffled = [...array];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Select the first 'selectCount' countries
  return shuffled.slice(0, selectCount);
};

const CountryCapitalMemoryGame = () => {
  const [cards, setCards] = useState<
    {
      id: number;
      type: string;
      content: { code: string; emoji: string; name: string; capital: string };
    }[]
  >([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const selectedCountries = shuffleAndSelectCountries(countries, 8);
    const gameCards = selectedCountries.flatMap((country, index) => [
      { id: index * 2, type: "flag", content: country },
      { id: index * 2 + 1, type: "capital", content: country },
    ]);

    // Shuffle the game cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }

    setCards(gameCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameOver(false);
  };

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(cards[index].content.code)
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    setMoves(moves + 1);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (
        firstCard.content.code === secondCard.content.code &&
        firstCard.type !== secondCard.type
      ) {
        setMatchedPairs([...matchedPairs, firstCard.content.code]);
        if (matchedPairs.length + 1 === 8) {
          setGameOver(true);
        }
      }

      setTimeout(() => setFlippedIndices([]), 1000);
    }
  };

  const renderCardContent = (card: {
    id?: number;
    type: any;
    content: any;
  }) => {
    if (card.type === "flag") {
      return (
        <>
          <span className="text-4xl">{card.content.emoji}</span>
          <span className="text-sm mt-2">{card.content.name}</span>
        </>
      );
    } else {
      return (
        <>
          <span className="text-sm font-bold">{card.content.capital}</span>
          <span className="text-sm mt-2">{card.content.name}</span>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Country Capital Memory Game</h1>
      <div className="mb-4">Moves: {moves}</div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            className="w-24 h-24 flex flex-col items-center justify-center cursor-pointer text-center"
            onClick={() => handleCardClick(index)}
          >
            {flippedIndices.includes(index) ||
            matchedPairs.includes(card.content.code) ? (
              renderCardContent(card)
            ) : (
              <span className="text-2xl">?</span>
            )}
          </Card>
        ))}
      </div>
      {gameOver && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">
            Congratulations! You have completed the game!
          </h2>
          <p>Total moves: {moves}</p>
        </div>
      )}
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
};

export default CountryCapitalMemoryGame;
