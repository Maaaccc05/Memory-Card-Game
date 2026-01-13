import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { GameHeader } from "../components/GameHeader";

const cardValues = [
  "🍎",
  "🍔",
  "🎂",
  "🍾",
  "🍌",
  "🍒",
  "🍑",
  "🍜",
  "🍎",
  "🍔",
  "🎂",
  "🍾",
  "🍌",
  "🍒",
  "🍑",
  "🍜",
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isLocked, setIsLocked] = useState(false)

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    //Shuffle Cards

    const shuffled = shuffleArray(cardValues)

    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    // setIsLocked(flase)
    setMoves(0)
    setScore(0)
    setMatchedCards([])
    setFlippedCards([])
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    // Can't click again if the card is already flipped
    if (card.isFlipped || card.isMatched  || isLocked || flippedCards.length === 2) {
      return;
    }

    // Update Card
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped

    if (flippedCards.length === 1) {
      setIsLocked(true)
      const firstCard = cards[flippedCards[0]];


      if (firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev + 1);
          setCards((prev) =>
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            })
          );
          setFlippedCards([]);
          setIsLocked(false)
        }, 500);
      } else {
        // Flipping back card 1 nd 2 after not matching

        setTimeout(() => {
          const flippedBackCards = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });
          setCards(flippedBackCards);

          setFlippedCards([]);
          setIsLocked(false)
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  };

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame}/>

      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card key={index} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
