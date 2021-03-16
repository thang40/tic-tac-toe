import produce from "immer";

class TicTacToeService {
  initState = () => {
    return {
      turn: 0,
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      playerChar: "X",
      botChar: "O",
      emptyPositions: ["00", "01", "02", "10", "11", "12", "20", "21", "22"],
    };
  };

  playerMove = ({ posX, posY }, curState) => {
    if (curState.board[posY][posX] === "") {
      const nextState = produce(curState, (draft) => {
        draft.board[posY][posX] = curState.playerChar;
        draft.turn++;
        draft.emptyPositions = curState.emptyPositions.filter(
          (pos) => pos !== `${posY}${posX}`
        );
      });
      return nextState;
    }
  };

  botMove = (curState) => {
    const randPosition = Math.floor(
      Math.random() * (curState.emptyPositions.length - 1)
    );
    const nextState = produce(curState, (draft) => {
      draft.board[randPosition[0]][randPosition[1]] = curState.botChar;
      draft.turn++;
      draft.emptyPositions = curState.emptyPositions.filter(
        (pos) => pos !== randPosition
      );
    });
    return nextState;
  };

  isWon = ({ posX, posY }, curState) => {
    if (curState.turn < 5) {
      return false;
    }
  };
}

console.log(Math.floor(Math.random() * 3));
