import * as styles from "./board.comp.module.css";
import { useState } from "react";
import * as gameService from "../../services/game.service";
import { pipe } from "../../utils/index";
const {
  playerMove,
  botMove,
  initState,
  isEmpty,
  checkGameStatus,
  isGameOver,
} = gameService;

function Board() {
  const [state, setState] = useState(initState());
  const [resultMsg, setResultMsg] = useState("");
  const { board } = state;

  const move = (pos) => {
    //Can be abstracted to another function in service
    const nextState = pipe(
      playerMove,
      checkGameStatus,
      botMove,
      checkGameStatus
    )({ curState: state, pos });
    setState(nextState);
    const [isOver, message] = isGameOver(nextState);
    if (isOver) {
      setResultMsg(message);
    }
  };

  const restart = () => {
    setState(initState());
    setResultMsg("");
  };

  return (
    <>
      <table className={styles.board}>
        <thead></thead>
        <tbody>
          {/* Can be abstracted to another function in service */}
          {[0, 3, 6].map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => (
                <td key={col} onClick={() => move(row + col, state)}>
                  {isEmpty(board[row + col]) ? "" : board[row + col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h5>{resultMsg}</h5>
      <button onClick={restart}>Restart</button>
    </>
  );
}

export default Board;
