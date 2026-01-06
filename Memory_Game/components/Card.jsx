
export const Card = ({card, onClick}) => {
    return (
    <div className="card" onClick={() => onclick(card)}>
        <div className="card-front">?</div>
        <div className="card-back">{card.value}</div>
    </div>
    )
}