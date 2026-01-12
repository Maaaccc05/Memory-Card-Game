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

  const initializeGame = () => {
    //Shuffle Cars

    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    // Can't click again if the card is already flipped
    if (card.isFlipped || card.isMatched) {
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
      const firstCard = cards[flippedCards[0]];

      if (firstCard.value === card.value) {
        setTimeout(() => {
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
        
        setCards ((prev) => 
        prev.map((c) => {
          if (c.id === card.id || c.id === firstCard.id) {
            return {...c, isMatched: true}
          } else {
            return c;
          }
        })
      )
        setFlippedCards([])
        }, 500)
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
        }, 1000);
      }
    }
  };

  return (
    <div className="app">
      <GameHeader score={6} moves={9} />

      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card key={index} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
