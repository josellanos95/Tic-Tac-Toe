/* eslint-disable react/prop-types */
import { Square } from './Square';

export function WinnerModal({ winner, resetGame }) {
    if (winner === null) return null;
    const winnerText = winner === false ? "Empate" : "Ganó:";
    return (
        <section className="winner">
          <div className="text">
            <h2>{winnerText}</h2>
            <div className="win">
              {winner && <Square>{winner}</Square>}
            </div>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </div>
        </section>
    )
}