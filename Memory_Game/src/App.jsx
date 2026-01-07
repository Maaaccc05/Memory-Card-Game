import { useEffect, useState } from "react"
import { Card } from "../components/Card"
import { GameHeader } from "../components/GameHeader"

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
  "🍜"
]

function App() {

  const [cards, setCards] = useState([])

  const initializeGame = () => {
    //Shuffle Cars

   const finalCards = cardValues.map((value, index) => (
      {
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }
    ))

    setCards(finalCards)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const handleCardClick = (card) => {
    // Can't click again if the card is already flipped
    if(card.isFlipped || card.isMatched){
      return
    }

    // Update Card
    const newCards = cards.map((c) => {
      if(c.id === card.id) {
        return{...c, isFlipped: true}
      } else {
        return c
      }
    } )
  }
  
  return (
  <div className="app">
    <GameHeader 
      score={6} 
      moves={9}/>

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick}/>
        ))}
      </div>
  </div>
  )
}

export default App
 