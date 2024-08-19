import { WINNER_COMBINATIONS } from "../constants";
export const checkWinner = (boardToCheck) => {
  for (const combination of WINNER_COMBINATIONS) {
    const [a, b, c] = combination;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }

  return null;
  // if (board.every(cell => cell !== null)) {
  //   setWinner(false);
  //   return false;
  // }
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((cell) => cell !== null);
};
