import * as styles from "./board.comp.module.css";
import produce from "immer";
import { useState } from "react";

function Board() {
  const [state, setState] = useState({
    turn: 4,
    board: [
      ["", "X", "O"],
      ["", "X", ""],
      ["", "O", ""],
    ],
  });

  const play = ({ posX, posY }, curState) => {
    if (state.board[posY][posX] === "") {
      const nextState = produce(curState, (draft) => {
        draft.board[posY][posX] = "X";
        draft.turn++;
      });
      setState(nextState);
    }
  };

  const isWon = ({ posX, posY }, curState) => {
    if (curState.turn < 5) {
      return false;
    }
  };

  return (
    <table className={styles.board}>
      <thead></thead>
      <tbody>
        {state.board.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((cell, cellIdx) => (
              <td
                key={cellIdx}
                onClick={() => play({ posX: cellIdx, posY: rowIdx }, state)}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
