import produce from "immer";

const EMPTY_POS = 0;
const DRAW = -1;
const PLAYER_WIN = 1;
const PLAYER_LOST = 0;
const ONGOING = 2;
const PLAYER_CHAR = "X";
const BOT_CHAR = "O";
const WINNING_TABLE = {
  0: [
    [0, 3, 6],
    [0, 1, 2],
    [0, 4, 8],
  ],
  1: [
    [1, 4, 7],
    [0, 1, 2],
  ],
  2: [
    [2, 5, 8],
    [0, 1, 2],
    [2, 4, 6],
  ],
  3: [
    [0, 3, 6],
    [3, 4, 5],
  ],
  4: [
    [1, 4, 7],
    [3, 4, 5],
    [0, 4, 8],
    [2, 4, 6],
  ],
  5: [
    [2, 5, 8],
    [3, 4, 5],
  ],
  6: [
    [0, 3, 6],
    [6, 7, 8],
    [2, 4, 6],
  ],
  7: [
    [1, 4, 7],
    [6, 7, 8],
  ],
  8: [
    [2, 5, 8],
    [6, 7, 8],
    [0, 4, 8],
  ],
};

export const initState = () => {
  return {
    turn: 0,
    board: new Array(9).fill(EMPTY_POS),
    status: ONGOING,
    lastPos: -1,
  };
};

export const isEmpty = (val) => {
  return val === EMPTY_POS;
};

export const isGameOver = (curState) => {
  const { status } = curState;
  let resultString = "";
  if (status !== ONGOING) {
    switch (status) {
      case DRAW:
        resultString = "Draw";
        break;
      case PLAYER_WIN:
        resultString = "You win!";
        break;
      case PLAYER_LOST:
        resultString = "You lost!";
        break;
      default:
        break;
    }
  }
  return [status !== ONGOING, resultString];
};

export const playerMove = ({ curState, pos }) => {
  const { board, status } = curState;
  if (status !== ONGOING) {
    return curState;
  }
  if (board[pos] !== EMPTY_POS) {
    return curState;
  }
  const nextState = produce(curState, (draft) => {
    draft.board[pos] = PLAYER_CHAR;
    draft.turn++;
    draft.lastPos = pos;
  });
  return nextState;
};

export const botMove = (curState) => {
  const { board, turn, status } = curState;
  if (turn === 9) {
    return curState;
  }
  if (turn % 2 === 0) {
    return curState;
  }
  if (status !== ONGOING) {
    return curState;
  }
  const emptyPos = board.reduce((acc, val, idx) => {
    if (val === EMPTY_POS) {
      acc.push(idx);
    }
    return acc;
  }, []);
  const randIdx = Math.floor(Math.random() * (emptyPos.length - 1));
  const randPos = emptyPos[randIdx];
  const nextState = produce(curState, (draft) => {
    draft.board[randPos] = BOT_CHAR;
    draft.turn++;
    draft.lastPos = randPos;
  });
  return nextState;
};

export const checkGameStatus = (curState) => {
  const { turn, lastPos } = curState;
  const isPlayerTurn = turn % 2 !== 0;
  let status;
  if (turn < 5) {
    status = ONGOING;
  } else if (check(lastPos, curState)) {
    status = isPlayerTurn ? PLAYER_WIN : PLAYER_LOST;
  } else {
    status = turn === 9 ? DRAW : ONGOING;
  }
  const nextState = produce(curState, (draft) => {
    draft.status = status;
  });
  console.log(nextState);
  return nextState;
};

const check = (lastPos, curState) => {
  const { board, turn } = curState;
  const char = turn % 2 !== 0 ? PLAYER_CHAR : BOT_CHAR;
  const winningCases = WINNING_TABLE[lastPos];
  console.log(
    lastPos,
    winningCases,
    winningCases.some((c) => c.every((pos) => board[pos] === char))
  );
  return winningCases.some((c) => c.every((pos) => board[pos] === char));
};
