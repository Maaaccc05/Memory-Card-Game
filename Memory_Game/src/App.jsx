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
  return (
  <div className="app">
    <GameHeader 
      score={6} 
      moves={9}/>

      <div className="cards-grid">
        {cardValues.map((card) => (
          <Card card={card} />
        ))}
      </div>
  </div>
  )
}

export default App
 