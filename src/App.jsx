/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./App.css";
import "./index.css";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinner } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { checkEndGame } from "./logic/board.js";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("tateti");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X;
  });

  const [winner, setWinner] = useState(null); //null es que no hay ganador, false es empate, true es que hay ganador

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("tateti");
    window.localStorage.removeItem("turn");
  };

  const updateBoard = (index) => {
    //no actualizamos la celda si ya tiene un valor
    if (board[index] || winner) {
      return;
    }
    //actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else {
      //si no hay ganador, revisamos si hay empate
      if (checkEndGame(newBoard)) {
        setWinner(false);
      }
      //cambiamos el turno
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);
      //guardar turno
      window.localStorage.setItem("turn", JSON.stringify(newTurn));
      //guardar partida
      window.localStorage.setItem("tateti", JSON.stringify(newBoard));
    }
  };

  return (
    <main className="board">
      <h1>Tateti</h1>
      <button onClick={resetGame}>Comenzar de nuevo</button>
      <section className="game">
        {board.map((cell, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {cell}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
